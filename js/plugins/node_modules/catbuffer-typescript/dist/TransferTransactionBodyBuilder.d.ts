import { Serializer } from './Serializer';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class TransferTransactionBodyBuilder implements Serializer {
    readonly recipientAddress: UnresolvedAddressDto;
    readonly mosaics: UnresolvedMosaicBuilder[];
    readonly message: Uint8Array;
    constructor(recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array);
    static loadFromBinary(payload: Uint8Array): TransferTransactionBodyBuilder;
    static createTransferTransactionBodyBuilder(recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): TransferTransactionBodyBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getMosaics(): UnresolvedMosaicBuilder[];
    getMessage(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
