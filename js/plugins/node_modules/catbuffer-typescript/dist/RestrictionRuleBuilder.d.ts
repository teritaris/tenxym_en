import { MosaicIdDto } from './MosaicIdDto';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { Serializer } from './Serializer';
export declare class RestrictionRuleBuilder implements Serializer {
    readonly referenceMosaicId: MosaicIdDto;
    readonly restrictionValue: number[];
    readonly restrictionType: MosaicRestrictionTypeDto;
    constructor(referenceMosaicId: MosaicIdDto, restrictionValue: number[], restrictionType: MosaicRestrictionTypeDto);
    static loadFromBinary(payload: Uint8Array): RestrictionRuleBuilder;
    static createRestrictionRuleBuilder(referenceMosaicId: MosaicIdDto, restrictionValue: number[], restrictionType: MosaicRestrictionTypeDto): RestrictionRuleBuilder;
    getReferenceMosaicId(): MosaicIdDto;
    getRestrictionValue(): number[];
    getRestrictionType(): MosaicRestrictionTypeDto;
    getSize(): number;
    serialize(): Uint8Array;
}
