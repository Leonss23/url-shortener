const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

export function encode(i: number): string {
  if (i === 0) return "0"

  let encoded = ""
  const charsetLen = charset.length

  while (i > 0) {
    const char = charset[i % charsetLen]
    encoded = char + encoded

    i = Math.floor(i / charsetLen)
  }

  return encoded
}

export function decode(s: string): number {
  let decoded = 0;

  for (let i = 0; i < s.length; i += 1) {
    const char = s[i]
    const value = charset.indexOf(char)
    if (value < 0) return -1
    decoded = decoded * 62 + value
  }

  return decoded
}

