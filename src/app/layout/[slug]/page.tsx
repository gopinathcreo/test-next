import DesignBlock from "./components/design_block";

export function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: "Zoozle",
    description: "Zoozle",
    keywords: "Zoozle",
    openGraph: {
      title: "Zoozle",
      description: "Zoozle",
      url: "https://zoozle.in/",
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
  };
}

async function Layout({ params }: { params: { slug: string } }) {
  let path =
    `${process.env.NEXT_SERVER_API_URL}/reseller/layout/?path=layout/` +
    encodeURIComponent(params.slug);
  let data: any = await fetch(path, {
    cache: "no-cache",
  });
  data = await data.json();

  return DesignBlock(data);
}

export default Layout;
