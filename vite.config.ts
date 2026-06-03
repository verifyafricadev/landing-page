import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import { compression } from "vite-plugin-compression2";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;
// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    react(),
    // Gzip compression — widest server/CDN support
    compression({
      algorithm: 'gzip',
      include: /\.(js|css|html|json|svg|xml|txt)$/,
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
    // Brotli compression — better ratios, supported by all modern browsers
    compression({
      algorithm: 'brotliCompress',
      include: /\.(js|css|html|json|svg|xml|txt)$/,
      threshold: 1024,
      deleteOriginalAssets: false,
    }),
    AutoImport({
      imports: [
        {
          react: [
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: true,
    outDir: "out",
    // Use esbuild for fast, effective minification (default in Vite 5)
    minify: 'esbuild',
    // Warn when any individual chunk exceeds 500 KB (uncompressed)
    chunkSizeWarningLimit: 500,
    // Split CSS per chunk so only the CSS needed for the current route loads
    cssCodeSplit: true,
    // Inject <link rel="modulepreload"> for all entry chunks automatically
    modulePreload: {
      polyfill: true,
    },
    // Target modern browsers — smaller output, no legacy polyfills
    target: ['es2020', 'chrome87', 'firefox78', 'safari14'],
    rollupOptions: {
      output: {
        // Consistent asset naming for long-term caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        // Manual chunk splitting — vendor libs in separate long-lived cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/react-i18next/') || id.includes('node_modules/i18next/')) {
            return 'vendor-i18n';
          }
          if (id.includes('node_modules/framer-motion/') || id.includes('node_modules/motion/')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/')) {
            return 'vendor-misc';
          }
          // Split heavy mock data into its own chunk — never needed at initial render
          if (id.includes('/mocks/articleBodies')) return 'data-article-bodies';
          if (id.includes('/mocks/')) return 'data-mocks';
          // Split heavy page chunks so they don't inflate the main bundle
          if (id.includes('/pages/home/')) return 'page-home';
          if (id.includes('/pages/blog/')) return 'page-blog';
          if (id.includes('/pages/about/')) return 'page-about';
          if (id.includes('/pages/case-studies/')) return 'page-case-studies';
          if (id.includes('/pages/docs/')) return 'page-docs';
          if (id.includes('/pages/contact/')) return 'page-contact';
          if (id.includes('/pages/support/')) return 'page-support';
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
