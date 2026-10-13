// Manual payment details shown to students. The QRIS is the static GoPay
// Merchant code (scan, type the exact amount); an admin checks every proof
// by hand on /admin/material-orders.

export const QRIS = {
  image: "/payments/qris-refa-learn.jpg",
  merchant: "REGA RIZKAN AZIZAN, DIGITAL & KREATIF",
  nmid: "ID1026529060620",
};

/** Short, human-friendly order code for payment notes and support chats. */
export function orderCode(orderId: string): string {
  return `RL-${orderId.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}
