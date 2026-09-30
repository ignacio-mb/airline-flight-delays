import { useState } from "react";
import { colors, input } from "../lib/styles";

export type ComboOption = { value: number; label: string; detail?: string };

type Props = {
  placeholder: string;
  query: string;
  onQueryChange: (query: string) => void;
  options: ComboOption[];
  selectedLabel: string | null;
  onSelect: (option: ComboOption) => void;
  isLoading: boolean;
};

// Searchable picker: the list opens on focus, before any typing; the raw id is
// what the caller stores.
export function Combobox({ placeholder, query, onQueryChange, options, selectedLabel, onSelect, isLoading }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input
        style={input}
        placeholder={selectedLabel ?? placeholder}
        value={open ? query : selectedLabel ?? ""}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {open ? (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: 260,
            overflowY: "auto",
            background: "white",
            border: `1px solid ${colors.border}`,
            borderRadius: 6,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {isLoading ? (
            <div style={{ padding: 10, color: colors.muted, fontSize: 13 }}>Loading…</div>
          ) : options.length === 0 ? (
            <div style={{ padding: 10, color: colors.muted, fontSize: 13 }}>No matches</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(option);
                  onQueryChange("");
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  border: "none",
                  background: "white",
                  cursor: "pointer",
                  font: "inherit",
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                {option.label}
                {option.detail ? (
                  <span style={{ color: colors.muted, fontSize: 12, marginLeft: 8 }}>{option.detail}</span>
                ) : null}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
