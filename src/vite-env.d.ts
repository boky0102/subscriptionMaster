/// <reference types="vite/client" />

interface ImportMetaEnv {
     readonly VITE_SERVER_LINK: string;
}

interface ImportMeta {
     readonly env: ImportMetaEnv;
}
