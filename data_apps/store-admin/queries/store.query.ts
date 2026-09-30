import {
  aggregations,
  breakout,
  defineQuery,
  orderBy,
} from "@metabase/embedding-sdk-react/data-app";
import schema from "../src/metabase.data";

const orders = schema.tables.orders;
const people = schema.tables.people;
const products = schema.tables.products;

// Customers with the profile fields the app shows and edits (D6). Password is
// a sensitive column and is not in the schema.
export const CustomerDirectory = defineQuery({
    source: people,
    fields: [
        people.fields.id,
        people.fields.name,
        people.fields.email,
        people.fields.address,
        people.fields.city,
        people.fields.state,
        people.fields.zip,
        people.fields.birthDate,
        people.fields.source,
    ],
    orderBys: [orderBy(people.fields.name, "asc")],
    savedQuestionSourceId: 132
});

// Customer ids and states, narrowed at runtime to one state for the tax rate.
export const CustomerStates = defineQuery({
    source: people,
    fields: [people.fields.id, people.fields.state],
    savedQuestionSourceId: 133
});

// Values offered in the profile form's Source field.
export const SourceValues = defineQuery({
    source: people,
    aggregations: [aggregations.count()],
    breakouts: [breakout(people.fields.source)],
    savedQuestionSourceId: 134
});

export const ProductCatalog = defineQuery({
    source: products,
    fields: [
        products.fields.id,
        products.fields.title,
        products.fields.category,
        products.fields.vendor,
        products.fields.price,
    ],
    orderBys: [orderBy(products.fields.title, "asc")],
    savedQuestionSourceId: 135
});

// The orders table has no id generator: new orders take the next number (D3).
export const LatestOrderId = defineQuery({
    source: orders,
    aggregations: [aggregations.max(orders.fields.id)],
    savedQuestionSourceId: 136
});

// Curated Tax collected and Subtotal measures per customer; the app sums them
// over the customers of one state to get that state's tax rate (D3).
export const TaxBaseByCustomer = defineQuery({
    source: orders,
    aggregations: [orders.measures.taxCollected, orders.measures.subtotal],
    breakouts: [breakout(orders.fields.userId)],
    savedQuestionSourceId: 137
});

export const RecentOrders = defineQuery({
    source: orders,
    orderBys: [orderBy(orders.fields.id, "desc")],
    limit: 25,
    savedQuestionSourceId: 138
});
