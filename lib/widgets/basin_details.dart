import 'package:flutter/material.dart';

class BasinDetails extends StatelessWidget {
  final String id;
  final bool isEval;

  final VoidCallback onClose;
  final double maxWidth;

  const BasinDetails({
    super.key,
    required this.id,
    required this.isEval,
    required this.onClose,
    this.maxWidth = 900,
  }) : assert(id != '');

  String get _resultImagePath =>
      'assets/geo_eval/results_v2/epoch_02_basin_$id.png';

  String get _graphImagePath =>
      'assets/geo_eval/cleaned_graphs_visualizations/$id.png';

  static const double _baseImgW = 640;
  static const double _baseImgH = 480;
  static const double _imagesSpacing = 12;

  Widget _imageFromAsset(
    String path,
    String semanticLabel, {
    required double width,
    required double height,
    required BoxFit fit,
  }) {
    return Semantics(
      label: semanticLabel,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Container(
          color: Colors.black,
          child: Image.asset(
            path,
            width: width,
            height: height,
            fit: fit,
            errorBuilder: (context, error, stackTrace) {
              return Container(
                color: Colors.grey.shade900,
                alignment: Alignment.center,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: const [
                    Icon(Icons.broken_image, size: 36, color: Colors.white70),
                    SizedBox(height: 8),
                    Text(
                      'image not found',
                      style: TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _placeholderBox(
    String message, {
    required double width,
    required double height,
  }) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Container(
        width: width,
        height: height,
        color: Colors.grey.shade900,
        alignment: Alignment.center,
        padding: const EdgeInsets.all(12),
        child: Text(
          message,
          textAlign: TextAlign.center,
          style: const TextStyle(color: Colors.white70),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final media = MediaQuery.of(context);
    final screenW = media.size.width;
    final screenH = media.size.height;

    final double cardMaxWidth = maxWidth.clamp(0, screenW * 0.95);
    final double maxCardHeight = (screenH * 0.75).clamp(0, screenH - 48);

    final double requiredWidthForTwo = (_baseImgW * 2) + _imagesSpacing + 32;
    double horizontalScale = 1.0;
    if (cardMaxWidth < requiredWidthForTwo) {
      horizontalScale = (cardMaxWidth - _imagesSpacing - 32) / (_baseImgW * 2);
    }
    horizontalScale = horizontalScale.clamp(0.3, 1.0);

    final bool useSideBySide = horizontalScale >= 0.65;

    double verticalScale = 1.0;
    if (!useSideBySide) {
      verticalScale = (maxCardHeight - 140) / _baseImgH;
      verticalScale = verticalScale.clamp(0.35, 1.0);
    }

    final double chosenScale = useSideBySide ? horizontalScale : verticalScale;

    final double imgW = (_baseImgW * chosenScale).clamp(80.0, _baseImgW);
    final double imgH = (_baseImgH * chosenScale).clamp(60.0, _baseImgH);

    final double cardWidth =
        useSideBySide ? (imgW * 2) + _imagesSpacing + 32 : imgW + 32;

    final double cardHeight =
        useSideBySide ? imgH + 140 : (imgH * 2) + _imagesSpacing + 140;

    final double finalCardW = cardWidth.clamp(280.0, cardMaxWidth);
    final double finalCardH = cardHeight.clamp(180.0, maxCardHeight);

    return Material(
      color: Colors.transparent,
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: finalCardW,
          maxHeight: finalCardH,
          minWidth: 280,
        ),
        child: Card(
          elevation: 12,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        'Basin $id',
                        style: Theme.of(
                          context,
                        ).textTheme.titleLarge?.copyWith(fontSize: 16),
                      ),
                    ),
                    IconButton(
                      tooltip: 'Close',
                      icon: const Icon(Icons.close),
                      onPressed: onClose,
                    ),
                  ],
                ),
              ),
              const Divider(height: 1),

              Flexible(
                fit: FlexFit.loose,
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: SingleChildScrollView(
                    child:
                        useSideBySide
                            ? Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Prediction results',
                                      style:
                                          Theme.of(
                                            context,
                                          ).textTheme.titleSmall,
                                    ),
                                    const SizedBox(height: 8),
                                    isEval
                                        ? _imageFromAsset(
                                          _resultImagePath,
                                          'Predicted result for basin $id',
                                          width: imgW,
                                          height: imgH,
                                          fit: BoxFit.fill,
                                        )
                                        : _placeholderBox(
                                          'evaluation not available for train',
                                          width: imgW,
                                          height: imgH,
                                        ),
                                  ],
                                ),
                                const SizedBox(width: _imagesSpacing),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Graph structure',
                                      style:
                                          Theme.of(
                                            context,
                                          ).textTheme.titleSmall,
                                    ),
                                    const SizedBox(height: 8),
                                    _imageFromAsset(
                                      _graphImagePath,
                                      'Graph structure for basin $id',
                                      width: imgW,
                                      height: imgH,
                                      fit: BoxFit.contain,
                                    ),
                                  ],
                                ),
                              ],
                            )
                            : Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Text(
                                  'Results for 2017-2022',
                                  style: Theme.of(context).textTheme.titleSmall,
                                ),
                                const SizedBox(height: 8),
                                isEval
                                    ? Center(
                                      child: _imageFromAsset(
                                        _resultImagePath,
                                        'Predicted results for basin $id',
                                        width: imgW,
                                        height: imgH,
                                        fit: BoxFit.fill,
                                      ),
                                    )
                                    : Center(
                                      child: _placeholderBox(
                                        'Graph is not available for train basins',
                                        width: imgW,
                                        height: imgH,
                                      ),
                                    ),
                                const SizedBox(height: _imagesSpacing),
                                Text(
                                  'Graph structure',
                                  style: Theme.of(context).textTheme.titleSmall,
                                ),
                                const SizedBox(height: 8),
                                Center(
                                  child: _imageFromAsset(
                                    _graphImagePath,
                                    'Cleaned graph visualization for basin $id',
                                    width: imgW,
                                    height: imgH,
                                    fit: BoxFit.contain,
                                  ),
                                ),
                              ],
                            ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        isEval
                            ? 'Graph shows the values normalized, KGE is for the denormalized values'
                            : 'No graphs for training',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: const Color.fromARGB(255, 61, 61, 61),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
