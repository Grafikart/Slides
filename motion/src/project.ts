import { makeProject } from "@motion-canvas/core";
import {Code, LezerHighlighter} from '@motion-canvas/2d';
import {parser} from '@lezer/javascript';
import {react19Scenes} from "./scenes/react19";

import './global.css';

Code.defaultHighlighter = new LezerHighlighter(
  parser.configure({
    // Provide a space-separated list of dialects to enable:
    dialect: 'jsx ts',
  }),
);

export default makeProject({
  scenes: react19Scenes,
});
