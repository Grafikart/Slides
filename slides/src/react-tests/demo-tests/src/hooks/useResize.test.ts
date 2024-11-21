import {describe, expect, it, vi} from "vitest";
import {act, renderHook} from "@testing-library/react";
import {useResize} from "./useResize.ts";

describe('useResize', () => {
  it('should call the cb on resize', async () => {
    const spy = vi.fn()
    renderHook(() => useResize(spy))
    await act(async () => {
    })
    const event = new CustomEvent('resize')
    Object.defineProperty(window, "innerHeight", {value: 900})
    Object.defineProperty(window, "innerWidth", {value: 1200})
    await act(async () => {
      window.dispatchEvent(event)
    })
    expect(spy).toHaveBeenCalledWith({
      width: 1200,
      height: 900
    })
  })
})
