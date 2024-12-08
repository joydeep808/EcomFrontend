import { createCookieSessionStorage } from "@remix-run/node";

export const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    secure: process.env.NODE_ENV === "production",
    secrets: ["secret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});
export type Theme = "light" | "dark";
export function resolveTheme(theme?: string): Theme {
  if (theme === "dark" || theme === "light") return theme;
  return "dark";
}

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(
    request.headers.get("Cookie")
  );

  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return resolveTheme(themeValue);
    },
    setTheme: (theme: Theme) => {
      session.set("theme", theme);
    },
    commit: () => themeStorage.commitSession(session),
  };
}
