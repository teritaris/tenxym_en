import { Serializer } from './Serializer';
export declare class BlockFeeMultiplierDto implements Serializer {
    readonly blockFeeMultiplier: number;
    constructor(blockFeeMultiplier: number);
    static loadFromBinary(payload: Uint8Array): BlockFeeMultiplierDto;
    getBlockFeeMultiplier(): number;
    getSize(): number;
    serialize(): Uint8Array;
}
