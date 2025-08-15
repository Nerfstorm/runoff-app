import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../view_models/evaluation_view_model.dart';
import '../widgets/basin_details.dart';
import '../utils/geom.dart';

class EvaluationPage extends StatefulWidget {
  const EvaluationPage({super.key});

  @override
  State<EvaluationPage> createState() => _EvaluationPageState();
}

class _EvaluationPageState extends State<EvaluationPage> {
  late final EvaluationViewModel vm;
  String? _selectedId;
  bool _selectedIsEval = false;
  LatLng? _selectedCentroid;
  Alignment _selectedAlignment = Alignment.centerRight;

  final MapController _mapController = MapController();

  final LatLng _defaultMapCenter = LatLng(47.32, -33.79);

  @override
  void initState() {
    super.initState();
    vm = EvaluationViewModel();
    vm.loadShapes();
  }

  @override
  void dispose() {
    vm.dispose();
    super.dispose();
  }

  void _handleMapTap(LatLng latlng) {
    for (final shape in vm.shapes) {
      if (!bboxContains(shape.bbox, latlng)) continue;
      if (pointInPolygon(latlng, shape.points)) {
        _selectShape(shape);
        return;
      }
    }
    setState(() {
      _selectedId = null;
      _selectedCentroid = null;
    });
  }

  void _selectShape(shape) {
    final mapCenter = _mapController.center;
    final centroid = shape.centroid;
    final align =
        (centroid.longitude < mapCenter.longitude)
            ? Alignment.centerRight
            : Alignment.centerLeft;

    setState(() {
      _selectedId = shape.id;
      _selectedIsEval = shape.isEval;
      _selectedCentroid = centroid;
      _selectedAlignment = align;
    });
  }

  @override
  Widget build(BuildContext ctx) {
    return Scaffold(
      appBar: AppBar(title: const Text('Training and Evaluation')),
      body: Stack(
        children: [
          AnimatedBuilder(
            animation: vm,
            builder: (c, _) {
              return FlutterMap(
                mapController: _mapController,
                options: MapOptions(
                  center: _defaultMapCenter,
                  zoom: 4.0,
                  onTap: (tapPos, latlng) {
                    _handleMapTap(latlng);
                  },
                ),
                children: [
                  TileLayer(
                    backgroundColor: const Color(0xFF262626),
                    urlTemplate:
                        'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png',
                    subdomains: const ['a', 'b', 'c'],
                  ),
                  PolygonLayer(polygons: vm.polygonsFromShapes),
                  MarkerLayer(
                    markers:
                        vm.shapes
                            .map(
                              (s) => Marker(
                                point: s.centroid,
                                width: 36,
                                height: 36,
                                builder: (ctx) {
                                  return GestureDetector(
                                    onTap: () {
                                      _selectShape(s);
                                    },
                                    child: DecoratedBox(
                                      decoration: BoxDecoration(
                                        color:
                                            s.isEval
                                                ? Colors.green.withValues(
                                                  alpha: 0.9,
                                                )
                                                : Colors.blue.withValues(
                                                  alpha: 0.9,
                                                ),
                                        shape: BoxShape.circle,
                                      ),
                                      child: const Center(
                                        child: Icon(
                                          Icons.polyline,
                                          size: 16,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ),
                                  );
                                },
                              ),
                            )
                            .toList(),
                  ),
                ],
              );
            },
          ),
          AnimatedBuilder(
            animation: vm,
            builder: (c, _) {
              final List<Widget> overlays = [];

              if (vm.loading) {
                overlays.add(
                  const Align(
                    alignment: Alignment.topCenter,
                    child: Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Card(
                        child: Padding(
                          padding: EdgeInsets.symmetric(
                            vertical: 6,
                            horizontal: 12,
                          ),
                          child: Text('Loading evaluation basins...'),
                        ),
                      ),
                    ),
                  ),
                );
              }

              if (vm.lastError != null) {
                overlays.add(
                  Align(
                    alignment: Alignment.topCenter,
                    child: Padding(
                      padding: const EdgeInsets.only(
                        top: 64.0,
                        left: 12,
                        right: 12,
                      ),
                      child: Card(
                        color: Colors.red.shade700,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            vertical: 8,
                            horizontal: 12,
                          ),
                          child: Row(
                            children: [
                              const Icon(
                                Icons.square_foot,
                                color: Colors.white,
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  vm.lastError!,
                                  style: const TextStyle(color: Colors.white),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              }
              if (overlays.isEmpty) return const SizedBox.shrink();
              return Stack(children: overlays);
            },
          ),
          if (_selectedId != null && _selectedCentroid != null)
            Align(
              alignment: _selectedAlignment,
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 24,
                ),
                child: BasinDetails(
                  id: _selectedId!,
                  isEval: _selectedIsEval,
                  onClose: () => setState(() => _selectedId = null),
                  maxWidth: MediaQuery.of(context).size.width * 0.9,
                ),
              ),
            ),

          Align(
            alignment: Alignment.bottomCenter,
            child: SafeArea(
              minimum: const EdgeInsets.all(12),
              child: Transform.scale(
                scale: 1.5,
                child: ElevatedButton(
                  onPressed: () => Navigator.pushNamed(ctx, '/map'),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(
                      vertical: 12.0,
                      horizontal: 16.0,
                    ),
                    child: Text('Go to Danube Demo'),
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            top: 12,
            right: 12,
            child: SafeArea(
              child: Container(
                padding: const EdgeInsets.symmetric(
                  vertical: 6,
                  horizontal: 10,
                ),
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.4),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('🟢', style: TextStyle(fontSize: 16)),
                        SizedBox(width: 6),
                        Text(
                          'Evaluation',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                    SizedBox(height: 4),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('🔵', style: TextStyle(fontSize: 16)),
                        SizedBox(width: 6),
                        Text('Training', style: TextStyle(color: Colors.white)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
