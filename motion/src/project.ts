import { makeProject } from "@motion-canvas/core";

import scene1 from "./scenes/font/font.js?scene";
import scene2 from "./scenes/font/fontMetrics.js?scene";
import scene3 from "./scenes/font/browserRender.js?scene";

export default makeProject({
  scenes: [scene1, scene2, scene3],
});
