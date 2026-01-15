import {
  Code,
  LezerHighlighter,
  lines,
  makeScene2D,
  Rect,
} from "@motion-canvas/2d";
import { all, createRef, DEFAULT, waitFor } from "@motion-canvas/core";
import { VideoSync } from "../../functions/videoSync";

import { parser as HTMLParser } from "@lezer/html";

Code.defaultHighlighter = new LezerHighlighter(HTMLParser);

export default makeScene2D(function* (view) {
  const previewColor = "#212131";
  view.fill(previewColor);

  const width = view.width();
  const height = view.height();
  const sync = new VideoSync("00:02:57:17");
  const htmlRef = createRef<Code>();

  view.add(
    <Rect width={width} height={height} gap={64} padding={10}>
      {/* Left side - Code */}

      <Code
        ref={htmlRef}
        fontSize={42}
        code={`<article>
  <h2>Titre de l'article</h2>
  <div>Posté le 3 mars 2024</div>
  <div>Par Grafikart</div>
  <p>Aperçu du contenu</p>
  <a href="/article">Voir l'article</a>
</article>`}
      />
    </Rect>,
  );

  yield* sync.waitTill("00:03:03:08");

  yield* all(
    htmlRef().code(
      `<article>
  <h2 class="post-title">Titre de l'article</h2>
  <div>Posté le 3 mars 2024</div>
  <div>Par Grafikart</div>
  <p>Aperçu du contenu</p>
  <a href="/article">Voir l'article</a>
</article>`,
      1,
    ),
    htmlRef().selection(lines(1), 1),
  );

  yield* sync.waitTill("00:03:08:18", 1);

  yield* all(
    htmlRef().code(
      `<article class="post-card">
  <h2 class="post-title">Titre de l'article</h2>
  <div class="post-date">Posté le 3 mars 2024</div>
  <div class="post-author">Par Grafikart</div>
  <p class="post-excerpt">Aperçu du contenu</p>
  <a class="post-link" href="/article">Voir l'article</a>
</article>`,
      1,
    ),
    htmlRef().selection(lines(2), 1),
  );

  yield* sync.waitTill("00:03:14:05", 1);

  yield* all(
    htmlRef().code(
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
    htmlRef().selection(lines(2, 5), 1),
  );

  yield* sync.waitTill("00:03:22:05", 1);

  yield* all(
    htmlRef().code(
      `<style>
  .formation-progress__bar {}
  .course-top-sidebar {}
  .mdeditor__toolbar {}
  .page-header-error {}
  .blog-single__header {}
  .forum-message__actions {}
  .tree-modal_sprite {}
  .home-cursus__push {}
  .notification-badge {}
  .cursus-page__chapter {}
  .wave-header__image {}
  .badge-modal_sprite-blue {}
  .chapter-split {}
  .formation-arguments_title {}
  .mdeditor--fullscreen {}
</style>`,
      1,
    ),
    htmlRef().selection(DEFAULT, 1),
  );

  yield* waitFor(3);
});
