import "./globals.css";
import Sidebar from "@/components/ui/sidebar";

export const metadata = {
  title: "Cobble",
  description: "Data for US GOV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        {/* The entire sidebar + top bar + empty main area */}
        <Sidebar />
        {/* 
          If you DO want to render page-level content from Next.js 
          inside that main area, you’d have to change how Sidebar is structured,
          or place {children} somewhere in the main. 
          But for now, we keep it empty as requested.
        */}
      </body>
    </html>
  );
}