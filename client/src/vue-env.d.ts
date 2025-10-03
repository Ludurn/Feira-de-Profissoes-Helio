declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly VUE_APP_API_URL: string
        }
    }
}

export {}