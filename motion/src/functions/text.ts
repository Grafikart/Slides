import type { Txt } from "@motion-canvas/2d";
import { all, chain, easeOutCubic } from "@motion-canvas/core";

export function changeTextWithFade(
  node: Txt,
  s: string,
  letterSpacing?: number
) {
  const baseLetterSpacing = letterSpacing ?? node.letterSpacing();
  return chain(
    all(node.letterSpacing(-30, 0.3, easeOutCubic), node.opacity(0, 0.3)),
    node.text(s, 0),
    all(
      node.letterSpacing(baseLetterSpacing, 0.3, easeOutCubic),
      node.opacity(1, 0.3)
    )
  );
}
