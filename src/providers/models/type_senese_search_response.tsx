interface TypesenseSearchResponse {
    facet_counts: FacetCount[];
    found: number;
    hits: Hit[];
    out_of: number;
    page: number;
    request_params: RequestParams;
    search_cutoff: boolean;
    search_time_ms: number;
  }
  
  interface FacetCount {
    counts: Count[];
    field_name: string;
    sampled: boolean;
    stats: Stats;
  }
  
  interface Count {
    count: number;
    highlighted: string;
    value: string;
  }
  
  interface Stats {
    avg: number;
    max: number;
    min: number;
    sum: number;
    total_values: number;
  }
  
  interface Hit {
    document: Document;
    highlight: Highlight;
    highlights: Highlight[];
    text_match: number;
    text_match_info: TextMatchInfo;
  }
  
  interface Document {
    attributes: Record<string, any>;
    category: string;
    collection_data: CollectionData[];
    collections: string[];
    commission: Commission[];
    default_variant: DefaultVariant;
    description: string;
    id: string;
    image: string;
    max_price: number;
    modified: string;
    name: string;
    price: number;
    product_type: string;
    rating: number;
    seo_description: string;
    seo_title: string;
    slug: string;
    specifications: Specifications;
    state: string;
    variants: Variant[];
  }
  
  interface CollectionData {
    id: number;
    name: string;
    slug: string;
  }
  
  interface Commission {
    commission: string;
    plan: string;
    plan_id: number;
  }
  
  interface DefaultVariant {
    id: string;
    name: string;
    slug: string | null;
  }
  
  interface Specifications {
    Brand: string;
    Color: string;
    CountryOfOrigin: string;
    "Pack of": string;
    "Package Includes": string;
    Type: string;
  }
  
  interface Variant {
    description: string;
    id: string;
    image: string;
    max_price: number;
    name: string;
    slug: string | null;
    specification: Specifications;
    stocks: Stock[];
  }
  
  interface Stock {
    company_id: number;
    company_image: string;
    company_name: string;
    company_slug: string;
    id: number;
    price: number;
  }
  
  interface Highlight {
    name: MatchedTokenDetail;
    variants?: VariantHighlight[];
  }
  
  interface MatchedTokenDetail {
    matched_tokens: string[];
    snippet: string;
    value: string;
  }
  
  interface VariantHighlight {
    name: MatchedTokenDetail;
    specification: Record<string, MatchedTokenDetail>;
  }
  
  interface TextMatchInfo {
    best_field_score: string;
    best_field_weight: number;
    fields_matched: number;
    score: string;
    tokens_matched: number;
  }
  
  interface RequestParams {
    collection_name: string;
    per_page: number;
    q: string;
  }
  