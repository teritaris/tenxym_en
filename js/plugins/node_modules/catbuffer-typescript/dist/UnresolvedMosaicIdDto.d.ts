import { Serializer } from './Serializer';
export declare class UnresolvedMosaicIdDto implements Serializer {
    readonly unresolvedMosaicId: number[];
    constructor(unresolvedMosaicId: number[]);
    static loadFromBinary(payload: Uint8Array): UnresolvedMosaicIdDto;
    getUnresolvedMosaicId(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
