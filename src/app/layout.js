import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DotPattern } from "@/components/ui/dot-pattern";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Suspense } from "react";

const themeScript = `
  let isDark;
  try {
    isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  } catch (_) {}
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
`;

export const metadata = {
  title: "Cobble",
  description: "Data for US GOV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full bg-background text-foreground">
        <ThemeProvider>
          <Sidebar>
            <Suspense>
              {children}
            </Suspense>
          </Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}