import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/components/ChatProvider";
import Chatbot from "@/components/Chatbot";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAC — Kolkata Athletic Community",
  description:
    "KAC brings together people of all ages and fitness levels to move, learn, grow and inspire one another.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <ChatProvider>
          {children}
          <Chatbot />
        </ChatProvider>
      </body>
    </html>
  );
}
