import type { CSSProperties } from "react";

export const colors = {
  page: "#f5f6f8",
  card: "#ffffff",
  border: "#e3e6ea",
  text: "#1f2937",
  muted: "#6b7280",
  brand: "#4D96FF",
  danger: "#b91c1c",
  success: "#15803d",
};

export const card: CSSProperties = {
  background: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: 10,
  padding: 20,
};

export const label: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: colors.text,
};

export const input: CSSProperties = {
  font: "inherit",
  fontWeight: 400,
  fontSize: 14,
  padding: "8px 10px",
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  background: "white",
  color: colors.text,
  boxSizing: "border-box",
  width: "100%",
};

export const button = (disabled: boolean): CSSProperties => ({
  font: "inherit",
  fontWeight: 600,
  padding: "9px 18px",
  border: "none",
  borderRadius: 6,
  background: disabled ? "#a9c8f5" : colors.brand,
  color: "white",
  cursor: disabled ? "default" : "pointer",
});

export const errorBox: CSSProperties = {
  whiteSpace: "pre-wrap",
  margin: 0,
  padding: 12,
  borderRadius: 6,
  background: "#fef2f2",
  color: colors.danger,
  fontSize: 13,
};
