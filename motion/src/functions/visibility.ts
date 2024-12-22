import {type Node, type Rect} from '@motion-canvas/2d'
import {all} from "@motion-canvas/core";

export function hide (node: Rect, d: number) {
    node.clip(true)
    return all(
      node.height(0, d),
      node.opacity(0, d),
      node.padding(0, d),
    )
}

export function showRight (node: Rect, d: number) {
    const left = node.position.x()
    node.position([left + 100, node.position.y()])
    node.opacity(0)
    return all(
      node.position([left, node.position.y()], d),
      node.opacity(1, d),
    )
}

export function hideLeft (node: Rect, d: number) {
    return all(
      node.position([node.position.x() - 100, node.position.y()], d),
      node.opacity(0, d),
    )
}



export function showBottom (node: Rect, d: number) {
    const y = node.position.y()
    node.position([node.position.x(), y + 100])
    node.opacity(0)
    return all(
      node.position([node.position.x(), y], d),
      node.opacity(1, d),
    )
}

export function hideBottom (node: Rect, d: number) {
    return all(
      node.position([node.position.x(), node.position.y() + 100], d),
      node.opacity(0, d),
    )
}

