import type { Metadata } from "next";
import Menu from "./Menu";


export const metadata: Metadata = {
  title: "Feed",
  description: "Main page, where you see the feed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <nav className="flex justify-between items-center h-16 w-full">
        <Menu />
      </nav>
      <div className="flex justify-center items-center w-full h-full bg-neutral-700">
        {children}
      </div>
    </div>
  );
}
