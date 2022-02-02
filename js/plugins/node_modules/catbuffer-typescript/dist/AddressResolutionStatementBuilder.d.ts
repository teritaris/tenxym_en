import { AddressResolutionEntryBuilder } from './AddressResolutionEntryBuilder';
import { ReceiptBuilder } from './ReceiptBuilder';
import { ReceiptTypeDto } from './ReceiptTypeDto';
import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class AddressResolutionStatementBuilder extends ReceiptBuilder implements Serializer {
    readonly unresolved: UnresolvedAddressDto;
    readonly resolutionEntries: AddressResolutionEntryBuilder[];
    constructor(version: number, type: ReceiptTypeDto, unresolved: UnresolvedAddressDto, resolutionEntries: AddressResolutionEntryBuilder[]);
    static loadFromBinary(payload: Uint8Array): AddressResolutionStatementBuilder;
    static createAddressResolutionStatementBuilder(version: number, type: ReceiptTypeDto, unresolved: UnresolvedAddressDto, resolutionEntries: AddressResolutionEntryBuilder[]): AddressResolutionStatementBuilder;
    getUnresolved(): UnresolvedAddressDto;
    getResolutionEntries(): AddressResolutionEntryBuilder[];
    getSize(): number;
    serialize(): Uint8Array;
}
