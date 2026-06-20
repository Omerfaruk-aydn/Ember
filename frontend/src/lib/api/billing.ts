import { apiClient } from "./client";

export const billingApi = {
  getPlans: () =>
    apiClient.get("/billing/plans"),

  getSubscription: () =>
    apiClient.get("/billing/subscription"),

  getUsage: () =>
    apiClient.get("/billing/usage"),

  createCheckout: (planId: string) =>
    apiClient.post("/billing/checkout", { plan_id: planId }),

  getInvoices: () =>
    apiClient.get("/billing/invoices"),

  getPaymentMethods: () =>
    apiClient.get("/billing/payment-methods"),
};
