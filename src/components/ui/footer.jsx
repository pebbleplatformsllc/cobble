import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className={`mt-auto px-4 sm:px-6 lg:px-8 ${isHomePage ? 'py-16' : 'py-16'}`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Cobble Data LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}