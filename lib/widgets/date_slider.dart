import 'dart:math' as math;
import 'package:flutter/material.dart';

class DateSlider extends StatelessWidget {
  final double min;
  final double max;
  final double value;
  final List<String> labels;
  final ValueChanged<double> onChanged;

  const DateSlider({
    super.key,
    required this.min,
    required this.max,
    required this.value,
    required this.labels,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext ctx) {
    final double effectiveMin = math.min(min, max);
    final double effectiveMax = math.max(min, max);

    final double effectiveValue =
        (value.isNaN) ? effectiveMin : value.clamp(effectiveMin, effectiveMax);

    final int stepCount = (effectiveMax - effectiveMin).round();
    final int? divisions = stepCount > 0 ? stepCount : null;

    final int labelIndex =
        labels.isEmpty
            ? 0
            : math.max(0, math.min(labels.length - 1, effectiveValue.round()));

    if (effectiveMax == effectiveMin || labels.length <= 1) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6.0),
            child: Row(
              children: [
                const Icon(Icons.calendar_today, size: 16),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    labels.isNotEmpty ? labels[labelIndex] : 'No date',
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
                if (labels.length == 1)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Text('1', style: TextStyle(fontSize: 12)),
                  ),
              ],
            ),
          ),
          if (labels.isNotEmpty)
            Text(labels[labelIndex], style: const TextStyle(fontSize: 12))
          else
            const SizedBox(height: 12),
        ],
      );
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        SliderTheme(
          data: SliderTheme.of(ctx).copyWith(
            trackHeight: 6,
            thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 10),
            overlayShape: const RoundSliderOverlayShape(overlayRadius: 18),
            valueIndicatorShape: const PaddleSliderValueIndicatorShape(),
            valueIndicatorTextStyle: const TextStyle(
              fontSize: 12,
              color: Colors.white,
            ),
            activeTrackColor: Colors.blue.shade700,
            inactiveTrackColor: Colors.blue.shade100,
            thumbColor: Colors.blue.shade700,
            overlayColor: Colors.blue.shade700.withValues(alpha: 0.12),
          ),
          child: Slider(
            min: effectiveMin,
            max: effectiveMax,
            divisions: divisions,
            value: effectiveValue.toDouble(),
            label: labels.isNotEmpty ? labels[labelIndex] : null,
            onChanged: onChanged,
          ),
        ),

        if (labels.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 4.0),
            child: Text(
              labels[labelIndex],
              style: const TextStyle(fontSize: 12),
            ),
          )
        else
          const SizedBox(height: 12),
      ],
    );
  }
}
