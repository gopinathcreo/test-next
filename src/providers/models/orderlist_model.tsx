export interface OrderListModel {
  count: number
  next: string
  previous: any
  results: Orders[]
}

export interface Orders {
  id: string
  lines: Line[]
  tags: any[]
  from_micro_site: boolean
  private_metadata: PrivateMetadata
//   metadata: Metadata2
  order_number: string
  from_shopify: boolean
  origin: string
  created: string
  updated_at: string
  plan_price_with_gst_currency: string
  plan_price_with_gst?: string
  plan_name?: string
  status: string
  payment_status: string
  is_new_buyer: boolean
  coupon_code: any
  billing_address: BillingAddress
  shipping_address: ShippingAddress
  user_name: string
  user_email: string
  user_mobile: string
  checkout_token: string
  total_before_tax_currency: string
  total_before_tax: string
  tax_currency: string
  tax: string
  total_price_currency: string
  total_price: string
  total_discount_currency: string
  total_discount: any
  total_paid_currency: string
  total_paid: any
  customer_note: CustomerNote
  weight: any
  short_link: string
//   note: Note2
  payment_mode: any
  cod_otp: string
  razorpay_status: any
  receipt: string
  payment_capture: boolean
  razorpay_order_id: any
  razorpay_payment_id: any
  razorpay_signature: string
  razorpay_response: RazorpayResponse
  should_refresh_prices: boolean
  priority: number
  placed_on: string
  confirmed_on: any
  shipment_placed_on: any
  plan?: number
  user: number
  agent: any
  company: number
  coupon: any
  zoozle_coupon: any
  site: any
  reseller: number
  checkout: string
}

export interface Line {
  id: number
  product_variant_images: ProductVariantImages
  shipping: any[]
  invoice: Invoice[]
  tracking: Tracking
  product_sku: string
  product_slug: string
  metadata: Metadata
  status: string
  delivered_on: any
  line_number: string
  stock_gst_currency: string
  stock_gst: string
  zoozle_commission_percentage: string
  zoozle_commission_gst_percentage: string
  zoozle_commission_gst_currency: string
  zoozle_commission_gst: string
  zoozle_commission_currency: string
  zoozle_commission: string
  product_name: string
  variant_name: string
  product_variant_id: string
  is_shipping_required: boolean
  base_price_currency: string
  base_price: string
  total_commission_currency: string
  total_commission_gst_currency: string
  total_commission_gst: string
  reseller_is_applied_2x: boolean
  reseller_commission_percentage: string
  seller_to_zen_commission_percentage: string
  reseller_commission_currency: string
  reseller_commission: string
  is_commission_approved: boolean
  reseller_commission_gst_currency: string
  reseller_commission_gst: string
  reseller_commission_tds_currency: string
  reseller_commission_tds: string
  send_amount_to_reseller: boolean
  amount_sent_to_reseller: boolean
  celebrity_commission_currency: string
  celebrity_commission: string
  celebrity_commission_gst_currency: string
  celebrity_commission_gst: string
  celebrity_commission_tds_currency: string
  celebrity_commission_tds: string
  send_amount_to_celebrity: boolean
  amount_sent_to_celebrity: boolean
  unit_price_currency: string
  unit_price: string
  quantity: number
  gst_percentage: string
  gst_currency: string
  gst: string
  total_price_before_gst_currency: string
  total_price_before_gst: string
  total_price_currency: string
  total_price: string
  total_discount_currency: string
  total_discount: string
  unit_price_discount_currency: string
  unit_price_discount: any
  total_price_after_discount_currency: string
  total_price_after_discount: string
  tds_percentage: number
  tds_currency: string
  tds: string
  tcs_percentage: number
  tcs_currency: string
  tcs: string
  delivery_fee_currency: string
  delivery_fee: string
  payment_gateway_fee_currency: string
  payment_gateway_fee: string
  payment_gateway_fee_gst_currency: string
  payment_gateway_fee_gst: string
  commission_retained_currency: string
  commission_retained: any
  commission_retained_gst_percentage: any
  commission_retained_gst_currency: string
  commission_retained_gst: any
  tds_of_commission_currency: string
  tds_of_commission: any
  net_commission_retained_currency: string
  net_commission_retained: any
  tds_by_seller_currency: string
  tds_by_seller: string
  total_settlement_to_seller_currency: string
  total_settlement_to_seller: string
  quantity_reduced: boolean
  send_amount_to_seller: boolean
  amount_sent_to_seller: boolean
  total_refund_to_buyer_currency: string
  total_refund_to_buyer: any
  sale_id: any
  note: Note
  sort_order: number
  custom_images: any
  custom_text: any
  buyer_invoice_generated: boolean
  seller_invoice_generated: boolean
  reseller_invoice_generated: boolean
  gst_difference_currency: string
  gst_difference: string
  seller_to_zoozle_amount_currency: string
  seller_to_zoozle_amount: string
  is_seller_payment_received: boolean
  order: string
  stock: number
  warehouse_stock: number
  celebrity: any
}

export interface ProductVariantImages {
  paths: string[]
  preview: string
  variant_preview: string
  preview_200?: string
  preview_500?: string
}

export interface Invoice {
  path?: string
  type: string
  id: number
  created: string
}

export interface Tracking {}

export interface Metadata {}

export interface Note {
  status_tracker: StatusTracker
}

export interface StatusTracker {
  PLACED: string
  CANCELED: string
  RETURNED: string
  DELIVERED: string
  FULFILLED: string
  PAYMENT_FAILED: string
  PRODUCT_PICKED: string
  TRACKING_UPDATED: string
  PAYMENT_SUCCESSFUL: string
}

export interface PrivateMetadata {
  can_send_wa: boolean
  reseller_id: number
  reseller_name: any
  reseller_site: string
  placed_msg_sent: boolean
  delivery_challan_created: boolean
}

// export interface Metadata2 {}

export interface BillingAddress {
  id: number
  pin: string
  city: string
  name: string
  type: string
  state: string
  mobile: string
  created: string
  customer: number
  district: any
  latitude: any
  locality: string
  modified: string
  place_id: any
  longitude: any
  state_ref: any
  created_by: string
  is_default: boolean
  strAddress: string
  modified_by: string
  building_name: string
  city_place_id: string
  state_place_id: string
  building_number: any
  mobile_country_code: string
  nature_of_business_at_address: any
}

export interface ShippingAddress {
  id: number
  pin: string
  city: string
  name: string
  type: string
  state: string
  mobile: string
  created: string
  customer: number
  district: any
  latitude: any
  locality: string
  modified: string
  place_id: any
  longitude: any
  state_ref: any
  created_by: string
  is_default: boolean
  strAddress: string
  modified_by: string
  building_name: string
  city_place_id: string
  state_place_id: string
  building_number: any
  mobile_country_code: string
  nature_of_business_at_address: any
}

export interface CustomerNote {}

// export interface Note2 {
//   status_tracker: StatusTracker2
// }

// export interface StatusTracker2 {
//   PLACED: string
//   CANCELED: string
//   RETURNED: string
//   DELIVERED: string
//   FULFILLED: string
//   PAYMENT_FAILED: string
//   PRODUCT_PICKED: string
//   TRACKING_UPDATED: string
//   PAYMENT_SUCCESSFUL: string
// }

export interface RazorpayResponse {}