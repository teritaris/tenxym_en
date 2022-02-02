export interface Serializer {
    serialize(): Uint8Array;
    getSize(): number;
}
