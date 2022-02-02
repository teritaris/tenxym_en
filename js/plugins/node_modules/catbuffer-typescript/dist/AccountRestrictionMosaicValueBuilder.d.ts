import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export declare class AccountRestrictionMosaicValueBuilder implements Serializer {
    readonly restrictionValues: MosaicIdDto[];
    constructor(restrictionValues: MosaicIdDto[]);
    static loadFromBinary(payload: Uint8Array): AccountRestrictionMosaicValueBuilder;
    static createAccountRestrictionMosaicValueBuilder(restrictionValues: MosaicIdDto[]): AccountRestrictionMosaicValueBuilder;
    getRestrictionValues(): MosaicIdDto[];
    getSize(): number;
    serialize(): Uint8Array;
}
