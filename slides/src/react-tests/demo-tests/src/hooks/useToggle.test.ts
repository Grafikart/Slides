import {describe, expect, it} from "vitest";
import {useToggle} from "./useToggle.ts";
import {act, renderHook} from "@testing-library/react";

describe('useToggle', () => {

  it('should toggle value', () => {
    const {result} = renderHook(() => useToggle())
    const initialToggler = result.current[1]
    expect(result.current[0]).toBe(false)
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(false)
    expect(result.current[1]).toBe(initialToggler)
  })

})
