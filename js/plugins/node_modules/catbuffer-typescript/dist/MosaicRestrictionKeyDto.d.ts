import { Serializer } from './Serializer';
export declare class MosaicRestrictionKeyDto implements Serializer {
    readonly mosaicRestrictionKey: number[];
    constructor(mosaicRestrictionKey: number[]);
    static loadFromBinary(payload: Uint8Array): MosaicRestrictionKeyDto;
    getMosaicRestrictionKey(): number[];
    getSize(): number;
    serialize(): Uint8Array;
}
