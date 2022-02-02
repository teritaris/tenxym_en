import { AddressDto } from './AddressDto';
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class BalanceChangeReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    readonly targetAddress: AddressDto;
    constructor(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, targetAddress: AddressDto);
    static loadFromBinary(payload: Uint8Array): BalanceChangeReceiptBuilder;
    static createBalanceChangeReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, targetAddress: AddressDto): BalanceChangeReceiptBuilder;
    getMosaic(): MosaicBuilder;
    getTargetAddress(): AddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
