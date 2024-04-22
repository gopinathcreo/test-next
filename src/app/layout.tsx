import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import HeaderBar from "../components/header";
import FooterSection from "../components/footer";
import { CartProvider } from "../providers/cart_context";
import { SiteDataProvider } from "../providers/site_data_context";
import { headers } from "next/headers";
import { fetchSiteData } from "@/src/providers/api_provider";
import { redirect } from 'next/navigation'
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'
import { GoogleTagManager } from '@next/third-parties/google'

const PostHogPageView = dynamic(() => import('./posthog_page_view'), {
  ssr: false,
})

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoozle",
  description:
    "India's first smart buyers club offering up to 18% savings on every purchase. From high-quality beauty essentials to home decor, shop everything without compromise. Join ZEN Club for smart shopping and smarter earning.",
  keywords:
    "online store, online business, ecommerce website, e business, ecommerce platforms, e commerce business, best ecommerce platform, search, attendance, invoice, payment, HRMS, payroll, listing, b2b, buy, sell, new customers, increase business, increase profits, grow business",
  openGraph: {
    title: "Zoozle",
    description:
      "India's first smart buyers club offering up to 18% savings on every purchase. From high-quality beauty essentials to home decor, shop everything without compromise. Join ZEN Club for smart shopping and smarter earning.",
    url: "https://zoozle.in/",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  let siteName: string = "",
    siteLogo: string = "",
    isMicroSite: boolean = false;
  let host = headersList.get("host") ?? "";
  if (
      host != "localhost:3000" &&
      host !=   "zoozle.dev" &&
      host !=   "zoozle.in" &&
      host !=   "next.zoozle.in"
  ) {
    let siteData = await fetchSiteData(host.trim());
    if (siteData.status) {
      if(siteData.data?.redirect_url){
        redirect(siteData.data?.redirect_url)
      }
      siteName = siteData.data!.reseller_data?.name;
      siteLogo = siteData.data!.reseller_data?.logo;
      isMicroSite = siteData.data!.reseller_data?.id != null;
    }
  }

  return (
    <html lang="en">
    {host == "zoozle.in" && <GoogleTagManager gtmId="GTM-WSL64ZXT" />}
    <PHProvider>
      <body className={jost.className}>
        <SiteDataProvider
          siteName={siteName ?? ""}
          isMicroSite={isMicroSite ?? false}
          siteLogo={siteLogo ?? ""}
        >
          <CartProvider>
            {host == "zoozle.in" && <PostHogPageView/>}
            <HeaderBar />
            <div className="container mx-auto overflow-y-auto bg-white">
              {children}
            </div>
            <FooterSection />
          </CartProvider>
        </SiteDataProvider>
      </body>
    </PHProvider>
    </html>
  );
}
