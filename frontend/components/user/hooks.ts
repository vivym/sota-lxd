import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { FetchError } from '@/libs/swrHelpers'

export interface UserRespone {
  username: string
  email: string
}

export interface User extends UserRespone {
  isLoggedIn: boolean
}

export async function fetcher(
  input: RequestInfo,
  init?: RequestInit,
): Promise<User> {
  const response = await fetch(input, init)

  console.log("response.status", response.status)

  if (response.status === 401) {
    return {
      isLoggedIn: false,
      username: '',
      email: '',
    } as User
  }

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json()
    data.isLoggedIn = true
    return data
  }

  throw new FetchError({
    message: response.statusText,
    response,
  })
}


export function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/v1/users/me', fetcher)

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}
