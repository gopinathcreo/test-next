export interface subscriptionList {
  count: number;
  next: string;
  previous: any;
  results: Subscription[];
}
export interface Subscription {
  id: number;
  plan: number;
  cashfree_subscription: null;
  invoice: Invoice;
  created: Date;
  modified: Date;
  created_by: string;
  modified_by: null;
  razorpay_subscription_id: null;
  razorpay_order_id: string;
  onetime_payment_status: string;
  is_onetime_payment: boolean;
  is_free_trial: boolean;
  trial_days: number;
  additional_trial_days: number;
  razorpay_plan_id: null;
  total_count: number;
  customer_notify: boolean;
  start_at: number;
  quantity: number;
  notes: Notes;
  status: string;
  paid_count: number;
  current_start: null;
  current_end: null;
  ended_at: null;
  charge_at: null;
  auth_attempts: number;
  expire_by: null;
  addons: Addon[];
  offer_id: null;
  short_url: null;
  has_scheduled_changes: boolean;
  schedule_change_at: null;
  remaining_count: number;
  razorpay_payment_id: null;
  razorpay_signature: string;
  new_plan_activated: boolean;
  new_payment_initiated: boolean;
  subscription_provider: string;
  reseller: number;
  reseller_plan: number;
}

export interface Addon {
  item: Item;
}

export interface Item {
  name: string;
  amount: number;
  currency: string;
}

export interface Invoice {
  path: string;
  type: string;
  id: number;
  created: Date;
}

export interface Notes {
  reseller_store_name: string;
  reseller_id: number;
}
