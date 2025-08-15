import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../view_models/demo_view_model.dart';
import 'date_slider.dart';

class ReactiveDateSlider extends StatelessWidget {
  final DemoViewModel viewModel;
  const ReactiveDateSlider({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('dd MMMM yyyy');

    return AnimatedBuilder(
      animation: viewModel,
      builder: (c, _) {
        final dates = viewModel.dates;
        final currentIndex = viewModel.currentIndex;
        final maxIndex = dates.length - 1;

        final labels =
            dates.map((d) => dateFormat.format(d.toLocal())).toList();

        if (dates.isEmpty) {
          return const Center(child: CircularProgressIndicator());
        }

        return ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 900),
          child: Card(
            color: Colors.white.withValues(alpha: .94),
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: const Icon(Icons.chevron_left),
                    tooltip: 'Previous day',
                    onPressed:
                        currentIndex > 0
                            ? () => viewModel.setCurrentIndex(currentIndex - 1)
                            : null,
                  ),
                  Expanded(
                    child: DateSlider(
                      min: 0.0,
                      max: maxIndex.toDouble(),
                      value:
                          currentIndex
                              .toDouble()
                              .clamp(0.0, maxIndex.toDouble())
                              .toDouble(),
                      labels: labels,
                      onChanged: (v) => viewModel.setCurrentIndex(v.round()),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.chevron_right),
                    tooltip: 'Next day',
                    onPressed:
                        currentIndex < maxIndex
                            ? () => viewModel.setCurrentIndex(currentIndex + 1)
                            : null,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
