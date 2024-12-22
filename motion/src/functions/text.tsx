import {Txt, type Node, Rect} from "@motion-canvas/2d";
import {all, chain, createRef, easeOutCubic} from "@motion-canvas/core";
import {colors} from "../colors";
import {hideBottom, hideLeft, showBottom, showRight} from "./visibility";

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

export function addBottomTitle(
  node: Node,
  s: string
) {
  const padding = 40;
  const text = createRef<Txt>()
  const rect = createRef<Rect>()
  node.add(<Rect ref={rect} position={[1920 * -.5 + padding, 1080 * .5 - 50 - padding]} width={0} height={0} layout>
    <Txt
      ref={text}
      fontFamily="Inter"
    fontWeight={400}
    fill={colors.text}
    text={s}/>
    </Rect>)
  return {
    show (d: number) {
        return showBottom(rect(), d)
    },
    hide (d: number) {
      return hideBottom(rect(), d)
    }
  }
}
