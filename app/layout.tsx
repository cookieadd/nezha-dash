// @auto-i18n-check. Please do not delete the line.
import getEnv from "@/lib/env-entry";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { PublicEnvScript } from "next-runtime-env";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const customTitle = getEnv("NEXT_PUBLIC_CustomTitle");
const customDescription = getEnv("NEXT_PUBLIC_CustomDescription");

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: customTitle || "NezhaDash",
  description: customDescription || "A dashboard for nezha",
  appleWebApp: {
    capable: true,
    title: customTitle || "NezhaDash",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {!process.env.VERCEL && !process.env.CF_PAGES && <PublicEnvScript />}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
