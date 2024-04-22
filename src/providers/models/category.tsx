export interface Collection {
    title: string;
    image: string;
    collection_id: number;
    slug: string;
  }
  
  export interface SubCategory {
    title: string;
    id: number;
    collections?: Collection[];
  }
  
  export interface Banner {
    image: string;
    redirect?: {
      type?: string;
      layout_id?: string;
    };
    id: number;
  }
  
  export interface Category {
    banner: Banner;
    image: string;
    sub_categories: SubCategory[];
    id: number;
    selected_image: string;
    name: string;
    isOpen?: boolean;
    isHovering?: boolean;
  }
  
  export interface CategoryModel {
    categories: Category[] | undefined;
  }
  