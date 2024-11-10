"use client"

import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastImpl,
  type ToastActionProps,
} from "@/components/ui/use-toast"

export type { Toast, ToastActionElement, ToastProps, ToastActionProps }

export const useToast = useToastImpl