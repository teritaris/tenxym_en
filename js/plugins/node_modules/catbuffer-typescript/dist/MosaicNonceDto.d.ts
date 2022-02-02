import { Serializer } from './Serializer';
export declare class MosaicNonceDto implements Serializer {
    readonly mosaicNonce: number;
    constructor(mosaicNonce: number);
    static loadFromBinary(payload: Uint8Array): MosaicNonceDto;
    getMosaicNonce(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
