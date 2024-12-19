import { makeProject } from "@motion-canvas/core";

import lineHeightScene1 from "./scenes/font/font.js?scene";
import lineHeightScene2 from "./scenes/font/fontMetrics.js?scene";
import lineHeightScene3 from "./scenes/font/browserRender.js?scene";
import carouselScene from "./scenes/carousel/carousel.js?scene";

const lineHeightProject = [
  lineHeightScene1,
  lineHeightScene2,
  lineHeightScene3
]

export default makeProject({
  scenes: [carouselScene],
});
