import { ActionFunction } from "@remix-run/node";
import { getThemeSession, themeStorage } from "~/util/theme";

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data = await request.json();

  themeSession.setTheme(data.theme);
  return new Response(null, {
    headers: { "Set-Cookie": await themeStorage.commitSession(themeSession) },
  });
};
