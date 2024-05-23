import {api} from './api';

const api_name = 'api/';

export default {
  login_with_pass: (data, token) => {
    let url = api_name + 'users/login';
    return api.postMethod(url, data, token);
  },
  verify_OTP: (data, token) => {
    let url = api_name + 'Login/verify_otp';
    return api.postMethod(url, data, token);
  },
  register: (data, token) => {
    let url = api_name + 'users/register';
    return api.postMethod(url, data, token);
  },
  candidates_profile: (data, token) => {
    let url = api_name + 'candidates';
    return api.patchMethod(url, data, token);
  },
  list_jobs: (data, token) => {
    let url = api_name + 'jobs';
    return api.getMethod(url, token);
  },
  filter_job: (data, token) => {
    let url = api_name + 'jobs?' + data;
    return api.getMethod(url, token);
  },
  recommended_jobs: (data, token) => {
    let url = api_name + 'jobs/recommended_jobs';
    return api.getMethod(url, token);
  },
  related_jobs: (data, token) => {
    let url = api_name + 'jobs/related_jobs/' + data;
    return api.getMethod(url, token);
  },
  single_candidate: (data, token) => {
    let url = api_name + 'candidates';
    return api.getMethod(url, token);
  },
  get_education: (data, token) => {
    let url = api_name + 'job/education';
    return api.getMethod(url, token);
  },
  get_experience: (data, token) => {
    let url = api_name + 'job/experience';
    return api.getMethod(url, token);
  },
  list_skills: (data, token) => {
    let url = api_name + 'job/skills';
    return api.getMethod(url, token);
  },
  job_type: (data, token) => {
    let url = api_name + 'job/jobtype';
    return api.getMethod(url, token);
  },
  industry_type: (data, token) => {
    let url = api_name + 'job/industry';
    return api.getMethod(url, token);
  },
  list_language: (data, token) => {
    let url = api_name + 'job/language';
    return api.getMethod(url, token);
  },
  upload_resume: (data, token) => {
    let url = api_name + 'cv';
    return api.postMethod(url, data, token);
  },
  delete_resume: (data, token) => {
    let url = api_name + 'cv/' + data;
    return api.deleteMethod(url, token);
  },
  update_resume: (data, id, token) => {
    let url = api_name + 'cv/' + id;
    return api.putMethod(url, data, token);
  },
  list_bookmarks: (data, token) => {
    let url = api_name + 'candidates/bookmarks';
    return api.getMethod(url, token);
  },
  search: (data, token) => {
    let url = api_name + 'jobs/ajax?' + data;
    return api.getMethod(url, token);
  },
  add_search: (data, token) => {
    let url = api_name + 'jobs/ajax';
    return api.postMethod(url, token);
  },
  toggle_bookmarks: (data, token) => {
    let url = api_name + 'candidates/bookmarks';
    return api.postMethod(url, data, token);
  },
  list_job_Applied: (data, token) => {
    let url = api_name + 'applied_job';
    return api.getMethod(url, token);
  },
  create_applied_job: (data, token) => {
    let url = api_name + 'applied_job/create';
    return api.postMethod(url, data, token);
  },
  list_company: (data, token) => {
    let url = api_name + 'company?' + data;
    return api.getMethod(url, token);
  },
  upload_profile: (data, token) => {
    let url = api_name + 'candidates/profile';
    return api.postMethod(url, data, token);
  },
  forgot_password: (data, token) => {
    let url = api_name + 'users/forgot_password';
    return api.postMethod(url, data, token);
  },
  password_otp: (data, token) => {
    let url = api_name + 'users/verifyOtp';
    return api.postMethod(url, data, token);
  },
  resetPassword: (data, token) => {
    let url = api_name + 'users/resetPassword';
    return api.postMethod(url, data, token);
  },
  aboutUsData: (data, token) => {
    let url = api_name + 'job/aboutus';
    return api.getMethod(url, token);
  },
  contactUsData: (data, token) => {
    let url = api_name + 'job/contact';
    return api.postMethod(url, data, token);
  },
  notification: (data, token) => {
    let url = api_name + 'notification';
    return api.getMethod(url, token);
  },
  update_notification: (data, token) => {
    let url = api_name + 'notification/' + data;
    return api.getpatchMethod(url, token);
  },
  mark_all_notification: (data, token) => {
    let url = api_name + 'notification';
    return api.putMethod(url, data, token);
  },
  delete_user: (data, token) => {
    let url = api_name + 'candidates';
    return api.deleteMethod(url, token);
  },
};
