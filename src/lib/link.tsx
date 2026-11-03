"use client"

import { createContext, useContext, useMemo } from "react"

/**
 * How the shell components link and navigate without depending on a router.
 *
 * The package renders from props alone (ADR-0027's boundary rule), so the
 * sidebar, the settings rail, the command menu and the org switcher never
 * import a router. The app wraps them once in a `LinkProvider` that says how
 * to render a link, where the user is, and how to navigate:
 *
 *   // TanStack Router
 *   <LinkProvider
 *     Link={({ href, ...props }) => <Link to={href} {...props} />}
 *     location={useRouterState({ select: (s) => s.location })}
 *     navigate={(href) => router.navigate({ to: href })}
 *   >
 *
 *   // Next.js
 *   <LinkProvider Link={NextLink} location={{ pathname: usePathname() }}
 *     navigate={router.push}>
 *
 * Without a provider, links are plain `<a href>` and nothing is "active".
 */

export type LinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: string
}

export type LinkComponent = React.ComponentType<LinkProps>

export type LinkLocation = {
  pathname: string
  /** The query string, with or without its leading `?`. */
  search?: string
}

type LinkContextValue = {
  Link: LinkComponent
  location: LinkLocation
  navigate: (href: string) => void
}

function PlainLink(props: LinkProps) {
  return <a {...props} />
}

const DEFAULT: LinkContextValue = {
  Link: PlainLink,
  location: { pathname: "" },
  navigate: (href) => window.location.assign(href),
}

const LinkContext = createContext<LinkContextValue>(DEFAULT)

function LinkProvider({
  Link = DEFAULT.Link,
  location = DEFAULT.location,
  navigate = DEFAULT.navigate,
  children,
}: Partial<LinkContextValue> & { children: React.ReactNode }) {
  const value = useMemo(
    () => ({ Link, location, navigate }),
    [Link, location, navigate]
  )
  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>
}

function useLinks(): LinkContextValue {
  return useContext(LinkContext)
}

/** `to` plus its search params, as one href. */
function hrefOf(to: string, search?: Record<string, string>): string {
  const query = new URLSearchParams(search).toString()
  return query ? `${to}?${query}` : to
}

/** True when `location` is `to` and carries every one of `search`'s params. */
function isAt(
  location: LinkLocation,
  to: string,
  search?: Record<string, string>
): boolean {
  if (location.pathname !== to) return false
  const current = new URLSearchParams(location.search ?? "")
  return Object.entries(search ?? {}).every(([k, v]) => current.get(k) === v)
}

export { LinkProvider, hrefOf, isAt, useLinks }
