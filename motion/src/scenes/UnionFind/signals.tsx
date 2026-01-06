import { all, createSignal, type SimpleSignal } from "@motion-canvas/core";
import type { Reference } from "@motion-canvas/core/lib/utils";
import { Circle, Node, Spline, Txt } from "@motion-canvas/2d";
import { colors } from "../../colors";

type Point = { id: string; position: SimpleSignal<[number, number]> };

export function createGraphSignal(nodeRef: Reference<Node>) {
  const nodes = new Map<string, Node>();
  const links = new Map<string, Node>();
  let highlighted = null as null | Node;

  return {
    node(id: string) {
      return nodes.get(id)!;
    },
    position(id: string) {
      return nodes.get(id).position();
    },
    *addNode(id: string, x: number, y: number) {
      const node = (
        <Node position={[x, y]} zIndex={3}>
          <Circle
            lineWidth={6}
            size={0}
            fill={colors.bg}
            stroke={colors.yellow}
          />
          <Txt fill={colors.yellow} opacity={0}>
            {id}
          </Txt>
        </Node>
      );
      nodeRef().add(node);
      nodes.set(id, node);
      yield* all(
        node.childAs<Txt>(1).opacity(1, 1),
        node.childAs<Circle>(0).size(80, 1),
      );
    },
    *moveNode(id: string, x: number, y: number) {
      yield* nodes.get(id).position([x, y], 1);
    },
    *addLink(id1: string, id2: string) {
      const id = id1 + id2;
      const link = (
        <Spline
          stroke={colors.textLight}
          zIndex={2}
          points={positionsToPaths(nodes.get(id1), nodes.get(id1))}
          lineWidth={3}
          smoothness={0}
        />
      ) as Spline;
      nodeRef().add(link);
      links.set(id, link);
      yield* link.points(positionsToPaths(nodes.get(id1), nodes.get(id2)), 1);
    },
    *removeLink(id1: string, id2: string) {
      const id = id1 + id2;
      yield* links
        .get(id)
        .points(positionsToPaths(nodes.get(id1), nodes.get(id1)), 1);
    },
    *unfocusNode(id: string) {
      const node = nodes.get(id);
      yield* all(
        node.childAs<Circle>(0).fill(colors.bg, 1),
        node.childAs<Txt>(1).fill(colors.yellow, 1),
      );
      highlighted = null;
    },
    *highlightNode(id: string, removeHighlighted = false) {
      if (highlighted && !removeHighlighted) {
        yield* all(
          highlighted.childAs<Circle>(0).fill(colors.bg, 1),
          highlighted.childAs<Txt>(1).fill(colors.yellow, 1),
        );
      }
      yield* all(
        nodes.get(id).childAs<Circle>(0).fill(colors.yellow, 1),
        nodes.get(id).childAs<Txt>(1).fill(colors.bg, 1),
      );
      highlighted = nodes.get(id);
    },
  };
}

function positionsToPaths(node1: Node, node2: Node) {
  return createSignal(() => {
    const p1 = node1.position();
    const p2 = node2.position();
    console.log(
      JSON.stringify([
        [p1.x, p1.y],
        [p2.x, p2.y],
      ]),
    );
    return [
      [p1.x, p1.y],
      [p2.x, p2.y],
    ];
  });
}
