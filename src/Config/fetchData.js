import {api} from './api';

const api_name = 'api/';

export default {
  login_with_otp: (data, token) => {
    let url = api_name + 'auth/user/login_with_otp';
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
    let url = api_name + 'categories/' + data;
    return api.getMethod(url, token);
  },
  list_products: (data, token) => {
    let url = api_name + 'products?' + data;
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
};
