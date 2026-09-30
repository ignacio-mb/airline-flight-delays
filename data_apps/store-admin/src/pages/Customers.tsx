import { filter, useAction, useMetabaseQuery } from "@metabase/embedding-sdk-react/data-app";
import { useState, type FormEvent } from "react";
import { UpdateCustomer } from "../../actions/store.action";
import { CustomerDirectory, SourceValues } from "../../queries/store.query";
import { fromDateInput, toDateInput } from "../lib/format";
import { button, card, colors, errorBox, input, label } from "../lib/styles";

type Profile = {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  birthDate: string;
  source: string;
};

const people = CustomerDirectory.source.fields;

export function Customers() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const term = search.trim();
  const directory = useMetabaseQuery(CustomerDirectory, {
    filters: term ? [term.includes("@") ? filter(people.email, "contains", term) : filter(people.name, "contains", term)] : [],
    limit: 25,
  });
  const sources = useMetabaseQuery(SourceValues);

  const rows = directory.data?.rows ?? [];
  const selected = rows.find((row) => Number(row.id) === selectedId);
  const profile: Profile | null = selected
    ? {
        id: Number(selected.id),
        name: String(selected.name ?? ""),
        email: String(selected.email ?? ""),
        address: String(selected.address ?? ""),
        city: String(selected.city ?? ""),
        state: String(selected.state ?? ""),
        zip: String(selected.zip ?? ""),
        birthDate: toDateInput(selected.birth_date),
        source: String(selected.source ?? ""),
      }
    : null;
  const sourceOptions = (sources.data?.rows ?? []).map((row) => row.source).filter((v): v is string => typeof v === "string" && v !== "");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 360px) 1fr", gap: 20, alignItems: "start" }}>
      <section style={{ ...card, display: "flex", flexDirection: "column", gap: 12 }}>
        <input style={input} placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
        {directory.error ? <pre style={errorBox}>Could not load customers.</pre> : null}
        {directory.isLoading ? (
          <div style={{ color: colors.muted }}>Loading…</div>
        ) : rows.length === 0 ? (
          <div style={{ color: colors.muted }}>No customers match.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", maxHeight: 560, overflowY: "auto" }}>
            {rows.map((row) => {
              const id = Number(row.id);
              const active = id === selectedId;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedId(id)}
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: 6,
                    background: active ? "#EAF4FF" : "transparent",
                    cursor: "pointer",
                    font: "inherit",
                    color: colors.text,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{String(row.name ?? "Unnamed")}</div>
                  <div style={{ color: colors.muted, fontSize: 12 }}>
                    {String(row.email ?? "")} · {String(row.city ?? "")}, {String(row.state ?? "")}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {profile ? (
        <ProfileForm key={profile.id} profile={profile} sourceOptions={sourceOptions} onSaved={directory.refetch} />
      ) : (
        <section style={{ ...card, color: colors.muted }}>Pick a customer to edit their profile.</section>
      )}
    </div>
  );
}

function ProfileForm({ profile, sourceOptions, onSaved }: { profile: Profile; sourceOptions: string[]; onSaved: () => Promise<void> }) {
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const { execute, isExecuting, error, reset } = useAction(UpdateCustomer);
  const fieldErrors: Record<string, string | undefined> = (error?.data?.errors as Record<string, string> | undefined) ?? {};
  const set = (key: keyof Profile) => (e: { target: { value: string } }) => {
    setSaved(false);
    reset();
    setDraft({ ...draft, [key]: e.target.value });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(false);
    try {
      await execute({
        id: draft.id,
        name: draft.name,
        email: draft.email,
        address: draft.address,
        city: draft.city,
        state: draft.state,
        zip: draft.zip,
        birth_date: draft.birthDate ? fromDateInput(draft.birthDate) : undefined,
        source: draft.source,
      });
      await onSaved();
      setSaved(true);
    } catch {
      // shown from the hook's error state below
    }
  }

  const field = (key: keyof Profile, text: string, slug: string, type = "text") => (
    <label style={label}>
      {text}
      <input style={{ ...input, borderColor: fieldErrors[slug] ? colors.danger : undefined }} type={type} value={String(draft[key])} onChange={set(key)} />
      {fieldErrors[slug] ? <span role="alert" style={{ color: colors.danger, fontSize: 12 }}>{fieldErrors[slug]}</span> : null}
    </label>
  );

  return (
    <form style={{ ...card, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} onSubmit={onSubmit}>
      <h2 style={{ margin: 0, fontSize: 18, gridColumn: "1 / -1" }}>
        Customer #{profile.id}
      </h2>
      {field("name", "Name", "name")}
      {field("email", "Email", "email")}
      <div style={{ gridColumn: "1 / -1" }}>{field("address", "Address", "address")}</div>
      {field("city", "City", "city")}
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>{field("state", "State", "state")}</div>
        <div style={{ flex: 1 }}>{field("zip", "Zip", "zip")}</div>
      </div>
      {field("birthDate", "Birth date", "birth_date", "date")}
      <label style={label}>
        Source
        <select style={input} value={draft.source} onChange={set("source")}>
          {draft.source && !sourceOptions.includes(draft.source) ? <option value={draft.source}>{draft.source}</option> : null}
          {sourceOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 10 }}>
        {error ? <pre style={errorBox}>{error.data?.message ?? "The profile was not saved."}</pre> : null}
        {saved ? <div style={{ color: colors.success, fontSize: 14 }}>Profile saved.</div> : null}
        <div>
          <button type="submit" style={button(isExecuting)} disabled={isExecuting}>
            {isExecuting ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>
    </form>
  );
}
