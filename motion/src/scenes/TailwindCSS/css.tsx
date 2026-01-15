import {
  Code,
  LezerHighlighter,
  makeScene2D,
  Rect,
  Txt,
  type RectProps,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  delay,
  waitFor,
} from "@motion-canvas/core";
import { colors } from "../../colors";
import { VideoSync } from "../../functions/videoSync";

import { parser as CSSParser } from "@lezer/css";
import { parser as HTMLParser } from "@lezer/html";

const CSSHighlighter = new LezerHighlighter(CSSParser);
const HTMLHighlighter = new LezerHighlighter(HTMLParser);

export default makeScene2D(function* (view) {
  const previewColor = "#212131";
  view.fill(previewColor);

  const width = view.width();
  const height = view.height();
  const sync = new VideoSync("00:02:00:01");

  const htmlRef = createRef<Code>();
  const buttonRef = createRef<Rect>();
  const textRef = createRef<Txt>();
  const cssCodeRef = createRef<Code>();
  const previewWidth = createSignal(width / 3);
  const codeWidth = createSignal(() => width - previewWidth());

  view.add(
    <Rect
      layout
      direction="row"
      width={width}
      height={height}
      gap={64}
      padding={10}
    >
      {/* Left side - Code */}
      <Rect layout direction="column" width={codeWidth} gap={10}>
        <Box title="HTML" height={height}>
          <Code
            highlighter={HTMLHighlighter}
            ref={htmlRef}
            fontSize={42}
            code={`<button>
  Acheter
</button>`}
          />
        </Box>
        <Box title="CSS" width={codeWidth} height={height}>
          <Code
            highlighter={CSSHighlighter}
            ref={cssCodeRef}
            fontSize={42}
            code={``}
          />
        </Box>
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
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* sync.waitTill("00:02:01:00");

  yield* all(
    htmlRef().code(
      `<button class="btn btn-primary">
  Acheter
</button>`,
      1,
    ),
  );

  yield* sync.waitTill("00:02:04:00", 1);

  yield* all(
    cssCodeRef().code(
      `.btn {
  padding: 8px 16px;
  border-radius: 8px;
}
.btn-primary {
  background: #3b82f6;
  color: white;
}`,
      1,
    ),
    delay(
      0.5,
      all(
        buttonRef().fill("#3b82f6", 1),
        buttonRef().radius(8, 1),
        buttonRef().padding([8, 16], 1),
        textRef().fill("#ffffff", 1),
      ),
    ),
  );
  yield* waitFor(3);
});

function Box<T>({ title, children, ...props }: { title: string } & RectProps) {
  return (
    <Rect layout direction="column" fill={colors.bg} radius={20} {...props}>
      <Rect justifyContent="start" width="100%" padding={[10, 20]} height={0}>
        <Txt fill={colors.textLight} fontSize={30}>
          {title}
        </Txt>
      </Rect>
      <Rect
        height="100%"
        alignItems="center"
        justifyContent="start"
        paddingLeft={100}
      >
        {children}
      </Rect>
    </Rect>
  );
}
