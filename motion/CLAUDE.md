# Motion Canvas Animation Project

A TypeScript project using Motion Canvas v3.17.2 to create programmatic animated videos.

## Commands

- `bun run motion` - Start Vite dev server to preview animations in browser

## Documentation

- The documentation on how to use Motion Canvas is here https://motioncanvas.io/docs/

## Project Structure

- `src/project.ts` - Main entry point, imports and exports the active scene
- `src/scenes/` - Animation scenes (each folder contains an `index.ts` exporting `scenes`)
- `src/components/` - Reusable animation components (Card, Browser, HighlightedText, etc.)
- `src/functions/` - Helper utilities
- `src/colors.ts` - Tokyo Night color palette
- `output/` - Rendered video output

## Switching Scenes

Edit `src/project.ts` to import a different scene:
```ts
import {scenes} from "./scenes/YourScene";
```

## Creating a New Scene

1. Create a folder in `src/scenes/YourScene/`
2. Create `index.ts` that exports a `scenes` array:
```ts
import {makeScene2D} from "@motion-canvas/2d";

export const scenes = [
  makeScene2D(function* (view) {
    // Animation code using generators
  }),
];
```

## Motion Canvas Patterns

- Animations use generator functions (`function*`) with `yield*` for timing
- Use `yield* waitFor(seconds)` to pause
- Use `yield* node.property(value, duration)` to animate properties
- Components extend base classes like `Rect`, `Txt`, `Layout`
- Colors are defined in `src/colors.ts`

## Code Style

- Uses TypeScript with JSX for component trees
- Lezer parser configured for JSX/TS syntax highlighting in Code nodes
- Prefer composition with existing components from `src/components/`
