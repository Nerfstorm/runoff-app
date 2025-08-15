import 'package:flutter/material.dart';
import 'pages/evaluation_page.dart';
import 'pages/demo_page.dart';

import 'view_models/demo_view_model.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  final DemoViewModel vm = DemoViewModel();

  @override
  Widget build(BuildContext ctx) {
    return MaterialApp(
      title: 'Runoff Map Demo',
      initialRoute: '/',
      routes: {
        '/': (_) => const EvaluationPage(),
        '/map': (_) => DemoPage(vm: vm),
      },
    );
  }
}
