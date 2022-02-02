import { Serializer } from './Serializer';
export declare class PublicKeyDto implements Serializer {
    readonly publicKey: Uint8Array;
    constructor(publicKey: Uint8Array);
    static loadFromBinary(payload: Uint8Array): PublicKeyDto;
    getPublicKey(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
