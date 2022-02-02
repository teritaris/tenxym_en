import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicAddressRestrictionTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly restrictionKey: number[];
    readonly previousRestrictionValue: number[];
    readonly newRestrictionValue: number[];
    readonly targetAddress: UnresolvedAddressDto;
    constructor(mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBodyBuilder;
    static createMosaicAddressRestrictionTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto): MosaicAddressRestrictionTransactionBodyBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getRestrictionKey(): number[];
    getPreviousRestrictionValue(): number[];
    getNewRestrictionValue(): number[];
    getTargetAddress(): UnresolvedAddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
