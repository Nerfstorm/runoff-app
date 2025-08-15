import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../models/basin_shape.dart';
import '../utils/geom.dart';

class EvaluationViewModel extends ChangeNotifier {
  bool loading = false;
  String? lastError;

  final List<BasinShape> _shapes = [];
  List<BasinShape> get shapes => List.unmodifiable(_shapes);

  List<Polygon> get polygonsFromShapes =>
      _shapes.map((s) {
        final fill = s.isEval ? Colors.green : Colors.blue;
        return Polygon(
          points: s.points,
          color: fill.withValues(alpha: 0.35),
          borderColor: fill.withValues(alpha: 0.9),
          borderStrokeWidth: 1.4,
          isFilled: true,
        );
      }).toList();

  Future<void> loadShapes() async {
    if (loading) return;
    loading = true;
    lastError = null;
    notifyListeners();

    try {
      final raw = await rootBundle.loadString(
        'assets/geo_eval/train_shapes.json',
      );
      final decoded = json.decode(raw);

      if (decoded is! Map<String, dynamic> || decoded['features'] is! List) {
        lastError = 'Invalid GeoJSON structure';
        _shapes.clear();
        return;
      }

      final features = decoded['features'] as List;
      final tmpShapes = <BasinShape>[];

      List<LatLng> ringToPts(dynamic ringRaw) {
        final pts = <LatLng>[];
        if (ringRaw is! List) return pts;
        for (final coord in ringRaw) {
          if (coord is List && coord.length >= 2) {
            final lon = (coord[0] as num).toDouble();
            final lat = (coord[1] as num).toDouble();
            pts.add(LatLng(lat, lon));
          }
        }
        return pts;
      }

      for (final featRaw in features) {
        if (featRaw is! Map<String, dynamic>) continue;
        final geom = featRaw['geometry'];
        if (geom is! Map<String, dynamic>) continue;
        final gtype = (geom['type'] ?? '').toString();
        final coords = geom['coordinates'];
        if (coords == null) continue;
        final props = featRaw['properties'] as Map<String, dynamic>?;
        final isEval = props != null && props['isEval'] == true;
        final rawId = props?['basin_id'] ?? props?['id'] ?? featRaw['id'];
        final id = rawId?.toString().trim() ?? '';
        if (id.isEmpty) continue;

        Iterable<dynamic> polygonsIterable;
        if (gtype == 'Polygon') {
          polygonsIterable = [coords];
        } else if (gtype == 'MultiPolygon') {
          polygonsIterable = coords as Iterable;
        } else {
          polygonsIterable = [coords];
        }

        for (final polyRaw in polygonsIterable) {
          if (polyRaw is! List) continue;
          for (final ringRaw in polyRaw) {
            final pts = ringToPts(ringRaw);
            if (pts.length < 3) continue;
            final bbox = computeBBox(pts);
            final centroid = polygonCentroid(pts);
            tmpShapes.add(
              BasinShape(
                id: id,
                points: pts,
                isEval: isEval,
                bbox: bbox,
                centroid: centroid,
              ),
            );
          }
        }
      }

      _shapes
        ..clear()
        ..addAll(tmpShapes);
    } catch (e, st) {
      lastError = 'Load error: $e';
      debugPrint('EvaluationViewModel loadShapes error: $e\n$st');
      _shapes.clear();
    } finally {
      loading = false;
      notifyListeners();
    }
  }
}
