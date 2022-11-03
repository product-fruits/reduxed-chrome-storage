export enum StorageAreaName {
  local = 'local',
  sync = 'sync',
  session = 'session'
}

interface StorageChange {
  newValue?: any;
  oldValue?: any;
}

interface StorageChanges {
  [key: string]: StorageChange
}

export interface StorageListener {
  (changes: StorageChanges, area: StorageAreaName): void
}

export interface StorageAddListener {
  (listener: StorageListener): void;
}

export interface StorageData {
  [key: string]: any;
}

export type StorageGetCallback = (data: StorageData) => void;
export type StorageGetKeys = string | string[] | StorageData | null;

export interface StorageAreaQuotas {
  QUOTA_BYTES: number;
  QUOTA_BYTES_PER_ITEM?: number;
}

export interface StorageAreaCallbacked extends StorageAreaQuotas {
  get(callback: StorageGetCallback): void;
  get(keys: StorageGetKeys, callback: StorageGetCallback): void;
  set(data: StorageData, callback?: () => void): void;
  clear(): void;
}

export interface StorageAreaPromised extends StorageAreaQuotas {
  get(keys?: StorageGetKeys): Promise<StorageData>;
  set(data: StorageData): Promise<void>;
  clear(): void;
}

export interface ApisNamespace {
  storage: {
    onChanged: {
      addListener: StorageAddListener
    }
  },
  runtime: {
    lastError?: {
      message?: string;
    };
  }
}

export interface ChromeNamespace extends ApisNamespace {
  storage: {
    local: StorageAreaCallbacked,
    sync: StorageAreaCallbacked,
    session: StorageAreaCallbacked,
    onChanged: ApisNamespace['storage']['onChanged']
  }
}

export interface BrowserNamespace extends ApisNamespace {
  storage: {
    local: StorageAreaPromised,
    sync: StorageAreaPromised
    session: StorageAreaPromised,
    onChanged: ApisNamespace['storage']['onChanged']
  }
}
