import 'package:flutter/material.dart';
import 'dart:async';

/**
 * @file theme_test.dart
 * Testing Flutter Widget trees, Dart 3 patterns, and Async logic.
 */

// 1. Records and Patterns (Dart 3+)
typedef UserInfo = ({int id, String name, bool isAdmin});

class ThemeTester extends StatefulWidget {
  final String title;

  const ThemeTester({
    super.key,
    required this.title,
  });

  @override
  State<ThemeTester> createState() => _ThemeTesterState();
}

class _ThemeTesterState extends State<ThemeTester> {
  // 2. Reactive State and Null Safety
  int _counter = 0;
  String? _statusMessage;
  final List<String> _logs = [];

  // 3. Late initialization and Streams
  late final StreamController<int> _controller;

  @override
  void initState() {
    super.initState();
    _controller = StreamController<int>();
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
      // Testing Switch Expressions
      _statusMessage = switch (_counter) {
        < 5 => 'Getting started...',
        == 10 => 'Double digits!',
        _ => 'Keep going!',
      };
    });
  }

  // 4. The Widget Tree (Nested Constructors)
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // Testing String Interpolation and Raw Strings
            Text(
              r'Raw string test: $NoInterpolation',
              style: TextStyle(color: Colors.grey[600]),
            ),
            const SizedBox(height: 20),
            Text(
              'Count: $_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            if (_statusMessage != null) ...[
              const SizedBox(height: 10),
              Text(
                _statusMessage!,
                style: const TextStyle(
                  color: Color(0xFF5A1D1D), // Deep Red
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
            const Divider(height: 40),
            Expanded(
              child: ListView.builder(
                itemCount: _logs.length,
                itemBuilder: (context, index) => ListTile(
                  leading: const Icon(Icons.history, color: Color(0xFF1A3A4A)), // Info Blue
                  title: Text(_logs[index]),
                ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }

  @override
  void dispose() {
    _controller.close();
    super.dispose();
  }
}
