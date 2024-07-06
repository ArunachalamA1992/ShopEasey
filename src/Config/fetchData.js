import {api} from './api';

const api_name = 'api/';

export default {
  login_with_otp: (data, token) => {
    let url = api_name + 'auth/user/login_with_otp';
    return api.postMethod(url, data, token);
  },
  login_with_gmail: (data, token) => {
    let url = api_name + 'auth/google';
    return api.postMethod(url, data, token);
  },
  login_verify_otp: (data, token) => {
    let url = api_name + 'auth/user/login_verify_otp';
    return api.postMethod(url, data, token);
  },
  Register_request_otp: (data, token) => {
    let url = api_name + 'auth/user/request_otp';
    return api.postMethod(url, data, token);
  },
  Register_verify_otp: (data, token) => {
    let url = api_name + 'auth/user/register_with_otp';
    return api.postMethod(url, data, token);
  },
  list_countries: (data, token) => {
    let url = api_name + 'common/list_countries';
    return api.getMethod(url, token);
  },
  categories: (data, token) => {
    let url = api_name + 'categories' + data;
    return api.getMethod(url, token);
  },
  sub_categories: (data, token) => {
    let url = api_name + 'sub_categories/' + data;
    return api.getMethod(url, token);
  },
  sub_sub_categories: (data, token) => {
    let url = api_name + 'sub_sub_categories/' + data;
    return api.getMethod(url, token);
  },
  list_products: (data, token) => {
    let url = api_name + 'products?' + data;
    return api.getMethod(url, token);
  },
  single_property: (param, data, token) => {
    let url = api_name + 'products/get/' + param + '?' + data;
    return api.getMethod(url, token);
  },
  upload_assets: (data, token) => {
    let url = api_name + 'common/upload_assets';
    return api.postMethod(url, data, token);
  },
  add_to_cart: (data, token) => {
    let url = api_name + 'carts';
    return api.postMethod(url, data, token);
  },
  list_cart: (data, token) => {
    let url = api_name + 'carts';
    return api.getMethod(url, token);
  },
  update_cart: (param, data, token) => {
    let url = api_name + 'carts/' + param;
    return api.putMethod(url, data, token);
  },
  delete_cart: (param, token) => {
    let url = api_name + 'carts/' + param;
    return api.deleteMethod(url, token);
  },
  toggle_wishlists: (data, token) => {
    let url = api_name + 'wishlists/toggle';
    return api.postMethod(url, data, token);
  },
  list_wishlist: (data, token) => {
    let url = api_name + 'wishlists';
    return api.getMethod(url, token);
  },
  list_address: (data, token) => {
    let url = api_name + 'address';
    return api.getMethod(url, token);
  },
  add_address: (data, token) => {
    let url = api_name + 'address';
    return api.postMethod(url, data, token);
  },
  update_address: (param, data, token) => {
    let url = api_name + 'address/' + param;
    return api.putMethod(url, data, token);
  },
  get_state_data: (data, token) => {
    let url = api_name + 'address/state?' + data;
    return api.getMethod(url, token);
  },
  postOrder: (data, token) => {
    let url = api_name + 'orders';
    return api.postMethod(url, data, token);
  },
  verify_order: (data, token) => {
    let url = api_name + 'orders/paypal_verify';
    return api.postMethod(url, data, token);
  },
  list_order: (data, token) => {
    let url = api_name + 'orders?' + data;
    return api.getMethod(url, token);
  },
  list_status: (data, token) => {
    let url = api_name + 'orders/status';
    return api.getMethod(url, token);
  },
  profile_data: (data, token) => {
    let url = api_name + 'users/user/get';
    return api.getMethod(url, token);
  },
  update_profile: (data, token) => {
    let url = api_name + 'auth/user/update_profile';
    return api.putMethod(url, data, token);
  },
  flash_Offers: (data, token) => {
    let url = api_name + 'products/offer-products';
    return api.getMethod(url, token);
  },
  seller_list: (data, token) => {
    let url = api_name + 'follow/sellers?' + data;
    return api.getMethod(url, token);
  },
  post_follow: (param, data, token) => {
    let url = api_name + 'follow/' + param;
    return api.putMethod(url, data, token);
  },
  get_banner: (data, token) => {
    let url = api_name + 'banner/mobile?' + data;
    return api.getMethod(url, token);
  },
  get_review: (data, token) => {
    let url = api_name + 'review/' + data;
    return api.getMethod(url, token);
  },
  verify_pay: (data, token, header) => {
    let url = api_name + 'orders/verify';
    return api.postMethod(url, data, token, header);
  },
  update_order: (param, data, token) => {
    let url = api_name + 'orders/' + param;
    return api.patchMethod(url, data, token);
  },
  search: (data, token) => {
    let url = api_name + 'products/search?' + data;
    return api.getMethod(url, token);
  },
  remove_account: (data, token) => {
    let url = api_name + 'auth/user';
    return api.deleteMethod(url, token);
  },
};
