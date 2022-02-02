import { AmountDto } from './AmountDto';
import { MosaicIdDto } from './MosaicIdDto';
import { Serializer } from './Serializer';
export declare class MosaicBuilder implements Serializer {
    readonly mosaicId: MosaicIdDto;
    readonly amount: AmountDto;
    constructor(mosaicId: MosaicIdDto, amount: AmountDto);
    static loadFromBinary(payload: Uint8Array): MosaicBuilder;
    static createMosaicBuilder(mosaicId: MosaicIdDto, amount: AmountDto): MosaicBuilder;
    getMosaicId(): MosaicIdDto;
    getAmount(): AmountDto;
    getSize(): number;
    serialize(): Uint8Array;
}
