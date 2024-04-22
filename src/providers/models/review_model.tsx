export interface ReviewModel {
    count: number;
    next?: any;
    previous?: any;
    results: Result[];
  }
export interface Result {
    id: number;
    variant: number;//
    user: User;
    product_rating: string;
    created: string;
    private_metadata: Privatemetadata;//
    metadata: Metadata;
    images?: any;
    title?: any;
    review?: any;
    value: number;//
    is_approved: boolean;
    approved_at?: any;
    order_line?: any;//
  }
export  interface Metadata {
  }
export  interface Privatemetadata {
    name: string;
    title: string;
    command: string;
  }
export  interface User {
    id: number;
    first_name?: any;
  }

//   const data = this.form.value;
//   const postData: any = {};
//   postData["value"] = data?.value;
//   postData["variant"] = this.data?.variant;
//   postData["order_line"] = this.order_line;
//   postData["private_metadata"] = {
//     name: data?.name,
//     command: data?.command,
//     title: "",
//   };
  
