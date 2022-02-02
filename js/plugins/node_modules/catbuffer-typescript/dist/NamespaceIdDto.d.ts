import { Serializer } from './Serializer';
export declare class NamespaceIdDto implements Serializer {
    readonly namespaceId: number[];
    constructor(namespaceId: number[]);
    static loadFromBinary(payload: Uint8Array): NamespaceIdDto;
    getNamespaceId(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
