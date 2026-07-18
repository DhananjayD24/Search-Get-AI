import axios from "axios";
import api from "./api";
import { UploadResponse } from "@/types/api";

export async function uploadPDF(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post<UploadResponse>(
      "/upload",
      formData
    );

    console.log("Upload Success:", response.status);
    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Upload Error:", error);

    if (axios.isAxiosError(error)) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Code:", error.code);
      console.log("Message:", error.message);
    }

    throw error;
  }
}