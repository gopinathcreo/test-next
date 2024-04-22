import { ProductModel } from "@/src/providers/models/product_model";
import { fetchProductDetails } from "@/src/providers/api_provider";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getImageUrl } from "@/src/utils/firebase_utils";
import { getProductDetails } from "@/server/typesense_provider";
import ProductPageView from "@/src/app/product/[slug]/components/product_page";
import Skeleton from "./components/skeleton";

const { htmlToText } = require("html-to-text");

export async function generateMetadata(
    {
        params,
        searchParams,
    }: { params: { slug: string }; searchParams: { v: any } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;
    let product = await getProductDetails(slug);
    let variant_id = searchParams.v;
    let variant =
        product?.variants.find((v: any) => v.id === variant_id) ??
        product?.variants[0];
    let desc = htmlToText(variant?.description ?? "", {
        wordwrap: 130,
    });

    return {
        title: variant?.name ?? "",
        description: desc ?? "",
        image: {
            url: getImageUrl(variant?.image ?? ""),
            alt: variant?.name ?? "",
        },
        openGraph: {
            title: variant?.name ?? "",
            description: desc ?? "",
            url: `https://zoozle.in/product/${slug}`,
            type: "website",
            images: [
                {
                    url: getImageUrl(variant?.image ?? ""),
                    alt: variant?.name ?? "",
                },
            ],
        },
    } as Metadata;
}


function Product({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { v: any };
}) {
    return (
        <Suspense fallback={<div className="text-black"><Skeleton /></div>}>
            <ProductPage params={params} searchParams={searchParams} />
        </Suspense>
    );
}

async function ProductPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { v: any };
}) {
    // Render the product details using the fetched data
    let product: ProductModel | null | undefined;
    let variant_id: string | null = searchParams.v;
    let result = await fetchProductDetails(params.slug, variant_id);
    product = result?.data;
    if (product === undefined || product === null) {
        return <div>Loading...</div>;
    }

    return (
        <ProductPageView product={product} />
    );
}

export default Product;
