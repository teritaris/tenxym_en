import { Serializer } from './Serializer';
export declare class MosaicIdDto implements Serializer {
    readonly mosaicId: number[];
    constructor(mosaicId: number[]);
    static loadFromBinary(payload: Uint8Array): MosaicIdDto;
    getMosaicId(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
