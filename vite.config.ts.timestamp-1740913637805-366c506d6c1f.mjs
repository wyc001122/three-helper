// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import vue from "file:///C:/Users/49804/Desktop/three-helper/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vi_82ef4c1407e993f5a9f22d8b8f5cf8e6/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///C:/Users/49804/Desktop/three-helper/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.5.2/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwind from "file:///C:/Users/49804/Desktop/three-helper/node_modules/.pnpm/tailwindcss@3.4.17/node_modules/tailwindcss/lib/index.js";
import { defineConfig } from "file:///C:/Users/49804/Desktop/three-helper/node_modules/.pnpm/vite@5.4.14_@types+node@22._f007716127e5cb4cd15bc72dfcdbca92/node_modules/vite/dist/node/index.js";
import { codeInspectorPlugin } from "file:///C:/Users/49804/Desktop/three-helper/node_modules/.pnpm/code-inspector-plugin@0.20.1/node_modules/code-inspector-plugin/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\49804\\Desktop\\three-helper";
var __vite_injected_original_import_meta_url = "file:///C:/Users/49804/Desktop/three-helper/vite.config.ts";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue(), codeInspectorPlugin({
    bundler: "vite"
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    terserOptions: {
      format: {
        comments: false
      }
    },
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/main.ts"),
      name: "ThreeHelper",
      fileName: "ThreeHelper"
    },
    rollupOptions: {}
  },
  define: {
    "process.env": {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw0OTgwNFxcXFxEZXNrdG9wXFxcXHRocmVlLWhlbHBlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcNDk4MDRcXFxcRGVza3RvcFxcXFx0aHJlZS1oZWxwZXJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzQ5ODA0L0Rlc2t0b3AvdGhyZWUtaGVscGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY29kZUluc3BlY3RvclBsdWdpbiB9IGZyb20gJ2NvZGUtaW5zcGVjdG9yLXBsdWdpbic7XG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZCgpLCBhdXRvcHJlZml4ZXIoKV0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3Z1ZSgpLCBjb2RlSW5zcGVjdG9yUGx1Z2luKHtcbiAgICBidW5kbGVyOiAndml0ZScsXG4gIH0pLF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgZm9ybWF0OiB7XG4gICAgICAgIGNvbW1lbnRzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9tYWluLnRzJyksXG4gICAgICBuYW1lOiAnVGhyZWVIZWxwZXInLFxuICAgICAgZmlsZU5hbWU6ICdUaHJlZUhlbHBlcicsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgfSxcblxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQXFTLFNBQVMsZUFBZSxXQUFXO0FBQ3hVLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsMkJBQTJCO0FBTnBDLElBQU0sbUNBQW1DO0FBQThJLElBQU0sMkNBQTJDO0FBUXhPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLG9CQUFvQjtBQUFBLElBQ25DLFNBQVM7QUFBQSxFQUNYLENBQUMsQ0FBRTtBQUFBLEVBQ0gsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLElBQ0EsZUFBZSxDQUNmO0FBQUEsRUFFRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUEsRUFDbEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
