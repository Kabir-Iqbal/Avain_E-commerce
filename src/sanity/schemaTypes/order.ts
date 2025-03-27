import { defineField, defineType } from "sanity";

export const order = defineType({
    name: "order",
    title: "Order",
    type: "document",
    fields: [
        defineField({
            name: "orderId",
            title: "Order ID",
            type: "string",
        }),
        defineField({
            name: "userId",
            title: "User ID",
            type: "string",
        }),
        defineField({
            name: "userEmail",
            title: "Customer Email",
            type: "string",
        }),
        defineField({
            name: "userName",
            title: "Customer Name",
            type: "string",
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "string",
        }),
        defineField({
            name: "amount",
            title: "Amount",
            type: "number",
        }),
        defineField({
            name: "items",
            title: "Ordered Items",
            type: "array",
            of: [
                {
                    type: "object",   // ✅ Reference کی بجائے مکمل Object Store کرو
                    fields: [
                        defineField({
                            name: "name",
                            title: "Product Name",
                            type: "string",
                        }),
                        defineField({
                            name: "price",
                            title: "Product Price",
                            type: "number",
                        }),
                        defineField({
                            name: "image",
                            title: "Product Image",
                            type: "url",
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity",
                            type: "number",
                        })
                    ]
                }
            ]
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string"
        }),
    ]
})