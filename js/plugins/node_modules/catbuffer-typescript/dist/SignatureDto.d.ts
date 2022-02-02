import { Serializer } from './Serializer';
export declare class SignatureDto implements Serializer {
    readonly signature: Uint8Array;
    constructor(signature: Uint8Array);
    static loadFromBinary(payload: Uint8Array): SignatureDto;
    getSignature(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
