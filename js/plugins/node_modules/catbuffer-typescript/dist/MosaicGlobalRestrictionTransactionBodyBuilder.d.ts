import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicGlobalRestrictionTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly referenceMosaicId: UnresolvedMosaicIdDto;
    readonly restrictionKey: number[];
    readonly previousRestrictionValue: number[];
    readonly newRestrictionValue: number[];
    readonly previousRestrictionType: MosaicRestrictionTypeDto;
    readonly newRestrictionType: MosaicRestrictionTypeDto;
    constructor(mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto);
    static loadFromBinary(payload: Uint8Array): MosaicGlobalRestrictionTransactionBodyBuilder;
    static createMosaicGlobalRestrictionTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto): MosaicGlobalRestrictionTransactionBodyBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getReferenceMosaicId(): UnresolvedMosaicIdDto;
    getRestrictionKey(): number[];
    getPreviousRestrictionValue(): number[];
    getNewRestrictionValue(): number[];
    getPreviousRestrictionType(): MosaicRestrictionTypeDto;
    getNewRestrictionType(): MosaicRestrictionTypeDto;
    getSize(): number;
    serialize(): Uint8Array;
}
