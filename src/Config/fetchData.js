import {api} from './api';

const api_name = 'api/';

export default {
  login_with_otp: (data, token) => {
    let url = api_name + 'users/login_with_otp';
    return api.postMethod(url, data, token);
  },
};
