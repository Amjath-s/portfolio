import { useEffect, useState } from "react";

/** Path-based SPA router (no hash). */
export function getPath() {
  const path = window.location.pathname || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function navigate(to) {
  const path = to.startsWith("/") ? to : `/${to}`;
  if (getPath() === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function Link({ to, className, children, ...rest }) {
  const href = to.startsWith("/") ? to : `/${to}`;
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.altKey ||
          e.ctrlKey ||
          e.shiftKey
        ) {
          return;
        }
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Migrate old `/#/about` style URLs to `/about`. */
function migrateHashRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;
  const path = hash.startsWith("/") ? hash : `/${hash}`;
  window.history.replaceState({}, "", path);
}

export function usePath() {
  const [path, setPath] = useState(() => {
    migrateHashRoute();
    return getPath();
  });

  useEffect(() => {
    migrateHashRoute();
    setPath(getPath());

    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return path;
}
