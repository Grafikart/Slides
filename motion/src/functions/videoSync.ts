import { waitFor } from "@motion-canvas/core"

/**
 * Parses a timestamp string "HH:MM:SS:FF" into total seconds (frames ignored)
 */
function parseTimestamp(timestamp: string): number {
    const parts = timestamp.split(":")
    if (parts.length !== 4) {
        throw new Error(`Invalid timestamp format: ${timestamp}. Expected HH:MM:SS:FF`)
    }
    const [hours, minutes, seconds] = parts.map(Number)
    return hours * 3600 + minutes * 60 + seconds
}

export class VideoSync {
    private lastTime: number

    constructor(startTime: string) {
        this.lastTime = parseTimestamp(startTime)
    }

    *waitTill(timestamp: string, offset: number = 0) {
        const targetTime = parseTimestamp(timestamp)
        const duration = targetTime - this.lastTime - offset
        this.lastTime = targetTime
        if (duration > 0) {
            yield* waitFor(duration)
        }
    }
}
