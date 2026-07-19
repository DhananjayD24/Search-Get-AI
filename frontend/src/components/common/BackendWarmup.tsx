"use client";

import { useEffect } from "react";
import api from "@/services/api";

/** Sends a background request when the site opens to wake a sleeping backend. */
export default function BackendWarmup() {
  useEffect(() => {
    const warmup = async () =>{
      try{
        const response = await api.get("/health");
        console.log("Backend warmup response:", response.status);
      } catch (error) {
        console.error("Backend warmup failed:", error);
      }
    };
    warmup();
  }, []);

  return null;
}
