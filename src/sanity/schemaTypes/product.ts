import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
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
            type : "url",
        })
    ]
});
