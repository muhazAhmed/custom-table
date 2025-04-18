import { apiConfigProps } from "@/lib/props";
import { useToast } from "@/lib/utils";
import axios from "axios";
const DB_CONNECTION = import.meta.env.VITE_API_URI;

const APIErrorResponse = (error: any) => {
  if (error?.status === 400 || error?.status === 403) {
    return useToast(error?.response?.data?.message, "error");
  } else if (error?.code === "ERR_NETWORK")
    return useToast("Server Under Maintenance", "error");
  else {
    console.log(error);
    return useToast("Something went wrong", "error");
  }
};

export const PostMethodAPI = async ({
  endpoint,
  payload,
  loading,
}: apiConfigProps) => {
  try {
    loading(true);
    const response = await axios.post(`${DB_CONNECTION}${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.status === 200 || response?.status === 201) {
      useToast(response?.data?.message || "Success", "success");

      return response?.data;
    }
  } catch (error) {
    return APIErrorResponse(error);
  } finally {
    loading(false);
  }
};

export const GetMethodAPI = async ({ endpoint, loading }: apiConfigProps) => {
  try {
    loading(true);
    const response = await axios.get(`${DB_CONNECTION}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.status === 200 || response?.status === 201) {
      response?.data?.message && useToast(response?.data?.message, "success");
      return response?.data;
    }
  } catch (error) {
    return APIErrorResponse(error);
  } finally {
    loading(false);
  }
};

export const PutMethodAPI = async ({
  endpoint,
  payload,
  loading,
}: apiConfigProps) => {
  try {
    loading(true);
    const response = await axios.put(`${DB_CONNECTION}${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response?.status === 200 || response?.status === 201) {
      useToast(response?.data?.message || "Success", "success");

      return response?.data;
    }
  } catch (error) {
    return APIErrorResponse(error);
  } finally {
    loading(false);
  }
};
