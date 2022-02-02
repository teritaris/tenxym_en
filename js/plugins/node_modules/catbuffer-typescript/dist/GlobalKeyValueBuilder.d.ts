import { MosaicRestrictionKeyDto } from './MosaicRestrictionKeyDto';
import { RestrictionRuleBuilder } from './RestrictionRuleBuilder';
import { Serializer } from './Serializer';
export declare class GlobalKeyValueBuilder implements Serializer {
    readonly key: MosaicRestrictionKeyDto;
    readonly restrictionRule: RestrictionRuleBuilder;
    constructor(key: MosaicRestrictionKeyDto, restrictionRule: RestrictionRuleBuilder);
    static loadFromBinary(payload: Uint8Array): GlobalKeyValueBuilder;
    static createGlobalKeyValueBuilder(key: MosaicRestrictionKeyDto, restrictionRule: RestrictionRuleBuilder): GlobalKeyValueBuilder;
    getKey(): MosaicRestrictionKeyDto;
    getRestrictionRule(): RestrictionRuleBuilder;
    getSize(): number;
    serialize(): Uint8Array;
}
