import { defineAction } from "@metabase/embedding-sdk-react/data-app";
import schema from "../src/metabase.data";

export const CreateOrder = defineAction({
    action: schema.models.storeOrders.actions.createOrder,
    copiedActionId: 5
});

export const UpdateCustomer = defineAction({
    action: schema.models.storeCustomers.actions.updateCustomer,
    copiedActionId: 6
});
