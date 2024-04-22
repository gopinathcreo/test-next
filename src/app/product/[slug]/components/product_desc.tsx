import { ProductModel } from "@/src/providers/models/product_model";

export function ProductDesc({ product }: { product: ProductModel }) {
  return (
      <div className="py-5">
        <h2 className="font-medium mb-4 text-[#1a1c1e]">PRODUCT DESCRIPTION</h2>
        <div dangerouslySetInnerHTML={{__html: product.variant?.description?.long}}/>
        <h3 className="font-medium mb-2 text-[#1a1c1e] mt-6">Product Specifications</h3>
          {product.variant?.description?.specifications?.map((spec, index) => (
                <p key={index} className="mb-1 text-[#1a1c1e]">
                    {spec.field}: <span className="text-sm">{spec.value}</span>
                </p>

          ))}
      </div>
  );
}