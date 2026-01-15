import {
  Code,
  LezerHighlighter,
  lines,
  makeScene2D,
  Rect,
} from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitFor } from "@motion-canvas/core";
import { VideoSync } from "../../functions/videoSync";

import { parser as CSSParser } from "@lezer/css";
import { parser as HTMLParser } from "@lezer/html";
import { parser as PHPParser } from "@lezer/php";
import { NamedRect } from "../../components/NamedRect";

Code.defaultHighlighter = new LezerHighlighter(HTMLParser);

// Variants with their associated CSS
const variants = [
  {
    name: "primary",
    condition: `variant == 'primary' && "btn-primary"`,
    css: `.btn-primary {
  background: #3b82f6;
  color: #ffffff;
}`,
  },
  {
    name: "secondary",
    condition: `variant == 'secondary' && "btn-secondary"`,
    css: `.btn-secondary {
  background: #6b7280;
  color: #ffffff;
}`,
  },
  {
    name: "tertiary",
    condition: `variant == 'tertiary' && "btn-tertiary"`,
    css: `.btn-tertiary {
  background: transparent;
  border: 1px solid #3b82f6;
}`,
  },
  {
    name: "sm",
    condition: `size == 'sm' && "btn-sm"`,
    css: `.btn-sm {
  padding: 4px 8px;
  font-size: 175rem;
}`,
  },
  {
    name: "lg",
    condition: `size == 'lg' && "btn-lg"`,
    css: `.btn-lg {
  padding: 16px 32px;
  font-size: 1.25rem;
}`,
  },
];

export default makeScene2D(function* (view) {
  const previewColor = "#212131";
  view.fill(previewColor);

  const width = view.width();
  const height = view.height();
  const sync = new VideoSync("00:05:15:05");
  const codeRefs = [createRef<Code>(), createRef<Code>()];

  view.add(
    <Rect
      layout
      width={width}
      height={height}
      gap={10}
      padding={10}
      direction="row"
    >
      <NamedRect
        width={width / 2}
        title="my-button.html"
        justifyContent="center"
      >
        <Code
          fontSize={35}
          highlighter={new LezerHighlighter(PHPParser)}
          ref={codeRefs[0]}
          code={`<button class="">
  <?= $content ?>
</button>`}
        />
      </NamedRect>
      <NamedRect
        width={width / 2}
        title="my-button.css"
        justifyContent="center"
      >
        <Code
          ref={codeRefs[1]}
          code=""
          fontSize={30}
          highlighter={new LezerHighlighter(CSSParser)}
        />
      </NamedRect>
    </Rect>,
  );

  const root = view.childAs<Rect>(0);

  yield* sync.waitTill("00:05:18:15");

  // Animate each variant
  let currentConditions: string[] = [];
  let currentCSS: string[] = [];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    currentConditions.push(variant.condition);
    currentCSS.push(variant.css);

    const conditionsStr = currentConditions.join(",\n  ");
    const phpCode = `<button class="<?= cls(
  ${conditionsStr},
) ?>">
  <?= $content ?>
</button>`;

    const cssCode = currentCSS.join("\n\n");

    yield* all(codeRefs[0]().code(phpCode, 1), codeRefs[1]().code(cssCode, 1));
  }

  yield* sync.waitTill("00:05:36:15", 5);

  yield* all(codeRefs[0]().selection(lines(4), 1));

  yield* sync.waitTill("00:05:38:15", 1);

  yield* all(codeRefs[1]().selection(lines(14, 18), 1));

  yield* sync.waitTill("00:05:47:10", 1);

  // --- Part 2: Replace custom classes with Tailwind ---

  yield* all(
    codeRefs[0]().code(
      `<button class="<?= cls(
  variant == 'primary' && "bg-blue-500 text-white",
  variant == 'secondary' && "bg-gray-500 text-white",
  variant == 'tertiary' && "bg-transparent border border-blue-500",
  size == 'sm' && "px-2 py-1 text-sm",
  size == 'lg' && "px-8 py-4 text-xl",
) ?>">
  <?= $content ?>
</button>`,
      1,
    ),
    codeRefs[0]().selection(DEFAULT, 1),
    codeRefs[1]().selection(DEFAULT, 1),
    root.childAs<Rect>(1).width(0, 1),
    root.childAs<Rect>(1).opacity(0, 1),
    root.childAs<Rect>(0).width(width, 1),
  );

  yield* sync.waitTill("00:05:52:00", 1);

  yield* all(
    codeRefs[0]().code(
      `<button class="<?= cls(
  variant == 'primary' && "bg-blue-500 text-white",
  variant == 'secondary' && "bg-gray-500 text-white",
  variant == 'tertiary' && "bg-transparent border border-blue-500",
  size == 'sm' && "px-2 py-1 text-sm",
  size == 'lg' && "px-8 py-4 text-xl",
) ?>">
  <?= $content ?>
</button>`,
      1,
    ),
    codeRefs[0]().selection(lines(4), 1),
  );

  yield* all(
    codeRefs[0]().code(
      `<button class="<?= cls(
  variant == 'primary' && "bg-blue-500 text-white",
  variant == 'secondary' && "bg-gray-500 text-white",
  variant == 'tertiary' && "bg-transparent border border-blue-500",
  size == 'sm' && "px-1 py-0.5 text-sm",
  size == 'lg' && "px-8 py-4 text-xl",
) ?>">
  <?= $content ?>
</button>`,
      1,
    ),
  );

  yield* waitFor(1);
});
