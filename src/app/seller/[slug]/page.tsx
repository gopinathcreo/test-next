import type { Metadata, ResolvingMetadata } from "next";
import { getCollectionDetails } from "@/server/postgres/collection";
import { CollectionPage } from "./components/collection";
import { fetchCompanyDetails } from "@/src/providers/api_provider";


export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;
    console.log('paramsslug',params.slug)
    let collection = await getCollectionDetails(slug);
    let result = await fetchCompanyDetails(slug,true);
    console.log('fetch result',result)
    return {
        title: `${result.data?.name} at Zoozle` ?? "",
        description: "Now buy products from the best collections at Zoozle",
        keywords:
            "online store, online business, ecommerce website, e business, ecommerce platforms, e commerce business, best ecommerce platform, search, attendance, invoice, payment, HRMS, payroll, listing, b2b, buy, sell, new customers, increase business, increase profits, grow business",
        image: {
            url: "https://zoozle.in/assets/zoozlelogoog.png",
            width: 800,
            height: 600,
            alt: "Zoozle",
        },
        openGraph: {
            title: `${collection?.name} at Zoozle` ?? "",
            description: "Now buy products from the best collections at Zoozle",
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
