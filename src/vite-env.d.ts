/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_STORAGE_ACCOUNT?: string;
  readonly VITE_AZURE_STORAGE_CONNECTION_STRING?: string;
  readonly VITE_AZURE_STORAGE_CONTAINER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
