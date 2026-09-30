import { useState } from "react";
import { colors } from "./lib/styles";
import { AddOrder } from "./pages/AddOrder";
import { Customers } from "./pages/Customers";

const TABS = [
  { id: "orders", label: "Add order" },
  { id: "customers", label: "Customers" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function App() {
  const [active, setActive] = useState<TabId>(TABS[0].id);

  return (
    <div style={{ minHeight: "100vh", boxSizing: "border-box", padding: 24, background: colors.page, color: colors.text, fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif" }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Store Admin</h1>
        <nav style={{ display: "flex", gap: 4 }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              style={{
                font: "inherit",
                fontSize: 14,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: active === tab.id ? colors.brand : "transparent",
                color: active === tab.id ? "white" : colors.muted,
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      {active === "orders" ? <AddOrder /> : <Customers />}
    </div>
  );
}
