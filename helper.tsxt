const websites = [
  {
    title: "ShopZone",
    slug: "shopzone",
    
    components: {
      navbar: {
        _id: "main-navbar",  // ✅ Give it an ID
        table: {},
        modal: {},
        uiSchema: { /* navbar widgets */ },
        styles: { /* navbar styles */ },
        triggers: []
      },
      
      footer: {
        _id: "main-footer",  // ✅ Give it an ID
        table: {},
        modal: {},
        uiSchema: { /* footer widgets */ },
        styles: { /* footer styles */ },
        triggers: []
      }
    },
    
    pages: {
      login: {
        title: "Login",
        components: {
          navbar: { $ref: "main-navbar" },  // ✅ Reference
          sidebar: { styles: { display: "none" } },
          main: { /* login content */ },
          footer: { $ref: "main-footer" }  // ✅ Reference
        }
      },
      
      signup: {
        title: "Sign Up",
        components: {
          navbar: { $ref: "main-navbar" },  // ✅ Reference
          sidebar: { styles: { display: "none" } },
          main: { /* signup content */ },
          footer: { $ref: "main-footer" }  // ✅ Reference
        }
      }
    }
  }
];