"use client";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

// export const metadata = {
//   title: 'Aware - Community Reporting Platform',
//   description: 'Report and track community issues',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <AnonAadhaarProvider _useTestAadhaar={true}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 bg-background">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </ThemeProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </AnonAadhaarProvider>
      </body>
    </html>
  );
}
