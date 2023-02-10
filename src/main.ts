import 'reveal.js/dist/reveal.css'
import './style.css'
import Reveal from "reveal.js";
import type {Options} from "reveal.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";


const initReveal = () => {
  let deck = new Reveal({
    plugins: [Highlight, Markdown, Notes],
  });
  const inIframe = document.referrer !== "";
  const transition = document.body.dataset.transition as Options["transition"] ?? "slide"
  deck.initialize({
    width: 1920,
    height: 1080,
    maxScale: 1,
    progress: inIframe,
    controls: inIframe,
    hash: true,
    // disableLayout: true,
    transition,
    display: "flex",
  });
}

if (document.querySelector('.reveal')) {
  initReveal()
}
