import type { Metadata } from "next";
import "./globals.css";
import { TasksProvider } from "@/context/TaskProvider";
import Header from "@/components/Header"
import RocketIcon from "@/components/icons/RocketIcon";


export const metadata: Metadata = {
  title: "To Do App ",
  description: "Take Home Assignment for Nooro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TasksProvider>
          <div className="relative min-h-screen bg-black">
  <div className="absolute left-0 w-full" 
       style={{ top: 'calc(10rem + 0.5rem)' , bottom: 0, backgroundColor: '#1A1A1A' }}>
  </div>

  <div className="relative max-w-3xl mx-auto p-4 flex flex-col items-center">
    {/* Heading */}
    <h1 className="text-4xl font-black flex items-center justify-center gap-2 mt-10">
      <span className="inline-block w-6 h-6"><RocketIcon /></span>
      <span className="text-[#4ea8de]">Todo</span>
      <span className="text-[#5e60ce]"> App</span>
    </h1>

    <Header />
       {children}
   <div className="mt-10 w-full flex justify-center">
</div>
  </div>
</div>
</TasksProvider>
      </body>
    </html>
  );
}
