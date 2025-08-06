// This file is responsible for centralizing all API calls to the backend.
// It will be used by various components and contexts to fetch or send data.
// Best practice: Use a library like Axios or the native Fetch API with a consistent error handling mechanism.
// Abstract away the base URL and authentication headers.

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
