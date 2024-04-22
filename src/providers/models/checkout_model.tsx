export interface CheckoutModel {
  token?: string | null;
  lines?: Line[] | null;
  view_lines?: any;
  discount_data?: DiscountData | null;
  user_email?: string | null;
  can_upgrade_to_pro?: boolean | null;
  zen_club_plans?: ZenClubPlan[] | null;
  plan?: number | null;
  is_new_buyer?: boolean | null;
  private_metadata?: any | null;
  metadata?: any | null;
  created?: string | null;
  last_change?: string | null;
  plan_price_with_gst_currency?: string | null;
  plan_price_with_gst?: any | null;
  plan_name?: any | null;
  user_name?: string | null;
  user_mobile?: string | null;
  user_mobile_country_code?: string | null;
  billing_address?: AddressModel | null;
  shipping_address?: AddressModel | null;
  discount_currency?: string | null;
  discount?: any | null;
  coupon_code?: any | null;
  payment_mode?: any | null;
  user?: number | null;
  company?: number | null;
  site?: any | null;
  reseller?: number | null;
  coupon?: any | null;
  can_make_payment?: boolean | null;
  is_cod_accepted?: boolean | null;
  order_success?: orderSuccess | null;
}

export interface ZenClubPlan {
  id: number;
  name: string;
  price: string;
}

export interface Line {
  id?: number | null;
  product_slug?: string | null;
  product_data?: ProductData | null;
  product_variant_data?: ProductVariantData | null;
  stock_data?: StockData | null;
  is_price_changed?: boolean | null;
  total_price?: number | null;
  is_deliverable?: boolean | null;
  shipping_charge?: number | null;
  is_hyper_local_warehouse?: boolean | null;
  discount_amount?: string | null;
  is_cod_accepted?: boolean | null;
  reseller_receive_commission?: any | null;
  buyer_can_receive_refund?: any | null;
  warehouse?: Warehouse | null;
  attributes?: any[] | null;
  created?: string | null;
  modified?: string | null;
  created_by?: any | null;
  modified_by?: any | null;
  estimate_date_of_delivery?: string | null;
  shipping_pin?: number | null;
  stock_price_currency?: string | null;
  stock_price?: string | null;
  quantity?: number | null;
  custom_images?: any | null;
  custom_text?: any | null;
  checkout?: string | null;
  variant?: number | null;
  stock?: number | null;
  warehouse_stock?: number | null;
}

export interface ProductData {
  id: number;
  created: string;
  modified: string;
  created_by: string;
  modified_by: any;
  private_metadata: any;
  metadata: any;
  publication_date: any;
  is_published: boolean;
  seo_title: any;
  seo_description: any;
  state: string;
  payment_modes: string[];
  name: string;
  slug: string;
  description: any;
  images: Images;
  available_for_purchase: any;
  visible_in_listings: boolean;
  trend: number;
  auto_select: boolean;
  commission_percentage: any;
  commission_currency: string;
  commission: any;
  barcode: any;
  model_number: string;
  home_page_order: any;
  short_link: any;
  rating: number;
  is_customizable: boolean;
  customizable_title: any;
  thumbnail_created: boolean;
  product_type: number;
  category: number;
  default_variant: number;
  celebrity: any;
}

export interface ProductVariantData {
  id: number;
  created: string;
  modified: string;
  created_by: string;
  modified_by: any;
  private_metadata: any;
  metadata: any;
  sort_order: any;
  name: string;
  description: Description;
  images: Images;
  images_state: string;
  max_price_currency: string;
  max_price: string;
  track_inventory: boolean;
  weight: any;
  length: any;
  height: any;
  width: any;
  slug: any;
  thumbnail_created: boolean;
  product: number;
}
export interface orderSuccess {
  commission_earned: number | undefined;
  plan: number | undefined | null;
}

export interface Description {
  long: string;
  specifications: Specification[];
}

export interface Specification {
  field: string;
  value: string;
}

export interface Images {
  paths: string[];
  preview: string;
  variant_preview: string;
}

export interface StockData {
  id: number;
  company_name: string;
  company_slug: string;
  created: string;
  modified: string;
  created_by: string;
  modified_by: string;
  approved: boolean;
  approved_at: string;
  rejected_at: any;
  sku: string;
  start_datetime: any;
  end_datetime: any;
  quantity: number;
  price_type: string;
  gst_percentage: string;
  seller_price_currency: string;
  seller_price: string;
  seller_price_gst_currency: string;
  seller_price_gst: string;
  seller_price_without_gst_currency: string;
  seller_price_without_gst: string;
  price_currency: string;
  price: string;
  gst_currency: string;
  gst: string;
  base_price_currency: string;
  base_price: string;
  commission_percentage: string;
  commission_gst_percentage: string;
  commission_gst_currency: string;
  commission_gst: string;
  commission_currency: string;
  commission: string;
  zen_commission_percentage: string;
  zen_commission_gst_currency: string;
  zen_commission_gst: string;
  zen_commission_currency: string;
  zen_commission: string;
  hsn_code: string;
  gst_difference_currency: string;
  gst_difference: string;
  company: number;
  product_variant: number;
}

export interface Warehouse {
  id: number;
  minimum_order_value: string;
  is_hyper_local_warehouse: boolean;
  seller_company_name: string;
}

export interface DiscountData {
  before_discount_amount: number;
  discount_amount: number;
  after_discount_amount: number;
  is_coupon_applied: boolean;
  total_quantity: number;
  zoozle_coupon_id: any;
  reseller_coupon_id: any;
  min_order_price: number;
  max_cap_price: number;
  minimum_order_value: number;
  shipping_charges: number;
  buyer_can_receive_refund: number;
  reseller_receive_commission: number;
  effective_price: number;
  maybe_buyer_can_receive_refund: number;
  free_trial_days: number;
  maybe_buyer_can_receive_discount: number;
}

export interface AddressListModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: AddressModel[];
}

export interface AddressModel {
  id: number;
  pin: string;
  city: string;
  name: string;
  type: string;
  state: string;
  mobile: string;
  district: any;
  locality: string;
  modified: string;
  place_id: any;
  is_default: boolean;
  building_name: string;
  city_place_id: string;
  state_place_id: string;
  building_number: any;
  mobile_country_code: string;
  email: string;
}

export interface PaymentModel {
  id: number;
  created: string;
  modified: string;
  created_by?: any;
  modified_by?: any;
  payment_mode: string;
  razorpay_status: string;
  razorpay_order_id: string;
  receipt: string;
  payment_capture: boolean;
  razorpay_payment_id?: any;
  razorpay_signature: string;
  razorpay_response: RazorpayResponse;
  total_paid_currency: string;
  total_paid?: any;
  payment_provider: string;
  cashfree_status: string;
  cashfree_payment_session_id?: any;
  cashfree_order_id?: any;
  cashfree_response: CashfreeResponse;
  checkout: string;
  orders: any[];
}
interface CashfreeResponse {}
interface RazorpayResponse {
  order_create: OrderCreate;
}
interface OrderCreate {
  id: string;
  notes: any[];
  amount: number;
  entity: string;
  status: string;
  receipt: string;
  attempts: number;
  currency: string;
  offer_id?: any;
  amount_due: number;
  created_at: number;
  amount_paid: number;
}
