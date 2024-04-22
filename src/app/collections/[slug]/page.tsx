import { IncomingMessage } from "node:http";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/src/utils/firebase_utils";
import { Suspense } from "react";
import { getCollectionDetails } from "@/server/postgres/collection";
import { CollectionPage } from "./components/collection";
import Skeleton from "./components/skeleton";

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json())

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || []

//   return {
//     title: product.title,
//     openGraph: {
//       images: ['/some-specific-page-image.jpg', ...previousImages],
//     },
//   }
// }

// export const metadata: Metadata = {
//   title: 'Zoozle',
//   description: 'Now sell your products to millions of businesses anywhere in India and grow your profits',
//   keywords: 'online store, online business, ecommerce website, e business, ecommerce platforms, e commerce business, best ecommerce platform, search, attendance, invoice, payment, HRMS, payroll, listing, b2b, buy, sell, new customers, increase business, increase profits, grow business',
//   openGraph: {
//     title: 'Zoozle',
//     description: 'Now sell your products to millions of businesses anywhere in India and grow your profits',
//     url: 'https://zoozle.in/',
//     type: 'website',
//     images: [
//       {
//         url: 'https://zoozle.in/assets/zoozlelogoog.png',
//         width: 800,
//         height: 600,
//         alt: 'Zoozle',
//       }
//     ],
//   },
// }
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  let collection = await getCollectionDetails(slug);
  let description:any = collection?.description;
  return {
    title: description?.seo_title ?? `${collection?.name} at Zoozle` ?? "",
    description: description?.seo_description ?? "Now buy products from the best collections at Zoozle",
    keywords: description?.keywords ??
      "online store, online business, ecommerce website, e business, ecommerce platforms, e commerce business, best ecommerce platform, search, attendance, invoice, payment, HRMS, payroll, listing, b2b, buy, sell, new customers, increase business, increase profits, grow business",
    image: {
      url: "https://zoozle.in/assets/zoozlelogoog.png",
      width: 800,
      height: 600,
      alt: "Zoozle",
    },
    openGraph: {
      title: description?.seo_title ?? `${collection?.name} at Zoozle` ?? "",
      description: description?.seo_description ?? "Now buy products from the best collections at Zoozle",
      url: `https://zoozle.in/collections/${slug}`,
      type: "website",
      images: [
        {
          url: "https://zoozle.in/assets/zoozlelogoog.png",
          width: 800,
          height: 600,
          alt: "Zoozle",
        },
      ],
    },
  } as Metadata;
}

function Collections({ params }: { params: { slug: string } }) {
  return <CollectionPage params={params} />;
}

export default Collections;
