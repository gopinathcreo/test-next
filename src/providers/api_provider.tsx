import { ApiResponse } from "./models/api_response";
import { CategoryModel } from "./models/category";
import { ProductModel } from "./models/product_model";
import {
  AddressListModel,
  AddressModel,
  CheckoutModel,
  Line,
  PaymentModel,
} from "@/src/providers/models/checkout_model";
import { LocalStorageProvider } from "@/src/providers/local_storage_provider";
import { StatesResponse } from "./models/states";
import { SiteDataModel } from "./models/site_data_model";
import { OrderListModel } from "./models/orderlist_model";
import { OrderDetailModel } from "./models/order_detail_model";
import { PincodeCheckModel } from "./models/pincode_check_model";
import { SellerCollection } from "./models/seller_collection_model";
import { CompanyModel } from "./models/company_model";
import { Subscription, subscriptionList } from "./models/subscription_model";
import { Privatemetadata, Result, ReviewModel } from "./models/review_model";
import { AddReviewModel } from "./models/add_review_model";
import { UserDetail } from "./models/user_detail_model";

async function convertResponse<T>(
  response: Promise<Response>
): Promise<ApiResponse<T>> {
  try {
    const result = await response;
    if (result.ok) {
      const data: T = result?.status == 204 ? "" : await result.json();
      return {
        status: true,
        message: "Success",
        data: data,
      };
    } else {
      if (result.status == 401) {
        if (LocalStorageProvider.isLoggedIn()) {
          LocalStorageProvider.deleteToken();
          LocalStorageProvider.deleteCheckout();
        }
      }
      return {
        status: false,
        response: await result.json(),
        message: `Failed: ${result.status} ${result.statusText}`,
      };
    }
  } catch (error) {
    console.error("Error fetching response:", error);
    return {
      status: false,
      message: `Error: ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    };
  }
}

//----------------------Headers----------------------//
function getHeaders(isImage = false) {
  let token = LocalStorageProvider.getToken();
  if (token == null) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    } as HeadersInit;
  } else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${token}`,
    } as HeadersInit;
  }
}

//----------------------User APIs----------------------//

export async function loginUser(
  id_token: string
): Promise<ApiResponse<UserModel>> {
  return convertResponse<UserModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ id_token: id_token, mobile_country_code: "IN" }),
    })
  );
}

export async function logoutUser(): Promise<ApiResponse<UserModel>> {
  return convertResponse<UserModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout/`, {
      method: "DELETE",
      headers: getHeaders(),
    })
  );
}

export async function fetchAddressList(): Promise<
  ApiResponse<AddressListModel>
> {
  return convertResponse<AddressListModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address/`, {
      headers: getHeaders(),
    })
  );
}

export async function fetchUserDetails(): Promise<ApiResponse<UserDetail>> {
  return convertResponse<UserDetail>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/0/`, {
      headers: getHeaders(),
    })
  );
}

export async function editUserDetails(
  data: UserDetail
): Promise<ApiResponse<UserDetail>> {
  return convertResponse<UserDetail>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/edit/`, {
      headers: getHeaders(),
      method: "PUT",
      body: JSON.stringify(data),
    })
  );
}

//----------------------Site APIs----------------------//

export async function fetchSiteData(
  host: string
): Promise<ApiResponse<SiteDataModel>> {
  return convertResponse<SiteDataModel>(
    fetch(`https://${host}/api/v4/menu/web/`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      } as HeadersInit,
    })
  );
}

//----------------------Product APIs----------------------//
export async function fetchProductDetails(
  slug: string,
  variant_id: string | null
): Promise<ApiResponse<ProductModel>> {
  return convertResponse<ProductModel>(
    fetch(
      `${process.env.NEXT_SERVER_API_URL}/product/${slug}/web${
        variant_id ? `?v=${variant_id}` : ""
      }`, {
          cache: "no-cache",
        }
    )
  );
}
export async function fetchCompanyDetails(
  company_slug: string,
  is_from_server: boolean
): Promise<ApiResponse<CompanyModel>> {
  if (is_from_server) {
    return convertResponse<CompanyModel>(
      fetch(
        `${process.env.NEXT_SERVER_API_URL}/company/web/${company_slug}/
  `
      )
    );
  } else {
    return convertResponse<CompanyModel>(
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company/web/${company_slug}/
  `
      )
    );
  }
}
export async function pincodeCheck(
  pincode: string | undefined,
  variant: number
): Promise<ApiResponse<PincodeCheckModel>> {
  return convertResponse<PincodeCheckModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shipping/check_pincode_service/?to_pincode=${pincode}&stock_id=${variant}
            `
    )
  );
}

export async function fetchReviews(
  productId: number
): Promise<ApiResponse<ReviewModel>> {
  return convertResponse<ReviewModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review/?product=${productId}
            `
    )
  );
}

export async function postReview(review: AddReviewModel, id: number) {
  return convertResponse<Result>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/review/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(review),
    })
  );
}

export async function addEditAddress(data: AddressModel, id?: number) {
  const url = id
    ? `${process.env.NEXT_PUBLIC_API_URL}/user/address/${id}/`
    : `${process.env.NEXT_PUBLIC_API_URL}/user/address/`;
  return convertResponse<AddressListModel | AddressModel>(
    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
  );
}

//-----------------Address APIs--------------------//
export async function getOrderList(
  page: number,
  limit: number
): Promise<ApiResponse<OrderListModel>> {
  return convertResponse<OrderListModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/purchase/?limit=${limit}&page=${page}`,
      {
        headers: getHeaders(),
      }
    )
  );
}
export async function getOrderDetailPrivate(
  id: string
): Promise<ApiResponse<OrderDetailModel>> {
  return convertResponse<OrderDetailModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/purchase/${id}/`, {
      headers: getHeaders(),
    })
  );
}
export async function getOrderDetailPublic(
  id: string
): Promise<ApiResponse<OrderDetailModel>> {
  return convertResponse<OrderDetailModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}/public/`, {
      headers: getHeaders(),
    })
  );
}

export async function fetchCategories(): Promise<ApiResponse<CategoryModel>> {
  return convertResponse<CategoryModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reseller/app/categories/`, {
      cache: "no-cache",
    })
  );
}

//----------------------Checkout APIs----------------------//

export async function fetchCheckoutDetails(): Promise<
  ApiResponse<CheckoutModel>
> {
  let token = LocalStorageProvider.getCheckout();
  if (token == null) {
    return {
      status: false,
      message: "No checkout token found",
    };
  }
  let response = await convertResponse<CheckoutModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}`, {
      headers: getHeaders(),
    })
  );

  return response;
}

export async function addToCheckout(
  quantity: number,
  variant_id: number,
  stock_id: number,
  checkout: CheckoutModel | null | undefined
): Promise<ApiResponse<CheckoutModel>> {
  let token = LocalStorageProvider.getCheckout();
  // If token is null, create a new checkout
  if (token == null) {
    return createCheckout(quantity, variant_id, stock_id);
  }
  // Else, add to existing checkout
  else {
    let checkout_value: CheckoutModel;
    // If checkout is null, fetch checkout details
    if (checkout === null) {
      let response = await fetchCheckoutDetails();
      if (response.status) {
        // CheckoutContext.Provider({value: response.data});
        checkout_value = response.data!;
      } else {
        return response;
      }
    } else {
      checkout_value = checkout as CheckoutModel;
    }

    checkout_value.lines?.push({
      quantity: quantity,
      variant: variant_id,
      stock: stock_id,
    } as Line);

    let response = await convertResponse<CheckoutModel>(
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(checkout_value),
      })
    );

    if (response.status) {
      // CheckoutContext.Provider({value: response.data});
    }

    return response;
  }
}

export async function createCheckout(
  quantity: number,
  variant_id: number | null,
  stock_id: number
): Promise<ApiResponse<CheckoutModel>> {
  let checkout_value: CheckoutModel = {
    lines: [],
    payment_mode: "RAZORPAY",
  };
  if (variant_id != null) {
    checkout_value.lines?.push({
      quantity: quantity,
      variant: variant_id,
      stock: stock_id,
    } as Line);
  }

  let response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(checkout_value),
  });
  let checkoutResponse: ApiResponse<CheckoutModel> =
    await convertResponse<CheckoutModel>(response);

  if (checkoutResponse.status) {
    LocalStorageProvider.setCheckout(checkoutResponse.data?.token);
  }
  return checkoutResponse;
}

export async function incrementQuantity(
  line_id: number
): Promise<ApiResponse<Line>> {
  return convertResponse<Line>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/line/${line_id}/quantity_increase/`,
      {
        headers: getHeaders(),
      }
    )
  );
}

export async function decrementQuantity(
  line_id: number
): Promise<ApiResponse<Line>> {
  return convertResponse<Line>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/line/${line_id}/quantity_decrease/`,
      {
        headers: getHeaders(),
      }
    )
  );
}

export async function deleteLine(line_id: number): Promise<ApiResponse<Line>> {
  return convertResponse<any>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/line/${line_id}/`, {
      method: "DELETE",
      headers: getHeaders(),
    })
  );
}

export async function updateCheckout(
  checkout: CheckoutModel
): Promise<ApiResponse<CheckoutModel>> {
  return convertResponse<CheckoutModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/${checkout.token}/`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(checkout),
    })
  );
}

export async function addPlan(): Promise<ApiResponse<CheckoutModel>> {
  let token = LocalStorageProvider.getCheckout();
  return convertResponse<CheckoutModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/add-trial-plan/`,
      {
        headers: getHeaders(),
      }
    )
  );
}

export async function removePlan(): Promise<ApiResponse<CheckoutModel>> {
  let token = LocalStorageProvider.getCheckout();
  return convertResponse<CheckoutModel>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/remove-plan/`, {
      headers: getHeaders(),
    })
  );
}

export async function checkoutToOrder(): Promise<ApiResponse<PaymentModel>> {
  let token = LocalStorageProvider.getCheckout();
  return convertResponse<PaymentModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/checkout-to-order/`,
      {
        headers: getHeaders(),
      }
    )
  );
}

export async function makePayment(): Promise<ApiResponse<PaymentModel>> {
  let token = LocalStorageProvider.getCheckout();
  return convertResponse<PaymentModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/make-payment/`,
      {
        method: "POST",
        headers: getHeaders(),
      }
    )
  );
}

export async function capturePayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
): Promise<ApiResponse<CheckoutModel>> {
  let token = LocalStorageProvider.getCheckout();
  return convertResponse<CheckoutModel>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/${token}/capture-payment/`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature: razorpay_signature,
        }),
      }
    )
  );
}

export async function getStateList() {
  return convertResponse<StatesResponse>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/utils/state/`, {
      headers: getHeaders(),
    })
  );
}

export async function imageUpload(formData: FormData) {
  let token = LocalStorageProvider.getToken();

  return convertResponse<{ file_path?: string; fullurl?: string }>(
    fetch("/api/v4/utils/file/upload/", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `${token}`,
        file: "file",
        enctype: "multipart/form-data",
      },
    })
  );
}

export async function fetchSellerCollectionProducts(slug: string) {
  const params = {
    company: slug,
  };
  const queryString = new URLSearchParams(params).toString();

  const res = await convertResponse<any>(
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/weblist/?${queryString}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    )
  );
  let products: SellerCollection[] = [];
  if (res.data) {
    res.data?.results?.forEach((element: any) => {
      let product: SellerCollection = {
        name: "",
        slug: "",
        images: null,
        image: null,
        selling_price: null,
        max_price: null,
        discount: null,
      };
      let sellPrice = +element?.variant.stock?.price;
      let maxPrice = +element?.variant?.max_price;
      let discount = Math.floor(100 - (sellPrice / maxPrice) * 100);

      product.name = element?.name;
      product.slug = element?.slug;
      product.images = element?.images;
      product.image = element?.images?.preview;
      product.variant = element?.variant;
      product.selling_price = sellPrice;
      product.max_price = maxPrice;
      product.discount = discount > 3 ? discount : 0;
      delete element?.variant.stocks;
      products.push(product);
    });
  }
  return products;
}

export async function buySubscription(
  id: number
): Promise<ApiResponse<Subscription>> {
  return convertResponse<Subscription>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reseller/subscription/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ plan: id }),
    })
  );
}
export async function subscriptions(): Promise<ApiResponse<subscriptionList>> {
  return convertResponse<subscriptionList>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reseller/subscription/`, {
      method: "GET",
      headers: getHeaders(),
    })
  );
}
export async function createPlan(
  id: number,
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
): Promise<ApiResponse<Subscription>> {
  return convertResponse<Subscription>(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/reseller/subscription/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
      }),
    })
  );
}
