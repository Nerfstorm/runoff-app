import 'package:flutter/material.dart';

import 'dart:math' as math;

const double maxFlow = 15121.171;

final List<Color> gradientStops = const [
  Color(0xFFFD581B),
  Color(0xFFEA9E55),
  Color.fromARGB(255, 107, 184, 53),
  Color(0xFF2CC6E3),
  Color(0xFF0988CA),
  Color(0xFF0E4490),
];

final double globalLogMax = math.log(1 + maxFlow); // log1p
const double globalLogMin = 0.0;

final double globalLogDenom = globalLogMax - globalLogMin;

double undoLog1pNorm(double yNorm) {
  final logVals = yNorm * globalLogDenom + globalLogMin;
  return math.exp(logVals) - 1.0; // expm1
}

Color multiLerpHSV(List<Color> stops, double t) {
  if (stops.isEmpty) return Colors.transparent;
  if (stops.length == 1) return stops.first;
  t = t.clamp(0.0, 1.0);
  final segments = stops.length - 1;
  final pos = t * segments;
  final idx = pos.floor();
  if (idx >= segments) return stops.last;
  final localT = pos - idx;
  final a = stops[idx];
  final b = stops[idx + 1];
  final hsvA = HSVColor.fromColor(a);
  final hsvB = HSVColor.fromColor(b);
  final hsv = HSVColor.lerp(hsvA, hsvB, localT) ?? hsvB;
  return hsv.toColor();
}
