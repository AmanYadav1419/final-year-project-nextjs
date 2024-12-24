import Stripe from "stripe";

/* Stripe is a popular payment processing platform that allows 
businesses to accept payments online. It provides various APIs
 to handle transactions, subscriptions, and user management.*/

// created types structure for songs
export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
};

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  biling_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  images?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: CSSMathProduct;
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  // need to be checked this mistake once, which quantity method is right
  // mistake happen by unnati
  // quantity?: number;
  quantity?: string;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  price?: Price;
}
