// @see: http://eslint.cn
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 指定如何解析语法
  parser: "vue-eslint-parser",
  // 优先级低于 parse 的语法解析配置
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    jsxPragma: "Vue",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  // 继承某些已有的规则
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  /**
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    "no-undef": "off",
    "no-console": "off",
    "no-debugger": "off",
    "prettier/prettier": "off",
    "vue/no-reserved-component-names": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/no-v-html": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "any",
          normal: "any",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    // 多字组件名称
    "vue/multi-word-component-names": "off",
    // Vue.js风格指南(https://cn.vuejs.org/v2/style-guide/)
    // Vue组件排序
    "vue/order-in-components": [
      "warn",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "fetch",
          "asyncData",
          "data",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError"
        ]
      }
    ],
    // Vue属性排序
    "vue/attributes-order": [
      "warn",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT"
        ],
        alphabetical: true //字母顺序
      }
    ]
  }
};
