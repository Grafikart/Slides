import { Code, makeScene2D, Node, Rect } from "@motion-canvas/2d";
import { colors } from "../../colors";
import {
  all,
  createRef,
  createSignal,
  sequence,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { createGraphSignal } from "./signals";

const distance = 200;

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const width = view.width();
  const height = view.height();

  const rootRef = createRef<Node>();
  const graph = createGraphSignal(rootRef);

  const cache = (
    <Rect
      fill={colors.bg}
      zIndex={4}
      width={width}
      height={height}
      opacity={0}
    />
  ) as Rect;

  const code = (
    <Code
      position={[0, 0]}
      width={width}
      zIndex={5}
      height={height}
      code={``}
    />
  ) as Code;

  view.add(
    <>
      <Node ref={rootRef} position={[0, -height / 4]} />
      {code}
      {cache}
    </>,
  );
  yield* sequence(
    0.1,
    graph.addNode("A", -width / 4, 0),
    graph.addNode("B", -distance - width / 4, distance),
    graph.addNode("C", distance - width / 4, distance),
    graph.addNode("D", distance * 2 - width / 4, distance * 2),
    graph.addNode("E", -width / 4, distance * 2),
    graph.addNode("F", width / 4, 0),
    graph.addNode("G", width / 4, distance),
    graph.addNode("H", width / 4 + distance, distance * 2),
    graph.addNode("I", width / 4 - distance, distance * 2),
    graph.addNode("J", 0, -distance / 2),
    graph.addNode("K", 0, distance),
  );
  yield* sequence(
    0.1,
    graph.addLink("A", "B"),
    graph.addLink("A", "C"),
    graph.addLink("C", "E"),
    graph.addLink("C", "D"),
    graph.addLink("F", "G"),
    graph.addLink("G", "I"),
    graph.addLink("G", "H"),
    graph.addLink("J", "K"),
  );

  yield* waitUntil("node");

  yield* all(
    cache.opacity(0.95, 1),
    code.code(
      `\
[
  {
    id: 'a',
    label: 'a',
  },
  {
    id: 'b',
    label: 'b',
  }
  // ...
]`,
      1,
    ),
  );
  yield* waitUntil("edge");

  yield* code.code(
    `\
[
  {
    source: 'a',
    target: 'b',
  },
  {
    source: 'a',
    target: 'c',
  }
  // ...
]`,
    1,
  );

  yield* waitUntil("NodeExploration");
  yield* all(cache.opacity(0, 1), code.code("", 1));
  yield* sequence(
    0.5,
    graph.highlightNode("D", true),
    graph.highlightNode("C", true),
    graph.highlightNode("A", true),
    graph.highlightNode("B", true),
  );

  yield* waitUntil("Loop");
  yield* all(
    graph.unfocusNode("D"),
    graph.unfocusNode("C"),
    graph.unfocusNode("A"),
    graph.unfocusNode("B"),
    graph.addLink("E", "D"),
  );
  yield* sequence(
    0.5,
    graph.highlightNode("D", true),
    graph.highlightNode("C", true),
    graph.highlightNode("E", true),
  );

  yield* waitUntil("links");

  yield* all(
    graph.removeLink("E", "D"),
    graph.unfocusNode("D"),
    graph.unfocusNode("C"),
    graph.unfocusNode("E"),
    cache.opacity(0.9, 1),
    code.code(
      `\
  class UnionFind {

    find(id)

    union(id1, id2)

  }
  `,
      1,
    ),
  );

  yield* waitUntil("union");

  yield* all(
    cache.opacity(0, 1),
    code.code("", 1),
    graph.removeLink("C", "E"),
    graph.removeLink("C", "D"),
    graph.removeLink("F", "G"),
    graph.removeLink("G", "I"),
    graph.removeLink("G", "H"),
    graph.removeLink("J", "K"),
  );
  yield* graph.highlightNode("D");
  yield* graph.addLink("D", "A");
  yield* all(
    graph.moveNode("D", distance - width / 4, distance),
    graph.moveNode("C", -width / 4, distance),
  );
  yield* graph.highlightNode("E");
  const a = graph.position("A");
  a.y = height / 4;
  yield* all(
    graph.addLink("E", "A"),
    graph.moveNode("E", a.x - distance, a.y),
    graph.moveNode("A", a.x, a.y),
    graph.moveNode("B", a.x - distance, a.y + distance),
    graph.moveNode("C", a.x, a.y + distance),
    graph.moveNode("D", a.x + distance, a.y + distance),
  );
  yield waitUntil("Union");
  yield* graph.highlightNode("A");
  yield* graph.addLink("I", "G");
  yield* graph.addLink("I", "D");
  yield* all(
    graph.removeLink("I", "D"),
    graph.moveNode("I", a.x + distance, a.y - distance),
    graph.moveNode("G", a.x + distance * 2, a.y - distance),
    graph.addLink("I", "A"),
  );
  yield waitUntil("PathCompression");
  yield* graph.highlightNode("G");
  yield* graph.highlightNode("I");
  yield* graph.highlightNode("A");
  yield* all(
    graph.moveNode("G", a.x - distance, a.y - distance),
    graph.removeLink("I", "G"),
    graph.addLink("G", "A"),
  );
  yield waitUntil("UnionBySize");
  yield* all(
    graph.addLink("J", "F"),
    graph.addLink("K", "F"),
    graph.highlightNode("A", true),
    graph.highlightNode("K", true),
  );
  yield* waitFor(1);
  yield* all(graph.addLink("A", "K"), graph.unfocusNode("A"));
  yield* waitUntil("UnionBySize2");
  yield* all(graph.unfocusNode("K"), graph.highlightNode("A"));
});
