export class FetchError extends Error {
  response: Response
  constructor({
    message,
    response,
  }: {
    message: string
    response: Response
  }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.response = response
  }
}

export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init)

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    return await response.json()
  }

  throw new FetchError({
    message: response.statusText,
    response,
  })
}
