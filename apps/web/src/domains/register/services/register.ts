
// Import the configured Axios instance.
// We use this instance to make HTTP requests to our backend API.
import api from "@/lib/axios";

// Import TypeScript types only.
// RegisterRequest defines the data we send to the backend.
// RegisterApiResponse defines the response we expect from the backend.
import type {
  RegisterRequest,
  RegisterApiResponse,
} from "../types/registerType";

// Create an asynchronous function to register a new user.
// RegisterRequest specifies the structure of the input data.
// Promise<RegisterApiResponse> specifies the expected return type.
export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterApiResponse> => {

  // Send a POST request to the registration API endpoint.
  // The request body contains the registration form data.
  // The generic type tells TypeScript the expected response structure.
  const response = await api.post<RegisterApiResponse>(
    "/auth/register",
    data
  );

  // Return the actual response data from the backend.
  // Axios stores the backend response body inside response.data.
  return response.data;
};
