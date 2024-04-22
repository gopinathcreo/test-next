import { Images, Variant } from "./product_model";

export interface SellerCollection {
  name: string;
  slug: string;
  images: Images | null;
  image: string | null;
  variant?: Variant;
  selling_price: number | null;
  max_price: number | null;
  discount: number | null;
}
