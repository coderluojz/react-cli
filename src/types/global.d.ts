declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test'
      BASE_ENV: string
    }
  }
}

export { };
