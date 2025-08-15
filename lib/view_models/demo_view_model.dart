import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../utils/flow_norm.dart';

class DemoViewModel extends ChangeNotifier {
  bool _hasLoaded = false;
  bool get hasLoaded => _hasLoaded;

  final Map<String, List<LatLng>> _ringsMap = {};
  final List<String> _ringOrder = [];

  List<Polygon> _polygons = [];
  List<Polygon> get polygons => _polygons;

  List<DateTime> _dates = [];
  List<DateTime> get dates => _dates;

  final Map<String, List<double>> _predictions = {};
  Map<String, List<double>> get predictions => _predictions;

  int _currentIndex = 0;
  int get currentIndex => _currentIndex;

  bool shapesLoaded = false;
  bool predictionsLoaded = false;
  bool loading = false;
  String? lastError;

  Future<void> loadAll() async {
    if (_hasLoaded || loading) return;
    loading = true;
    notifyListeners();

    lastError = null;

    try {
      await Future.wait([_loadGeoJson(), _loadPredictions()]);

      final missingPreds =
          _ringOrder
              .where((id) => !_predictions.containsKey(id))
              .take(8)
              .toList();
      if (missingPreds.isNotEmpty) {}

      _updatePolygons();
    } catch (e) {
      lastError = 'loadAll error: $e';
    } finally {
      loading = false;
      _hasLoaded = true;
      notifyListeners();
    }
  }

  void setCurrentIndex(int idx) {
    if (_dates.isEmpty) return;
    final clamped = idx.clamp(0, _dates.length - 1);
    if (clamped == _currentIndex) return;
    _currentIndex = clamped;
    _updatePolygons();
    notifyListeners();
  }

  DateTime get currentDate =>
      _dates.isNotEmpty ? _dates[_currentIndex] : DateTime(2025, 1, 7);

  String _normId(Object? id) => id?.toString().trim() ?? '';

  Future<void> _loadGeoJson() async {
    try {
      final raw = await rootBundle.loadString('assets/geo/danube_shapes.json');
      final decoded = json.decode(raw);
      if (decoded is! Map<String, dynamic> || decoded['features'] is! List) {}

      final features = decoded['features'] as List;
      final Map<String, List<LatLng>> tmpMap = {};
      final List<String> tmpOrder = [];

      for (var i = 0; i < features.length; i++) {
        final featRaw = features[i];
        if (featRaw is! Map<String, dynamic>) continue;
        final feat = featRaw;
        final geom = feat['geometry'];
        if (geom is! Map<String, dynamic>) continue;
        if (geom['type'] != 'Polygon') continue;
        final coords = geom['coordinates'];
        if (coords is! List) continue;

        for (var r = 0; r < coords.length; r++) {
          final ringRaw = coords[r];
          if (ringRaw is! List) continue;
          final pts = <LatLng>[];
          for (var coord in ringRaw) {
            if (coord is List && coord.length >= 2) {
              pts.add(
                LatLng(
                  (coord[1] as num).toDouble(),
                  (coord[0] as num).toDouble(),
                ),
              );
            }
          }
          if (pts.length < 3) continue;

          final props = feat['properties'] as Map<String, dynamic>?;
          final rawId = props?['basin_id'] ?? props?['id'] ?? feat['id'];
          final id = _normId(rawId);
          if (id.isEmpty) continue;

          if (!tmpMap.containsKey(id)) {
            tmpMap[id] = pts;
            tmpOrder.add(id);
          } else {
            var suffix = 1;
            String newId;
            do {
              newId = '${id}_$suffix';
              suffix++;
            } while (tmpMap.containsKey(newId));
            tmpMap[newId] = pts;
            tmpOrder.add(newId);
          }
        }
      }

      _ringsMap
        ..clear()
        ..addAll(tmpMap);
      _ringOrder
        ..clear()
        ..addAll(tmpOrder);

      shapesLoaded = true;

      _polygons =
          _ringOrder.map((id) {
            final pts = _ringsMap[id]!;
            return Polygon(
              points: pts,
              color: Colors.blue.withValues(alpha: 0.2),
              borderColor: Colors.blue,
              borderStrokeWidth: 1.5,
            );
          }).toList();

      notifyListeners();
    } catch (e) {
      lastError = 'GeoJSON load error: $e';
      notifyListeners();
    }
  }

  Future<void> _loadPredictions() async {
    try {
      final raw = await rootBundle.loadString(
        'assets/geo/danube_predictions.csv',
      );
      final lines = const LineSplitter().convert(raw);
      if (lines.length < 2) {
        lastError = 'CSV has insufficient rows';
        notifyListeners();
        return;
      }
      final header = lines.first.split(',');
      final parsedDates =
          header.sublist(1).map((s) {
            try {
              return DateTime.parse(s);
            } catch (_) {
              debugPrint('Could not parse date "$s"');
              return DateTime(2000);
            }
          }).toList();

      var initialIndex = parsedDates.indexWhere(
        (d) => d.year == 2025 && d.month == 1 && d.day == 7,
      );
      if (initialIndex < 0) initialIndex = 0;

      final parsedPredictions = <String, List<double>>{};
      for (final line in lines.skip(1)) {
        final parts = line.split(',');
        if (parts.isEmpty) continue;
        final basinIdRaw = parts[0];
        final basinId = _normId(basinIdRaw);
        if (basinId.isEmpty) continue;
        final flows =
            parts.sublist(1).map((s) => double.tryParse(s) ?? 0.0).toList();
        parsedPredictions[basinId] = flows;
      }

      double globalMax = 0.0;
      for (final v in parsedPredictions.values) {
        for (final x in v) {
          if (x.isFinite && x > globalMax) globalMax = x;
        }
      }
      final clamped = <String, List<double>>{};
      parsedPredictions.forEach((k, list) {
        clamped[k] = list.map((f) => f.clamp(0.0, 1.0)).toList();
      });

      _dates = parsedDates;
      _currentIndex = initialIndex;
      _predictions
        ..clear()
        ..addAll(clamped);

      predictionsLoaded = true;
      notifyListeners();
    } catch (e, st) {
      lastError = 'Predictions load error: $e';
      debugPrint('‼ Predictions error: $e\n$st');
      notifyListeners();
    }
  }

  void _updatePolygons() {
    if (_ringOrder.isEmpty || _dates.isEmpty) return;
    final idx = _currentIndex;

    const double maxFlow = 0.6; // maybe has to change in the future

    final List<Polygon> newPolys = [];

    for (final id in _ringOrder) {
      final pts = _ringsMap[id];
      if (pts == null) continue;

      final norms = _predictions[id] ?? [];
      if (norms.isEmpty) {
        newPolys.add(
          Polygon(
            points: pts,
            color: Colors.transparent,
            borderColor: Colors.transparent,
          ),
        );
        continue;
      }

      final norm = (idx < norms.length ? norms[idx] : norms.last).clamp(
        0.0,
        1.0,
      );
      final double flow = undoLog1pNorm(norm);
      final double factor = (norm / maxFlow).clamp(0.0, 1.0);

      final Color fillColor = multiLerpHSV(gradientStops, factor);

      final polygonLabel = '${flow.toStringAsFixed(1)} m³/s';

      newPolys.add(
        Polygon(
          points: pts,
          color: fillColor.withValues(alpha: 0.75),
          borderColor: const Color(0xFF262626).withValues(alpha: 0.75),
          borderStrokeWidth: 1.2,
          isFilled: true,
          label: polygonLabel,
          labelStyle: const TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: Color.fromARGB(255, 231, 226, 226),
          ),
          labelPlacement: PolygonLabelPlacement.centroid,
          rotateLabel: false,
        ),
      );
    }

    _polygons = newPolys;
    notifyListeners();
  }
}
