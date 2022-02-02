import { AddressDto } from './AddressDto';
import { ReceiptSourceBuilder } from './ReceiptSourceBuilder';
import { Serializer } from './Serializer';
export declare class AddressResolutionEntryBuilder implements Serializer {
    readonly source: ReceiptSourceBuilder;
    readonly resolved: AddressDto;
    constructor(source: ReceiptSourceBuilder, resolved: AddressDto);
    static loadFromBinary(payload: Uint8Array): AddressResolutionEntryBuilder;
    static createAddressResolutionEntryBuilder(source: ReceiptSourceBuilder, resolved: AddressDto): AddressResolutionEntryBuilder;
    getSource(): ReceiptSourceBuilder;
    getResolved(): AddressDto;
    getSize(): number;
    serialize(): Uint8Array;
}
