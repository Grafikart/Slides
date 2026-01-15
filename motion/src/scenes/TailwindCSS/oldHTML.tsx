import { Code, LezerHighlighter, lines, makeScene2D } from "@motion-canvas/2d";
import { all, createRef } from "@motion-canvas/core";
import { VideoSync } from "../../functions/videoSync";

import { parser as HTMLParser } from "@lezer/html";

const SepiaHighlighter = new LezerHighlighter(HTMLParser);

export default makeScene2D(function* (view) {
  view.fill("#2d2820");

  const sync = new VideoSync("00:01:31:14");
  const codeRef = createRef<Code>();

  view.add(
    <Code
      ref={codeRef}
      highlighter={SepiaHighlighter}
      fontSize={40}
      code={`
Bienvenue sur mon site

<table>
  <tr>
    <td>Sidebar</td>
    <td>Contenu</td>
  </tr>
</table>

🔥 Site optimisé pour Internet Explorer 6 🔥
`}
    />,
  );

  yield* sync.waitTill("00:01:34:15");

  yield* all(
    codeRef().code(
      `<center>
  <b>Bienvenue sur mon site</b>
</center>

<table bgcolor="#0000FF" border="0" cellpadding="0">
  <tr>
    <td colspan="2"><img src="/header.png"></td>
  </tr>
  <tr>
    <td>Sidebar</td>
    <td>Contenu</td>
  </tr>
  <tr>
    <td colspan="2"><img src="/footer.png"></td>
  </tr>
</table>

<marquee behavior="scroll" direction="left">
  🔥 Site optimisé pour Internet Explorer 6 🔥
</marquee>`,
      1,
    ),
  );

  yield* sync.waitTill("00:01:37:15", 1);

  yield* all(
    codeRef().code(
      `<center>
    <font face="Arial" size="6">
      <b>Bienvenue sur mon site</b>
    </font>
  </center>

  <table bgcolor="#0000FF" border="0" cellpadding="0">
    <tr>
      <td colspan="2"><img src="/header.png"></td>
    </tr>
    <tr>
      <td>
        <font color="white" size="12">Contenu</font>
      </td>
      <td>
        <font color="white" size="16">Contenu</font>
      </td>
    </tr>
    <tr>
      <td colspan="2"><img src="/footer.png"></td>
    </tr>
  </table>

  <marquee behavior="scroll" direction="left">
    <font color="red">🔥 Site optimisé pour Internet Explorer 6 🔥</font>
  </marquee>`,
      1,
    ),
    codeRef().selection(
      [lines(1), lines(3), lines(12), lines(15), lines(24)],
      1,
    ),
    codeRef().fontSize(35, 1),
  );

  yield* sync.waitTill("00:01:42:23", 1);
});
