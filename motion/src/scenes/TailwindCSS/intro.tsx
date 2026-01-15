import {
  Code,
  LezerHighlighter,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import { all, createRef, createSignal, waitFor } from "@motion-canvas/core";
import { colors } from "../../colors";
import { VideoSync } from "../../functions/videoSync";

import { parser as CSSParser } from "@lezer/css";
import { parser as HTMLParser } from "@lezer/html";

const CSSHighlighter = new LezerHighlighter(CSSParser);
const HTMLHighlighter = new LezerHighlighter(HTMLParser);

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const width = view.width();
  const height = view.height();
  const previewColor = "#212131";
  const sync = new VideoSync("00:00:56:16");

  const codeRef = createRef<Code>();
  const buttonRef = createRef<Rect>();
  const textRef = createRef<Txt>();
  const cssCodeRef = createRef<Code>();
  const previewWidth = createSignal(width / 3);
  const codeWidth = createSignal(() => width - previewWidth());

  view.add(
    <Rect layout direction="row" width={width} height={height} gap={64}>
      {/* Left side - Code */}
      <Rect
        width={codeWidth}
        height={height}
        justifyContent="center"
        alignItems="center"
      >
        <Code
          highlighter={HTMLHighlighter}
          ref={codeRef}
          fontSize={42}
          code={`<button>
  Acheter
</button>`}
        />
      </Rect>

      {/* Right side - Preview */}
      <Rect
        width={previewWidth}
        height={height}
        justifyContent="center"
        alignItems="center"
        fill={previewColor}
        margin={10}
        radius={20}
      >
        <Rect layout={false}>
          <Rect layout ref={buttonRef}>
            <Txt
              ref={textRef}
              text="Acheter"
              fill={"#000"}
              fontSize={36}
              fontFamily="monospace"
            />
          </Rect>
          <Code
            highlighter={CSSHighlighter}
            ref={cssCodeRef}
            fontSize={40}
            opacity={0}
            code=""
          />
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* sync.waitTill("00:01:02:21");

  yield* all(
    codeRef().code(
      `<button class="bg-blue-400">
  Acheter
</button>`,
      1,
    ),
    buttonRef().fill("#60a5fa", 1),
  );

  yield* sync.waitTill("00:01:05:10", 1);

  yield* all(
    codeRef().code(
      `<button class="bg-blue-400 rounded-lg">
  Acheter
</button>`,
      1,
    ),
    buttonRef().radius(8, 1),
  );

  yield* sync.waitTill("00:01:09:14", 1);

  yield* all(
    codeRef().code(
      `<button class="bg-blue-400 rounded-lg text-white">
  Acheter
</button>`,
      1,
    ),
    textRef().fill("#ffffff", 1),
  );

  yield* sync.waitTill("00:01:11:19", 1);

  yield* all(
    codeRef().code(
      `<button class="bg-blue-400 rounded-lg text-white px-4 py-2">
  Acheter
</button>`,
      1,
    ),
    previewWidth(400, 1),
    buttonRef().padding([8, 16], 1),
  );

  yield* sync.waitTill("00:01:15:10", 1);

  yield* all(
    buttonRef().opacity(0, 1),
    codeRef().opacity(0, 1),
    cssCodeRef().opacity(1, 1),
    cssCodeRef().code(
      `@layer utilities {
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .bg-blue-400 {
    background-color: var(--color-blue-400);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .text-white {
    color: var(--color-white);
  }
}`,
      0.5,
    ),
    previewWidth(width, 1),
  );

  yield* waitFor(3);
});
