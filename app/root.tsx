import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import styles from "./tailwind.css?url"
import "./tailwind.css";
import { useEffect, useState } from "react";
import { getThemeSession, Theme } from "./util/theme";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./util/Navbar";
import { Progress } from "./components/ui/progress";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },

];

export async function loader({ request }:LoaderFunctionArgs) {
  const themeSession = await getThemeSession(request);
  return json({ theme: themeSession.getTheme() });
}



export default function App() {
  const { theme: serverTheme } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState<Theme>(serverTheme || "light");

  useEffect(() => {
    // document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Persist theme preference
    fetch("/theme", { 
      method: "POST", 
      body: JSON.stringify({ theme: newTheme }) 
    });
  };

  return (
    <html lang="en" >
      <head>
        <Meta />
        <Links />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script> 
      </head>
      <body className={`min-h-screen bg-white dark:bg-black text-black dark:text-white ${theme}`}>
    <Navbar/>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Toaster />

        {/* <LiveReload /> */}
      </body>
    </html>
  );
}
