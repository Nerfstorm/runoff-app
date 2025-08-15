import 'package:latlong2/latlong.dart';

class BBox {
  final double minLat, maxLat, minLon, maxLon;
  BBox(this.minLat, this.maxLat, this.minLon, this.maxLon);
}

class BasinShape {
  final String id;
  final List<LatLng> points;
  final bool isEval;
  final BBox bbox;
  final LatLng centroid;

  BasinShape({
    required this.id,
    required this.points,
    required this.isEval,
    required this.bbox,
    required this.centroid,
  });
}
