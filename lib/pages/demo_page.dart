import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:intl/intl.dart';

import '../view_models/demo_view_model.dart';

import '../widgets/reactive_date_slider.dart';

class DemoPage extends StatefulWidget {
  final DemoViewModel vm;
  const DemoPage({super.key, required this.vm});

  @override
  State<DemoPage> createState() => _DemoPageState();
}

class _DemoPageState extends State<DemoPage> {
  late final DemoViewModel vm;
  final dateFmt = DateFormat('dd MMMM yyyy');

  @override
  void initState() {
    super.initState();
    vm = widget.vm;
    if (!vm.hasLoaded) {
      vm.loadAll();
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext ctx) {
    return Scaffold(
      appBar: AppBar(
        title: AnimatedBuilder(
          animation: vm,
          builder: (c, _) {
            final label =
                vm.dates.isNotEmpty
                    ? dateFmt.format(vm.currentDate.toLocal())
                    : 'loading…';
            return Text('Danube Basin - $label');
          },
        ),
      ),
      body: Stack(
        children: [
          AnimatedBuilder(
            animation: vm,
            builder: (c, _) {
              return FlutterMap(
                options: MapOptions(center: LatLng(45.27, 29.60), zoom: 8.0),
                children: [
                  TileLayer(
                    backgroundColor: const Color(0xFF262626),
                    urlTemplate:
                        'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png',
                    subdomains: const ['a', 'b', 'c'],
                  ),
                  PolygonLayer(polygons: vm.polygons),
                ],
              );
            },
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: SafeArea(
              minimum: const EdgeInsets.all(12),
              child: ReactiveDateSlider(viewModel: vm),
            ),
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
                          child: Text('Loading shapes & predictions…'),
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
                                Icons.error_outline,
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
        ],
      ),
    );
  }
}
