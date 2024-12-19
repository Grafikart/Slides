import {type Node, type Rect} from "@motion-canvas/2d";
import {all, sequence, easeInOutCubic} from "@motion-canvas/core";

type Args = {columns?: number, gap?: number, duration?: number, delay?: number}

export function* gridify (item: Node, {columns = 1, gap = 30, delay = 0, duration = .5}: Args) {
  const items = (item.children() as Rect[]).map(
    (child, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;

      const x = col * (child.width() + gap);
      const y = row * (child.height() + gap);

      // Set the child's position
      return child.position([x, y], duration, easeInOutCubic);
    }
  )

  if (delay === 0) {
    yield * all(...items, )
  } else {
    yield* sequence(delay, ...items);
  }
}
