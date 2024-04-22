export interface UserDetail {
  id: number;
  mobile: string;
  first_name: string | null;
  fcm_id: string;
  email: string | null;
  country: null;
  mixpanel_id: string;
  badge: number;
  user_company: null;
  user_permissions: number[];
  permissions: Permission[];
  sales_data: null;
  agent_data: null;
  reseller_data: ResellerData;
  push_notification: boolean;
  send_email: boolean;
  send_whatsapp: boolean;
  profile_image: null;
  profession: null;
  state: null;
  state_place_id: null;
  city: null;
  city_place_id: null;
}

export interface Permission {
  id: number;
  name: string;
  codename: string;
}

export interface ResellerData {
  id: number;
  name: null;
  description: null;
  logo: null;
  city: null;
  city_place_id: null;
  pan: null;
  pan_status: string;
  pan_card_path: null;
  pan_verified: boolean;
  state: string;
  site_data: null;
  pan_verify_count: number;
  pan_verification_pending: boolean;
  is_approved: null;
  approval_date: Date;
  approval_target_view: number;
  approval_target_price_currency: string;
  approval_target_price: string;
  created: Date;
  user: number;
  extend_count: number;
}
