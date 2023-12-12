import {all, sequence} from "@motion-canvas/core/lib/flow";
import {type Layout} from "@motion-canvas/2d";

export function* slideUpAndClear(node: Layout, duration = 1) {
    yield* all(
        node.opacity(0, duration),
        node.height(0, duration)
    )

    node.removeChildren()
}

export function* slideDown(node: Layout, duration = 1) {
    yield* all(
        node.opacity(1, duration),
        node.height('100%', duration)
    )
}

export function* fadeInFromTop(node: Layout, duration = 1) {
    for (const child of node.children()) {
        child.opacity(0);
        child.y(-100);
    }
    yield * sequence(duration * 0.3, ...node.children().map(child => {
        return all(
            child.opacity(1, duration),
            child.y(0, duration)
        )
    }))
}

export function* fadeOutToBottom(node: Layout, duration = 1, delay = 0.3) {
    yield * sequence(delay, ...node.children().reverse().map(child => {
        return all(
            child.opacity(0, duration),
            child.y(100, duration)
        )
    }))
}
