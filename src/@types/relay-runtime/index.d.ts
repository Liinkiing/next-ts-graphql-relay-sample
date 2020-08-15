import 'relay-runtime'

declare module 'relay-runtime/lib/store/RelayStoreTypes' {
  export interface Record {
    copyFieldsFrom(sourceRecord: Record): void
    getDataID(): string
    getLinkedRecord(name: string, arguments?: any): Record | null
    getLinkedRecords(name: string, arguments?: any): Array<Record | null> | null
    getOrCreateLinkedRecord(name: string, typeName: string, arguments?: any): Record
    getType(): string
    getValue(name: string, arguments?: any): mixed
    setLinkedRecord(record: Record, name: string, arguments?: any): Record
    setLinkedRecords(records: Array<Record | null>, name: string, arguments?: any): Record
    setValue(value: mixed, name: string, arguments?: any): Record
    invalidateRecord(): void
  }
}
