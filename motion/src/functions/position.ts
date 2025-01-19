import {Origin} from '@motion-canvas/core'
import type {Shape} from "@motion-canvas/2d";

export function absolutePosition (item: Shape) {
  const delta = item.getOriginDelta(Origin.TopLeft)
  return {
    x: item.x() + delta.x,
    y: item.y() + delta.y,
    width: item.width(),
    height: item.height(),
  }
}
