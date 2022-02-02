import { AmountDto } from './AmountDto';
import { Serializer } from './Serializer';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class UnresolvedMosaicBuilder implements Serializer {
    readonly mosaicId: UnresolvedMosaicIdDto;
    readonly amount: AmountDto;
    constructor(mosaicId: UnresolvedMosaicIdDto, amount: AmountDto);
    static loadFromBinary(payload: Uint8Array): UnresolvedMosaicBuilder;
    static createUnresolvedMosaicBuilder(mosaicId: UnresolvedMosaicIdDto, amount: AmountDto): UnresolvedMosaicBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getAmount(): AmountDto;
    getSize(): number;
    serialize(): Uint8Array;
}
