import {
  Code,
  LezerHighlighter,
  lines,
  makeScene2D,
  Rect,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  createSignal,
  DEFAULT,
  waitFor,
} from "@motion-canvas/core";
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
  const sync = new VideoSync("00:04:09:21");
  const codeRefs = [createRef<Code>(), createRef<Code>(), createRef<Code>()];
  const pageRef = createRef<Code>();
  const titles = [createSignal(""), createSignal(""), createSignal("")];

  view.add(
    <Rect
      layout
      width={width}
      height={height}
      gap={10}
      padding={10}
      direction="row"
    >
      <NamedRect width={0} title={titles[0]} justifyContent="center">
        <Code ref={codeRefs[0]} fontSize={42} />
      </NamedRect>
      <NamedRect width={0} title={titles[1]} justifyContent="center">
        <Code ref={codeRefs[1]} fontSize={42} />
      </NamedRect>
      <NamedRect width={0} title={titles[2]} justifyContent="center">
        <Code ref={codeRefs[2]} fontSize={42} />
      </NamedRect>
    </Rect>,
  );
  const root = view.childAs<Rect>(0);
  yield* sync.waitTill("00:04:12:05");

  yield* all(
    root.childAs<Rect>(0).width(width, 1),
    titles[0]("HTML", 1),
    codeRefs[0]().code(
      `<my-button>
  Acheter
</my-button>`,
      1,
    ),
  );

  yield* sync.waitTill("00:04:16:16", 1);

  yield* all(
    codeRefs[0]().code(
      `<my-button variant="primary">
  Acheter
</my-button>`,
      1,
    ),
  );

  yield* sync.waitTill("00:04:18:00", 1);

  yield* all(
    codeRefs[0]().code(
      `<my-button variant="primary" size="sm">
  Acheter
</my-button>`,
      1,
    ),
  );

  yield* sync.waitTill("00:04:25:00", 1);

  yield* all(
    codeRefs[0]().fontSize(35, 1),
    codeRefs[0]().opacity(0.2, 1),
    titles[1]("page.html", 1),
    root.childAs<Rect>(0).width((width * 1) / 4, 1),
    root.childAs<Rect>(1).width((width * 3) / 4, 1),
    codeRefs[1]().code(
      `<article>
  <h2>Titre de l'article</h2>
  <my-button variant="secondary" href="/article">
    Voir l'article
  </my-button>
</article>`,
      1,
    ),
    codeRefs[1]().selection(lines(2, 4), 1),
  );

  yield* sync.waitTill("00:04:39:02", 1);

  yield* all(
    codeRefs[1]().code(`<product-card />`, 1),
    root.childAs<Rect>(0).width(0, 1),
    root.childAs<Rect>(1).width(width, 1),
    codeRefs[1]().selection(DEFAULT, 1),
  );

  yield* sync.waitTill("00:04:44:02", 1);

  yield* codeRefs[1]().code(`<product-card title="Vélo" />`, 1);

  yield* sync.waitTill("00:04:45:02", 1);

  yield* codeRefs[1]().code(`<product-card title="Vélo" price="299" />`, 1);

  yield* sync.waitTill("00:04:50:17", 1);

  yield* all(
    codeRefs[0]().opacity(1, 1),
    codeRefs[0]().fontSize(30, 1),
    codeRefs[0]().textAlign("start", 1),
    codeRefs[0]().code("", 1),
    titles[1]("", 1),
    titles[0]("", 1),
    root.childAs<Rect>(0).width(0, 1),
    root.childAs<Rect>(1).width(0, 1),
    codeRefs[1]().code("", 1),
    codeRefs[1]().fontSize(30, 1),
  );
  codeRefs[1]().highlighter(new LezerHighlighter(CSSParser));

  yield* sync.waitTill("00:04:58:00", 1);

  yield* all(
    titles[0]("page.html", 1),
    root.childAs<Rect>(0).width(width / 2, 1),
    codeRefs[0]().code(
      `<article class="post-card">
  <h2 class="post-title">Titre de l'article</h2>
  <div class="post-meta-wrapper">
    <div class="post-date">Posté le 3 mars 2024</div>
    <div class="post-author">Par Grafikart</div>
  </div>
  <p class="post-excerpt">Aperçu du contenu</p>
  <a class="post-link" href="/article">Voir l'article</a>
</article>`,
      1,
    ),
  );

  yield* sync.waitTill("00:04:59:00", 1);

  yield* all(
    codeRefs[0]().selection(codeRefs[0]().findAllRanges(/class="[^"]*"/gi), 1),
  );

  yield* all(
    titles[1]("page.css", 1),
    root.childAs<Rect>(1).width(width / 2, 1),
    codeRefs[1]().code(
      `.post-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.post-meta-wrapper {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.post-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.post-author {
  color: #6b7280;
  font-style: italic;
}`,
      1,
    ),
  );

  yield* sync.waitTill("00:05:02:00", 2);

  yield* all(
    titles[1]("", 1),
    root.childAs<Rect>(1).width(0, 1),
    codeRefs[1]().code(``, 1),
    codeRefs[0]().fontSize(40, 1),
    codeRefs[0]().selection(DEFAULT, 1),
    codeRefs[0]().code(
      `<post-card
  title="Titre de l'article"
  date="2024-01-02"
  author="Grafikart"
  href="/article">
    Aperçu du contenu
</post-card>`,
      1,
    ),
  );

  codeRefs[1]().highlighter(new LezerHighlighter(HTMLParser));
  yield* all(
    titles[1]("post-card.html", 1),
    root.childAs<Rect>(1).width(width / 2, 1),
    codeRefs[0]().fontSize(40, 1),
    codeRefs[1]().code(
      `<article class="post-card">
  <h2 class="post-title">
    {{ post.title }}
  </h2>
  <div class="post-meta-wrapper">
    <div class="post-date">
      Posté le {{ post.createdAt|date('d F Y') }}
    </div>
    <div class="post-author">
      Par {{ post.author.name }}
    </div>
  </div>
  <p class="post-excerpt">
    {{ post.excerpt|u.truncate(120) }}
  </p>
  <a class="post-link" href="#">
    Voir l'article
  </a>
</article>`,
      1,
    ),
  );

  codeRefs[2]().highlighter(new LezerHighlighter(CSSParser));
  yield* all(
    titles[2]("post-card.css", 1),
    root.childAs<Rect>(0).width(width / 3, 1),
    root.childAs<Rect>(1).width(width / 3, 1),
    root.childAs<Rect>(2).width(width / 3, 1),
    codeRefs[2]().fontSize(30, 0.1),
    codeRefs[2]().code(
      `.post-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.post-meta-wrapper {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.post-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.post-author {
  color: #6b7280;
  font-style: italic;
}`,
      1,
    ),
  );

  yield* waitFor(1);
  yield* all(
    root.childAs<Rect>(0).opacity(0.3, 1),
    root.childAs<Rect>(0).width(width / 5, 1),
    root.childAs<Rect>(1).width((3 / 5) * width, 1),
    root.childAs<Rect>(2).opacity(0.3, 1),
    root.childAs<Rect>(2).width(width / 5, 1),
  );
  yield* waitFor(3);
});
