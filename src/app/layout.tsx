import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { CartProvider } from "@/contexts/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mealicious - Premium Flavoured Cashews & Dry Fruits",
  description: "Discover MEALICIOUS premium flavoured cashews, mixed dry fruits, and innovative snacks. Quality ingredients, exceptional taste - India's trusted snack brand.",
  keywords: ["Mealicious", "cashews", "dry fruits", "snacks", "premium", "flavoured nuts", "healthy", "Salem"],
  authors: [{ name: "Mealicious Ventures Private Limited" }],
  openGraph: {
    title: "Mealicious - Premium Flavoured Cashews & Dry Fruits",
    description: "Premium quality flavoured cashews, mixed dry fruits, and innovative snacks from Salem. Quality you can trust, taste you will love.",
    url: "https://mealicious.in",
    siteName: "Mealicious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mealicious - Premium Flavoured Cashews & Dry Fruits",
    description: "Premium quality flavoured cashews, mixed dry fruits, and innovative snacks from Salem.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <Toaster />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
