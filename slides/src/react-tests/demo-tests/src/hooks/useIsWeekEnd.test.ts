import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useIsWeekEnd} from "./useIsWeekEnd.ts";

describe('useIsWeekEnd', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('should detect weekends', () => {
    const {result} = renderHook(() => useIsWeekEnd())
    expect(result.current).toBe(false)
    const date = new Date(2024, 10, 23, 13)
    vi.setSystemTime(date)
    const {result: resultWeekEnd} = renderHook(() => useIsWeekEnd())
    expect(resultWeekEnd.current).toBe(true)
  })

})
