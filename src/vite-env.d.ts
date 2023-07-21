/// <reference types="vite/client" />
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'react/jsx-runtime' {
  export default any
}
