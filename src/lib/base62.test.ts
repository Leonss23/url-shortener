import { describe, test, expect } from "bun:test"
import { decode, encode } from "./base62"

describe('base62', () => {
  describe('encode', () => {
    [
      { input: 0, expected: '0' },
      { input: 1, expected: '1' },
      { input: 62, expected: '10' },
      { input: 64, expected: '12' },
      { input: 3844, expected: '100' },
      { input: -1, expected: "" },
      { input: -64, expected: "" },
      { input: -3844, expected: "" },
    ].map(({ input, expected }) => {
      test(String(input), () => {
        expect(encode(input)).toBe(expected)
      })
    })
  })

  describe('decode', () => {
    [
      { input: "0", expected: 0 },
      { input: "1", expected: 1 },
      { input: "10", expected: 62 },
      { input: "12", expected: 64 },
      { input: "100", expected: 3844 },
      { input: "-=", expected: -1 },
      { input: "=^&", expected: -1 },
      { input: "}[", expected: -1 },
    ].map(({ input, expected }) => {
      test(`"${input}"`, () => {
        expect(decode(input)).toBe(expected)
      })
    })
  })
})

