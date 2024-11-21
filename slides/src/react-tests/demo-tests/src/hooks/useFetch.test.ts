import {describe, expect, it} from "vitest";
import {act, renderHook} from "@testing-library/react";
import {useFetch} from "./useFetch.ts";


export function fakeFetcher<T>(data: T) {
  return () => {
    return Promise.resolve({
      json: () => Promise.resolve(data),
    } as Response);
  };
}

describe('useFetch', () => {

  it('should work correctly', async () => {
    const data = {username: "hello"}
    const {result} = renderHook(() => useFetch("http://localhost:8080", fakeFetcher(data)))
    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    await act(async () => {})
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(data)
  })

})
