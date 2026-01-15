import {
  Code,
  LezerHighlighter,
  makeScene2D,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import { all, createRef, createSignal, waitFor } from "@motion-canvas/core";
import { VideoSync } from "../../functions/videoSync";

import { parser as CSSParser } from "@lezer/css";
import { parser as HTMLParser } from "@lezer/html";
import { colors } from "../../colors";
import { NamedRect } from "../../components/NamedRect";

Code.defaultHighlighter = new LezerHighlighter(HTMLParser);

const tableItems = [
  { name: "Vélo", price: "300 €" },
  { name: "Trottinette", price: "150 €" },
  { name: "Skateboard", price: "80 €" },
  { name: "Roller", price: "120 €" },
];

export default makeScene2D(function* (view) {
  const previewColor = "#212131";
  view.fill(previewColor);

  const width = view.width();
  const height = view.height();
  const sync = new VideoSync("00:09:29:22");
  const codeRefs = [createRef<Code>(), createRef<Code>()];
  const cssHeight = createSignal(170);
  const htmlHeight = createSignal(() => height - cssHeight());
  const tableRef = createRef<Rect>();

  view.add(
    <Rect
      layout
      width={width}
      height={height}
      gap={10}
      padding={10}
      direction="row"
    >
      <Rect layout direction="column" height="100%" width={width / 2} gap={10}>
        <NamedRect
          width="100%"
          height={htmlHeight}
          title="page.html"
          justifyContent="start"
        >
          <Code
            marginLeft={50}
            fontSize={30}
            ref={codeRefs[0]}
            code={`<table>\n${tableItems.map((item) => `  <tr>\n    <th>${item.name}</th>\n    <td>${item.price}</td>\n  </tr>`).join("\n")}\n</table>`}
          />
        </NamedRect>
        <NamedRect
          width="100%"
          height={cssHeight}
          title="app.css"
          justifyContent="start"
          alignItems="start"
        >
          <Code
            marginTop={60}
            marginLeft={40}
            ref={codeRefs[1]}
            code={`@import "tailwindcss";`}
            fontSize={30}
            highlighter={new LezerHighlighter(CSSParser)}
          />
        </NamedRect>
      </Rect>
      <Rect
        width={width / 2}
        height="100%"
        layout
        direction="column"
        justifyContent="center"
        alignItems="center"
        paddingBottom={300}
      >
        <Rect
          ref={tableRef}
          layout
          direction="column"
          fill="#1e1e2e"
          radius={8}
          clip
          width="50%"
        >
          {tableItems.map((item, i) => (
            <Rect layout direction="row" width="100%">
              <Rect
                padding={[16, 24]}
                width="100%"
                stroke={colors.bgLight}
                lineWidth={1}
              >
                <Txt fill="#ffffff" fontSize={28}>
                  {item.name}
                </Txt>
              </Rect>
              <Rect
                padding={[16, 24]}
                width="100%"
                stroke={colors.bgLight}
                lineWidth={1}
              >
                <Txt fill="#ffffff" fontSize={28}>
                  {item.price}
                </Txt>
              </Rect>
            </Rect>
          ))}
        </Rect>
      </Rect>
    </Rect>,
  );

  const root = view.childAs<Rect>(0);

  yield* sync.waitTill("00:09:37:13", 0);

  // Add bg-muted class to odd rows
  yield* all(
    codeRefs[0]().code(
      `<table>\n${tableItems.map((item, i) => `  <tr>\n    <th>${item.name}</th>\n    <td${i % 2 === 1 ? ' class="bg-muted"' : ""}>${item.price}</td>\n  </tr>`).join("\n")}\n</table>`,
      1,
    ),
    ...tableItems
      .filter((_, i) => i % 2 === 1)
      .map((_, i) => {
        const row = tableRef().childAs<Rect>(i * 2 + 1);
        return all(row.childAs<Rect>(1).fill(colors.bgLight, 1));
      }),
  );

  yield* sync.waitTill("00:09:46:14", 1);

  yield* all(
    codeRefs[0]().code(
      `<table>\n${tableItems.map((item, i) => `  <tr class="group">\n    <th>${item.name}</th>\n    <td class="group-even:bg-muted">${item.price}</td>\n  </tr>`).join("\n")}\n</table>`,
      1,
    ),
  );

  yield* sync.waitTill("00:09:57:14", 1);

  yield* all(
    codeRefs[0]().code(
      `<table class="[&_tr:nth-child(2n)_td]:bg-muted">\n${tableItems.map((item, i) => `  <tr>\n    <th>${item.name}</th>\n    <td>${item.price}</td>\n  </tr>`).join("\n")}\n</table>`,
      1,
    ),
  );

  yield* sync.waitTill("00:10:07:11", 1);

  yield* all(
    codeRefs[0]().code(
      `<table class="[&_tr:nth-child(2n)_td]:bg-muted">\n${tableItems.map((item, i) => `  <tr>\n    <th>${item.name}</th>\n    <td${i === 1 ? ' class="bg-primary"' : ""}>${item.price}</td>\n  </tr>`).join("\n")}\n</table>`,
      1,
    ),
  );

  yield* sync.waitTill("00:10:15:06", 1);

  yield* all(
    codeRefs[0]().code(
      `<table class="table-striped">\n${tableItems
        .map(
          (item, i) =>
            `  <tr>\n    <th>${item.name}</th>\n    <td>${item.price}</td>\n  </tr>`,
        )
        .join("\n")}\n</table>`,
      1,
    ),
  );

  yield* sync.waitTill("00:10:18:06", 1);

  yield* all(
    codeRefs[0]().code(
      `<table class="table-striped">\n${tableItems
        .slice(0, 2)
        .map(
          (item, i) =>
            `  <tr>\n    <th>${item.name}</th>\n    <td>${item.price}</td>\n  </tr>`,
        )
        .join("\n")}\n  <!-- ... -->\n</table>`,
      1,
    ),
    cssHeight(500, 1),
    codeRefs[1]().code(
      `
  @import "tailwindcss";

  @layer components {

    .table-striped tr:nth-child(2n) td {
      background: var(--color-muted);
    }

  }`,
      1,
    ),
  );

  yield* waitFor(2);
});
