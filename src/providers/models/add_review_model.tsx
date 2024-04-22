export interface AddReviewModel {
    value: number;
    private_metadata:Privatemetadata;
    variant:number;
    order_line:any;
  }

  export interface Privatemetadata {
    name:string;
    title:string;
    command:string;
  }