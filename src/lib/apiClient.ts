export type ApiOk<T> = { ok: true; data: T }
export type ApiErr = { ok: false; error: string; status?: number }
export type ApiResult<T> = ApiOk<T> | ApiErr

export async function apiJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(input, init)

    let json: any = null
    try {
      json = await res.json()
    } catch {
      json = null
    }

    if (!res.ok) {
      const message =
        (json && (json.message || json.error)) ||
        `Request failed (${res.status})`
      return { ok: false, error: String(message), status: res.status }
    }

    return { ok: true, data: json as T }
  } catch {
    return { ok: false, error: "Network error. Please check your connection." }
  }
}

