import { Code, LezerHighlighter, makeScene2D, Rect } from "@motion-canvas/2d";
import { all, createRef, createSignal, waitFor } from "@motion-canvas/core";
import { VideoSync } from "../../functions/videoSync";

import { parser as CSSParser } from "@lezer/css";
import { parser as HTMLParser } from "@lezer/html";
import { NamedRect } from "../../components/NamedRect";

Code.defaultHighlighter = new LezerHighlighter(HTMLParser);

export default makeScene2D(function* (view) {
  const previewColor = "#212131";
  view.fill(previewColor);

  const width = view.width();
  const height = view.height();
  const sync = new VideoSync("00:08:21:20");
  const codeRefs = [createRef<Code>(), createRef<Code>()];
  const cssWidth = createSignal(500);
  const htmlWidth = createSignal(() => width - cssWidth());

  view.add(
    <Rect
      layout
      width={width}
      height={height}
      gap={10}
      padding={10}
      direction="row"
    >
      <NamedRect width={htmlWidth} title="page.html" justifyContent="center">
        <Code
          fontSize={30}
          ref={codeRefs[0]}
          code={`<button
  class="text-white px-4 py-2 rounded">
  Acheter
</button>`}
        />
      </NamedRect>
      <NamedRect
        width={cssWidth}
        title="app.css"
        justifyContent="start"
        alignItems="start"
      >
        <Code
          marginTop={100}
          marginLeft={40}
          ref={codeRefs[1]}
          code={`@import "tailwindcss";`}
          fontSize={30}
          highlighter={new LezerHighlighter(CSSParser)}
        />
      </NamedRect>
    </Rect>,
  );

  const root = view.childAs<Rect>(0);

  yield* sync.waitTill("00:08:25:04");

  yield* codeRefs[0]().code(
    `<button
  class="bg-blue-500 hover:bg-blue-600 text-white…">
  Acheter
</button>`,
    1,
  );

  yield* sync.waitTill("00:08:58:06", 1);

  // Replace colors with semantic names and add CSS config
  yield* all(
    cssWidth(700, 1),
    codeRefs[1]().code(
      `@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-foreground: #FFF;
}

.dark {
  --color-primary: #3b82f6;
  --color-primary-hover: #1d4ed8;
}
`,
      1,
    ),
  );

  yield* sync.waitTill("00:09:04:01", 1);

  yield* all(
    codeRefs[0]().code(
      `<button
  class="bg-primary hover:bg-primary-hover text-primary-foreground…">
  Acheter
</button>`,
      1,
    ),
  );

  yield* waitFor(1);
});
