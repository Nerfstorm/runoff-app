import 'package:latlong2/latlong.dart';

import '../models/basin_shape.dart';

BBox computeBBox(List<LatLng> pts) {
  double minLat = pts.first.latitude;
  double maxLat = pts.first.latitude;
  double minLon = pts.first.longitude;
  double maxLon = pts.first.longitude;
  for (final p in pts) {
    if (p.latitude < minLat) minLat = p.latitude;
    if (p.latitude > maxLat) maxLat = p.latitude;
    if (p.longitude < minLon) minLon = p.longitude;
    if (p.longitude > maxLon) maxLon = p.longitude;
  }
  return BBox(minLat, maxLat, minLon, maxLon);
}

LatLng polygonCentroid(List<LatLng> pts) {
  double signedArea = 0.0;
  double cx = 0.0;
  double cy = 0.0;
  final n = pts.length;
  for (int i = 0; i < n; i++) {
    final a = pts[i];
    final b = pts[(i + 1) % n];
    final x0 = a.longitude;
    final y0 = a.latitude;
    final x1 = b.longitude;
    final y1 = b.latitude;
    final cross = x0 * y1 - x1 * y0;
    signedArea += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  signedArea *= 0.5;
  if (signedArea.abs() < 1e-12) {
    final avgLat = pts.map((p) => p.latitude).reduce((a, b) => a + b) / n;
    final avgLon = pts.map((p) => p.longitude).reduce((a, b) => a + b) / n;
    return LatLng(avgLat, avgLon);
  }
  cx /= (6.0 * signedArea);
  cy /= (6.0 * signedArea);
  return LatLng(cy, cx);
}

bool bboxContains(BBox box, LatLng p) {
  return p.latitude >= box.minLat &&
      p.latitude <= box.maxLat &&
      p.longitude >= box.minLon &&
      p.longitude <= box.maxLon;
}

bool pointInPolygon(LatLng point, List<LatLng> polygon) {
  final y = point.latitude;
  final x = point.longitude;
  var inside = false;
  for (int i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    final xi = polygon[i].longitude, yi = polygon[i].latitude;
    final xj = polygon[j].longitude, yj = polygon[j].latitude;
    final intersects =
        ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}
