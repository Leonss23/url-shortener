export class ApiError {
  code: number
  message: string

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  response() {
    return new Response(JSON.stringify({ error: this.message }), { status: this.code, headers: { 'Content-Type': 'application/json' } })
  }

  static internal() {
    return new ApiError(500, 'Internal Server Error')
  }
}
