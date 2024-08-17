import { describe, test, expect } from "bun:test"
import { decode, encode } from "./base62"

describe('base62', () => {
  describe('encode', () => {
    test('0', () => {
      const input = 0
      const expected = "0"
      expect(encode(input)).toBe(expected)
    })

    test('1', () => {
      const input = 1
      const expected = "1"
      expect(encode(input)).toBe(expected)
    })

    test('62', () => {
      const input = 62
      const expected = "10"
      expect(encode(input)).toBe(expected)
    })

    test('64', () => {
      const input = 64
      const expected = "12"
      expect(encode(input)).toBe(expected)
    })

    test('3844', () => {
      const input = 3844
      const expected = "100"
      expect(encode(input)).toBe(expected)
    })
  })

  describe('decode', () => {
    test('"0"', () => {
      const input = "0"
      const expected = 0
      expect(decode(input)).toBe(expected)
    })

    test('"1"', () => {
      const input = "1"
      const expected = 1
      expect(decode(input)).toBe(expected)
    })

    test('"12"', () => {
      const input = "10"
      const expected = 62
      expect(decode(input)).toBe(expected)
    })

    test('"12"', () => {
      const input = "12"
      const expected = 64
      expect(decode(input)).toBe(expected)
    })

    test('"100"', () => {
      const input = "100"
      const expected = 3844
      expect(decode(input)).toBe(expected)
    })
  })
})

