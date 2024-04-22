export interface SiteDataModel {
    version: number
    freshchat_show_ui: boolean
    freshchat_show_ui_reseller: boolean
    buy_now: boolean
    buy_now_text: string
    product_shipping_show: boolean
    product_share_show: boolean
    product_return_policy_show: boolean
    reseller_kyc_verification_pending_popup_show: boolean
    min_order_amount: number
    zoozle_ui_email: string
    zoozle_ui_mobile_no: string
    reseller_ui_email: string
    reseller_ui_mobile_no: string
    edd_check: boolean
    earn_with_zoozle_popup: boolean
    redirect_url: any
    reseller_kyc_verified: boolean
    current_site: string
    reseller_data: ResellerData
    logout_url: string
    login_url: string
}

export interface ResellerData {
    id: number
    name: string
    logo: any
}
