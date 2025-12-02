// In demo.js - Simplified structure

pages: {
  categories: {
    title: "Product Categories",
    components: {
      main: {
        uiSchema: {
          hero: {
            "ui:widget": "hero",
            "ui:title": "Shop by Category 🏷️",
          },
          
          // âœ… TABLE WIDGET - Using API data
          productsTable: {
            "ui:widget": "dataTable",
            "ui:apiKey": "products.api", // âœ… Links to API config
            "ui:title": "All Products",
            "ui:showSearch": true,
            "ui:showPagination": true,
            "ui:pageSize": 10,
            "ui:columns": [
              { title: "Product", dataIndex: "title" },
              { title: "Price", dataIndex: "price" },
              { title: "Category", dataIndex: "category" },
            ],
            "ui:onRowClick": {
              action: "openModal",
              actionParams: { modal: "productDetail" }
            },
            "ui:styles": {
              marginBottom: "40px",
            }
          },
          
          // âœ… MODAL WIDGET - Separate from table
          productModal: {
            "ui:widget": "modalContainer",
            "ui:id": "productDetail",
            "ui:title": "{{data.selectedItem.title}}",
            "ui:content": {
              productImage: {
                "ui:widget": "image",
                "ui:src": "{{data.selectedItem.image}}",
                "ui:styles": {
                  maxHeight: "300px",
                  objectFit: "contain",
                }
              },
              productDescription: {
                "ui:widget": "paragraph",
                "ui:text": "{{data.selectedItem.description}}",
              },
              priceTag: {
                "ui:widget": "text",
                "ui:content": "${{data.selectedItem.price}}",
                "ui:styles": {
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#667eea",
                }
              },
              quantityForm: {
                "ui:widget": "formContainer",
                "ui:fields": [
                  {
                    "ui:widget": "inputField",
                    "ui:name": "quantity",
                    "ui:type": "number",
                    "ui:label": "Quantity",
                    "ui:placeholder": "1",
                  }
                ],
              }
            },
            "ui:actions": [
              {
                label: "Add to Cart",
                action: "api",
                actionParams: { apiKey: "cart.add" },
                variant: "primary",
                styles: {
                  width: "100%",
                  padding: "14px",
                  background: "#667eea",
                  color: "white",
                  borderRadius: "8px",
                }
              }
            ]
          }
        },
        triggers: [
          { event: "load", source: "products.api" } // âœ… Fetch data on load
        ]
      }
    }
  }
}