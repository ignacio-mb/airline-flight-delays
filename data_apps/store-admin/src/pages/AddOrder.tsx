import { StaticQuestion } from "@metabase/embedding-sdk-react";
import {
  filter,
  useAction,
  useMetabaseQuery,
  useMetabaseQueryObject,
} from "@metabase/embedding-sdk-react/data-app";
import { useMemo, useState, type FormEvent } from "react";
import { CreateOrder } from "../../actions/store.action";
import {
  CustomerDirectory,
  CustomerStates,
  LatestOrderId,
  ProductCatalog,
  RecentOrders,
  TaxBaseByCustomer,
} from "../../queries/store.query";
import { Combobox, type ComboOption } from "../components/Combobox";
import { round, usd } from "../lib/format";
import { button, card, colors, errorBox, input, label } from "../lib/styles";

type Customer = { id: number; name: string; state: string };
type Product = { id: number; title: string; price: number };

const people = CustomerDirectory.source.fields;

export function AddOrder() {
  const [customerQuery, setCustomerQuery] = useState("");
  const [productQuery, setProductQuery] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [discount, setDiscount] = useState("0");
  const [recentKey, setRecentKey] = useState(0);
  const [createdId, setCreatedId] = useState<number | null>(null);

  const search = customerQuery.trim();
  const customers = useMetabaseQuery(CustomerDirectory, {
    filters: search
      ? [search.includes("@") ? filter(people.email, "contains", search) : filter(people.name, "contains", search)]
      : [],
    limit: 20,
  });
  const products = useMetabaseQuery(ProductCatalog);
  const latestId = useMetabaseQuery(LatestOrderId);
  const taxBase = useMetabaseQuery(TaxBaseByCustomer);
  const stateCustomers = useMetabaseQuery(CustomerStates, {
    filters: customer ? [filter(CustomerStates.source.fields.state, "=", customer.state)] : [],
    enabled: customer != null,
  });
  const { query: recentQuery, error: recentError } = useMetabaseQueryObject(RecentOrders);
  const { execute, isExecuting, error, reset } = useAction(CreateOrder);

  const customerOptions: ComboOption[] = (customers.data?.rows ?? []).map((row) => ({
    value: Number(row.id),
    label: String(row.name ?? "Unnamed"),
    detail: `${row.email ?? ""} · ${row.city ?? ""}, ${row.state ?? ""}`,
  }));

  const productOptions: ComboOption[] = (products.data?.rows ?? [])
    .filter((row) => String(row.title ?? "").toLowerCase().includes(productQuery.trim().toLowerCase()))
    .map((row) => ({
      value: Number(row.id),
      label: String(row.title ?? "Untitled"),
      detail: `${row.category ?? ""} · ${usd(Number(row.price))}`,
    }));

  // State tax rate = Tax collected / Subtotal over past orders of the state's customers (D3).
  const taxRate = useMemo(() => {
    if (!customer || !stateCustomers.data || !taxBase.data) return null;
    const ids = new Set(stateCustomers.data.rows.map((row) => Number(row.id)));
    let tax = 0;
    let subtotal = 0;
    for (const row of taxBase.data.rows) {
      if (ids.has(Number(row.user_id))) {
        tax += Number(row.tax ?? 0);
        subtotal += Number(row.subtotal ?? 0);
      }
    }
    return subtotal > 0 ? round(tax / subtotal, 4) : null;
  }, [customer, stateCustomers.data, taxBase.data]);

  const maxId = latestId.data?.rawRows?.[0]?.[0];
  const nextId = maxId == null ? null : Number(maxId) + 1;
  const qty = Number(quantity);
  const disc = Number(discount || 0);
  const gross = product ? product.price * qty : null;
  const subtotal = gross == null ? null : round(gross, 2);
  const tax = gross == null || taxRate == null ? null : round(gross * taxRate, 2);
  const total = gross == null || taxRate == null ? null : round(gross * (1 + taxRate) - disc, 2);
  const rateLoading = customer != null && (stateCustomers.isLoading || taxBase.isLoading);

  const ready =
    customer != null && product != null && nextId != null && taxRate != null &&
    Number.isInteger(qty) && qty > 0 && disc >= 0 && total != null && total >= 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ready || !customer || !product || nextId == null || subtotal == null || tax == null || total == null) return;
    setCreatedId(null);
    try {
      await execute({
        id: nextId,
        user_id: customer.id,
        product_id: product.id,
        quantity: qty,
        subtotal,
        tax,
        discount: disc > 0 ? round(disc, 2) : undefined,
        total,
        created_at: new Date(),
      });
      setCreatedId(nextId);
      setProduct(null);
      setQuantity("1");
      setDiscount("0");
      await Promise.all([latestId.refetch(), taxBase.refetch()]);
      setRecentKey((k) => k + 1);
    } catch {
      // shown from the hook's error state below
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(320px, 420px) 1fr", gap: 20, alignItems: "start" }}>
      <form style={{ ...card, display: "flex", flexDirection: "column", gap: 14 }} onSubmit={onSubmit} onChange={() => reset()}>
        <h2 style={{ margin: 0, fontSize: 18 }}>New order</h2>
        <label style={label}>
          Customer
          <Combobox
            placeholder="Search by name or email"
            query={customerQuery}
            onQueryChange={setCustomerQuery}
            options={customerOptions}
            isLoading={customers.isLoading}
            selectedLabel={customer ? `${customer.name} (${customer.state})` : null}
            onSelect={(option) => {
              const row = customers.data?.rows.find((r) => Number(r.id) === option.value);
              if (row) setCustomer({ id: option.value, name: String(row.name ?? ""), state: String(row.state ?? "") });
            }}
          />
        </label>
        <label style={label}>
          Product
          <Combobox
            placeholder="Search products"
            query={productQuery}
            onQueryChange={setProductQuery}
            options={productOptions}
            isLoading={products.isLoading}
            selectedLabel={product ? `${product.title} · ${usd(product.price)}` : null}
            onSelect={(option) => {
              const row = products.data?.rows.find((r) => Number(r.id) === option.value);
              if (row) setProduct({ id: option.value, title: String(row.title ?? ""), price: Number(row.price) });
            }}
          />
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ ...label, flex: 1 }}>
            Quantity
            <input style={input} type="number" min={1} step={1} required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </label>
          <label style={{ ...label, flex: 1 }}>
            Discount (USD)
            <input style={input} type="number" min={0} step="0.01" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </label>
        </div>

        <div style={{ background: colors.page, borderRadius: 8, padding: 12, fontSize: 14, display: "grid", gridTemplateColumns: "1fr auto", rowGap: 6 }}>
          <span style={{ color: colors.muted }}>Subtotal (price × quantity)</span><span>{usd(subtotal)}</span>
          <span style={{ color: colors.muted }}>
            Tax {rateLoading ? "(loading rate…)" : taxRate != null && customer ? `(${customer.state} ${(taxRate * 100).toFixed(2)}%)` : customer ? "(no past orders in this state)" : ""}
          </span><span>{usd(tax)}</span>
          <span style={{ color: colors.muted }}>Discount</span><span>{disc > 0 ? `− ${usd(disc)}` : usd(0)}</span>
          <strong>Total</strong><strong>{usd(total)}</strong>
          <span style={{ color: colors.muted }}>Order number</span><span>{nextId ?? "—"}</span>
        </div>

        {error ? <pre style={errorBox}>{error.data?.message ?? "The order was not saved."}</pre> : null}
        {createdId != null && !error ? (
          <div style={{ color: colors.success, fontSize: 14 }}>Order {createdId} saved.</div>
        ) : null}
        <button type="submit" style={button(!ready || isExecuting)} disabled={!ready || isExecuting}>
          {isExecuting ? "Saving…" : "Add order"}
        </button>
      </form>

      <section style={card}>
        <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>Latest orders</h2>
        {recentError ? (
          <pre style={errorBox}>Could not load orders.</pre>
        ) : recentQuery ? (
          <StaticQuestion key={recentKey} card={{ query: recentQuery }} height={520} width="100%" />
        ) : (
          <div style={{ color: colors.muted }}>Loading…</div>
        )}
      </section>
    </div>
  );
}
