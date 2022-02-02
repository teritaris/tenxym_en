import { AddressDto } from './AddressDto';
import { MosaicBuilder } from './MosaicBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
export declare class BalanceTransferReceiptBuilder extends ReceiptBuilder implements Serializer {
    readonly mosaic: MosaicBuilder;
    readonly senderAddress: AddressDto;
    readonly recipientAddress: AddressDto;
    constructor(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, senderAddress: AddressDto, recipientAddress: AddressDto);
    static loadFromBinary(payload: Uint8Array): BalanceTransferReceiptBuilder;
    static createBalanceTransferReceiptBuilder(version: number, type: ReceiptTypeDto, mosaic: MosaicBuilder, senderAddress: AddressDto, recipientAddress: AddressDto): BalanceTransferReceiptBuilder;
    getMosaic(): MosaicBuilder;
    getSenderAddress(): AddressDto;
    getRecipientAddress(): AddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
