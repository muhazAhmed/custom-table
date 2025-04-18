import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useToast = (
  name: string,
  type: "success" | "error",
  duration?: number
) => {
  toast[type](name, {
    duration: duration ? duration : 3000,
  });
};