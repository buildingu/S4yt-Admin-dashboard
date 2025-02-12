const getApiEndpoint = () => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  if (environment === "production") {
    return import.meta.env.VITE_PROD_BASE_URL || "https://default-prod-url.com";
  } else {
    return import.meta.env.VITE_DEV_BASE_URL;
  }
};

export const baseUrl = getApiEndpoint();
