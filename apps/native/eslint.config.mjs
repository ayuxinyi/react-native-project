import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";

export default defineConfig([
  {
    ignores: ["dist/**", ".expo/**", "node_modules/**"],
  },

  expoConfig,
  {
    // NOTE:
    // eslint-plugin-react 在 ESLint 10 下有概率在版本 detect 阶段崩溃
    // （内部会依赖 context.getFilename()）。这里显式指定版本以跳过 detect。
    settings: {
      react: {
        version: "19.2",
      },
    },
  },
]);
