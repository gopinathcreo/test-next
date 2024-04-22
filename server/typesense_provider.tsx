"use server";

const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': process.env.TYPESENSE_HOST, 
    'port': process.env.TYPESENSE_PORT,     
    'protocol': process.env.TYPESENSE_PROTOCOL 
  }],
  'apiKey': process.env.TYPESENSE_KEY ,
  'connectionTimeoutSeconds': 3
})

interface QueryParams {
  query_by: string;
  num_typos: number;
  typo_tokens_threshold: number;
  highlight_full_fields: string;
  collection: string;
  q: string;
  facet_by: string;
  max_facet_values: number;
  query_by_weights: string;
  page?: number;
  per_page?: number;
  filter_by: string;
  sort_by?: string;
}

function getQueryParams(query: string, {
  page = 1,
  limit = 20,
  product_types,
  attributes,
  collection_slug,
  sortBy,
  minPrice,
  maxPrice,
  facetBy,
  company_slug
}: {
  page?: number;
  limit?: number;
  product_types?: string[];
  attributes?: Map<string, string[]>;
  collection_slug?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  facetBy?: string;
  company_slug?: string;
}): QueryParams {
  let queryParams: QueryParams = {
    query_by: "variants.name,name,collections,variants.specification,variants.description",
    num_typos: 1,
    typo_tokens_threshold: 1,
    highlight_full_fields: "name,description",
    collection: "products",
    q: query === '' ? "*" : query,
    facet_by: "price" + (facetBy ? `,${facetBy}` : ""),
    max_facet_values: 50,
    query_by_weights: "6,5,4,3,2",
    page,
    per_page: limit,
    filter_by: "",
  };

  let filterBy = [];

  if (collection_slug) {
    if (queryParams.filter_by) filterBy.push(" && ");
    filterBy.push(`collection_data.slug:=${collection_slug}`);
    queryParams.facet_by = `${queryParams.facet_by}`;
  }
  if (company_slug) {
    if (queryParams.filter_by) filterBy.push(" && ");
    filterBy.push(`variants.stocks.company_slug:=${company_slug}`);
    queryParams.facet_by = `${queryParams.facet_by}`;
  }
  if (product_types && product_types.length > 0) {
    if (queryParams.filter_by || filterBy.length > 0) filterBy.push(" && ");
    filterBy.push(`product_type:=[${product_types.join(',')}]`);
  }

  attributes?.forEach((value, key) => {
    if (queryParams.filter_by || filterBy.length > 0) filterBy.push(" && ");
    filterBy.push(`${key}:=[${value.join(',')}]`);
  });

  if (sortBy) {
    queryParams.sort_by = sortBy;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    if (queryParams.filter_by || filterBy.length > 0) filterBy.push(" && ");
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filterBy.push(`price:=[${minPrice}..${maxPrice}]`);
  } else if (minPrice !== undefined) {
    filterBy.push(`price:>=${minPrice}`);
  } else if (maxPrice !== undefined) {
    filterBy.push(`price:<=${maxPrice}`);
  }

  queryParams.filter_by = filterBy.join('');

  return queryParams;
}

const getProducts = async (
  query: string,
  {
    page = 1,
    product_types,
    attributes,
    sortBy,
    minPrice,
    maxPrice,
    limit = 20,
  }: {
    page?: number;
    product_types?: string[];
    attributes?: Record<string, string>; // Using a Record for key-value pairs in TypeScript
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
  }
):  Promise<TypesenseSearchResponse | null>  => {

  // Prepare your searches array
  const searches = [
    //getQueryParams(query, { limit }),
    getQueryParams(query, { sortBy, minPrice, maxPrice, page, limit }),
  ];

  // Add conditional search based on productTypes, if present
  if (product_types) {
    searches.push(
      getQueryParams(query, { page, maxPrice, minPrice, sortBy, product_types, limit })
    );
  }

  // Assuming you have a Typesense client instance named `client`
  try {
    const searchParams = product_types ? getQueryParams(query,{product_types}) : getQueryParams(query,{});
    const result = await client.collections("products")
    .documents()
    .search(searchParams) as TypesenseSearchResponse | null;
    // const result = await client.multiSearch.perform(
    //   { searches },
    //   { queryParams: { query_by: "variants.name,name,collections,variants.specification,variants.description" } }
    // );

    // Assuming you have a way to convert the result to a MultiSearchResult type
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCollectionProducts = async (
  query: string,
  collection_slug: string,
  {
    page = 1,
    product_types,
    attributes,
    sortBy,
    minPrice,
    maxPrice,
    limit = 20,
    facetBy,
      company_slug
  }: any
): Promise<any> => {

  // Prepare the searches array
  const searches = [
    //getQueryParams("*", { collectionSlug }),
    getQueryParams(query, { sortBy, minPrice, maxPrice, page, attributes, collection_slug, limit, facetBy, company_slug }),
  ];

  // Add conditional search based on productTypes, if present
  if (product_types) {
    searches.push(
      getQueryParams(query, { product_types, sortBy, minPrice, maxPrice, page, attributes, collection_slug, limit, facetBy, company_slug })
    );
  }
  // Assuming you have a Typesense client instance named `client`
  try {
    const result = await client.multiSearch.perform(
      { searches },
      { queryParams: { query_by: "name,collections,variants.description" } }
    );
    
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getSimilarProducts = async(

  query: string,
  collection_slug: string,
  {
    page = 1,
    product_types,
    attributes,
    sortBy,
    minPrice,
    maxPrice,
    limit = 20,
    facetBy,
  }: any
): Promise<any> => {

  // Prepare the searches array
  const searches = [
    //getQueryParams("*", { collectionSlug }),
    getQueryParams(query, { product_types, sortBy, minPrice, maxPrice, page, attributes, collection_slug, limit, facetBy })
  ];

  // Add conditional search based on productTypes, if present


  
  // Assuming you have a Typesense client instance named `client`
  try {
    const result = await client.multiSearch.perform(
      { searches },
      { queryParams: { query_by: "name,collections,variants.description" } }
    );
    
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getProducts };
export const getProductDetails = async (slug: string): Promise<any> => { 
  try {
    const result = await client.collections('products').documents().search({'q':slug, 'query_by'  : 'slug'});
    let document: any;
    for(const hit of result.hits){
      if(hit.document.slug === slug){
        document = hit.document;
        break;
      }
    }
    return document;
  } catch (error) {
    console.error(error);
    return null;
  }
}
