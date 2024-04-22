export interface ProductModel {
    id: number
    product_type_name: string
    attributes: Attribute[]
    variants: Variant[]
    private_metadata: Map<string, string>
    metadata: Map<string, string>
    seo_title: any
    seo_description: any
    state: string
    payment_modes: string[]
    name: string
    slug: string
    description: any
    images: Images
    available_for_purchase: any
    model_number: string
    home_page_order: any
    short_link: string
    rating: number
    is_customizable: boolean
    customizable_title: any
    thumbnail_created: boolean
    product_type: number
    category: number
    default_variant: number
    celebrity: any
    variant: Variant
    variant_id: number
    discount:number
    discount_rate:number
  }
  
  export interface Attribute {
    id: number
    attribute_name: string
    attribute_slug: string
    product_type_name: string
    attribute_input_type: string
    values: Value[]
    sort_order: any
    variant_selection: boolean
    attribute: number
    product_type: number
  }
  
  export interface Value {
    id: number
    variants: Variant[]
    sort_order: any
    name: string
    value: string
    slug: string
    attribute: number
    disable: boolean
  }
  
  export interface Stock {
    id: number
    company_name: string
    company_slug: string
    company_pin: string
    earn_coin: number
    is_terms_and_conditions_accepted: boolean
    available_stock: boolean
    warehouse_stocks: WarehouseStock[]
    reseller_commission: string
    approved: boolean
    approved_at: string
    rejected_at: any
    sku: string
    start_datetime: any
    end_datetime: any
    quantity: number
    price_type: string
    gst_percentage: string
    seller_price_currency: string
    seller_price: string
    seller_price_gst_currency: string
    seller_price_gst: string
    seller_price_without_gst_currency: string
    seller_price_without_gst: string
    price_currency: string
    price: string
    gst_currency: string
    gst: string
    base_price_currency: string
    base_price: string
    commission_percentage: string
    commission_gst_percentage: string
    commission_gst_currency: string
    commission_gst: string
    commission_currency: string
    zen_commission_percentage: string
    zen_commission_gst_currency: string
    zen_commission_gst: string
    zen_commission_currency: string
    zen_commission: string
    hsn_code: string
    gst_difference_currency: string
    gst_difference: string
    company: number
  }
  
  export interface WarehouseStock {
    id: number
    warehouse: number
    stock: number
    quantity: number
    sku: string
  }
  
  
  export interface Images {
    preview: string
    preview_500: string
    paths: string[]
    preview_200: string
    variant_preview: string
  }
  
  export interface Variant {
    id: number
    name: string
    description: Description
    images: Images 
    product: number
    max_price: string
    track_inventory: boolean
    weight: any
    length: any
    height: any
    width: any
    slug: any
    private_metadata: any
    metadata: Map<string, string>
    sort_order: any
    stocks: Stock[]
    stock_available: boolean
    stock: Stock
  }
  
  export interface Description {
    long: string
    short: string
    specifications: Specification[]
  }
  
  export interface Specification {
    field: string
    value: string
  }
  