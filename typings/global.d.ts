/* 环境变量 */
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production'
        BASE_ENV: 'development' | 'production' | 'pre' | 'test'
      }
    }
  }
}

/* 样式 */
declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

/* 图片资源 */
declare module '*.svg' {
  const ref: string
  export default ref
}

declare module '*.png' {
  const ref: string
  export default ref
}

declare module '*.jpg' {
  const ref: string
  export default ref
}

declare module '*.jpeg' {
  const ref: string
  export default ref
}

declare module '*.gif' {
  const ref: string
  export default ref
}

declare module '*.bmp' {
  const ref: string
  export default ref
}
