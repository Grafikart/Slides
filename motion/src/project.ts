import {makeProject} from '@motion-canvas/core';

import scene2 from './scenes/bitwise/comparisons?scene';
import scene1 from './scenes/bitwise/operators?scene';

export default makeProject({
  scenes: [scene1, scene2],
});


const ADMIN = 1 << 0
const WRITER = 1 << 1
const PUBLISHER = 1 << 2

const user = {roles: 0}
user.roles = ADMIN | PUBLISHER
user.roles &= ~ADMIN

console.log(!!(user.roles & ADMIN))
