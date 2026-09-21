import { useEffect, useState } from "react";

/** Lightweight hash router — no react-router dependency. */
export function getPath() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export function navigate(to) {
  const path = to.startsWith("/") ? to : `/${to}`;
  if (getPath() === path) return;
  window.location.hash = path;
}

export function Link({ to, className, children, ...rest }) {
  const href = `#${to.startsWith("/") ? to : `/${to}`}`;
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function usePath() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) {
      window.location.hash = "/";
    }
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return path;
}
