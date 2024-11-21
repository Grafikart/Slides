import { describe, it, expect } from "vitest";
import {toCamelCase} from "./strings.ts";

describe("toCamelCase", () => {
  it.each([
    // [input, expectation]
    ["hello-world", "helloWorld"],
    ["hello_world", "helloWorld"],
    ["hello world", "helloWorld"],
    ["hello-world_example test", "helloWorldExampleTest"],
    ["", ""],
    ["alreadyCamelCase", "alreadyCamelCase"],
    ["already_CamelCase", "alreadyCamelCase"],
    ["word", "word"],
    ["-hello-world-", "helloWorld"],
  ])('should convert "%s" to "%s"', (input, expected) => {
    const got = toCamelCase(input)
    expect(got, `should convert "${input}" to "${expected}", got "${got}"`).toBe(expected);
  });
});
