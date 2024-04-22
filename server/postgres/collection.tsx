import { prisma } from "./prisma";

export const getCollectionDetails = async (slug: string) => {
  return await prisma.collection_collection.findFirst({
    where: {
      slug: slug,
    },
  });
};
