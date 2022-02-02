import { AmountDto } from './AmountDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicSupplyChangeTransactionBodyBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly delta: AmountDto;
    readonly action: MosaicSupplyChangeActionDto;
    constructor(mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBodyBuilder;
    static createMosaicSupplyChangeTransactionBodyBuilder(mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): MosaicSupplyChangeTransactionBodyBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getDelta(): AmountDto;
    getAction(): MosaicSupplyChangeActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
