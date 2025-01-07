import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const controller = new AbortController();

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_TEST ,
    signal: controller.signal,
});

API.interceptors.request.use(
  function (config) {
    if (isBrowser) {
      const token = sessionStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token ?? ""}`;
    }

    return config;
  },
  function (error) {
     // Handle timeout error
    if (error?.code === "ECONNABORTED") {
      console.error("Request timed out:", error?.message);
    }
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    // Process the response data here
    // You can modify the response data or perform additional actions
    return response;
  },
  (error) => {
    //console.error("Error response:", error.response);

    // Log the error without triggering a page navigation
    if (error?.response && error?.response?.status === 500) {
      console.error("Internal Server Error:", error);
    }

    // Retry the request up to MAX_RETRIES times for 500 errors
    const { config } = error;
    if (config && config.retryCount && config.retryCount < 2) {
      config.retryCount += 1;
      return new Promise((resolve) => {
        setTimeout(() => resolve(API(config)), 1000);
      });
    }

    // Handle errors related to the absence of a response
    if (error.request) {
      console.error("No response received");
      // You can log an error message or take other actions here
    }

    // Handle response errors
    // You can customize error handling based on the status code or other conditions
    if (error.response && error.response.status === 401) {
      // Redirect the user to the login page
      if (isBrowser) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
