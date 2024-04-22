import { prisma } from "./prisma";

export const getPostgresProductDetails = async (
  slug: string,
  variant_id: string
) => {
  if (variant_id === undefined) {
    return await prisma.product_product.findFirst({
      where: {
        slug: slug,
        product_productvariant_product_product_default_variant_idToproduct_productvariant:
          {
            stock_stock: {
              some: {
                warehouse_warehousestock: {
                  some: {
                    quantity: {
                      gt: 0,
                    },
                  },
                },
              },
            },
          },
      },
    select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        product_productvariant_product_product_default_variant_idToproduct_productvariant:
            {
                select: {
                    id: true,
                    name: true,
                },
            },
    }
    });
  } else {
    return await prisma.product_product.findFirst({
      where: {
        slug: slug,
      },
      include: {
        product_productvariant_product_product_default_variant_idToproduct_productvariant:
          {
            where: {
              id: parseInt(variant_id),
            },
            include: {
              stock_stock: {},
            },
          },
      },
    });
  }
};
