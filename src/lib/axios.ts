import axios from 'axios';
import * as Sentry from '@sentry/react';
import { getEnv } from '@/config/env';

// Create a custom Axios instance
const AxiosApi = axios.create({
  baseURL: `${getEnv('API_URL')}/api`,
  timeout: 10000,
});

// Add response interceptor to catch errors globally
AxiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const err =
      error?.response?.data?.message || error.message || 'Unknown API error';
    Sentry.captureException(error, {
      extra: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
        status: error.response?.status,
      },
    });
    console.error('[Axios Error]', err);
    return Promise.reject(error);
  },
);

export default AxiosApi;
