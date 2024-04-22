import DesignBlock from "@/src/app/layout/[slug]/components/design_block";

export default async function Home() {
  let path = `${process.env.NEXT_SERVER_API_URL}/reseller/layout/`;
  let data: any = await fetch(path, {
    cache: "no-cache",
  });
  data = await data.json();

  return DesignBlock(data);
}
