import axios from 'axios';

import {baseUrl} from './base_url';

export const api = {
  header: token => {
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (token) {
      header.Authorization = 'Bearer ' + token;
    }
    return header;
  },
  getMethod: (url, token) => {
    var headers = api.header(token);
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
  postMethod: (url, data, token, header) => {
    var headers = api.header(token);
    if (header != undefined) {
      headers['x-razorpay-signature'] = header;
    }
    const formData = new FormData();
    Object.keys(data).map(obj => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, {headers: headers})
        .then(res => {
          if (res.status == 200 || res.status == 201) {
            resolve(res.data);
          }
        })
        .catch(err => resolve(err.response.data));
    });
  },
  putMethod: (url, data, token) => {
    var headers = api.header(token);
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
  patchMethod: (url, data, token) => {
    var headers = api.header(token);
    return new Promise((resolve, reject) => {
      axios
        .patch(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
  deleteMethod: (url, token) => {
    var headers = api.header(token);
    return new Promise((resolve, reject) => {
      axios
        .delete(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
};
