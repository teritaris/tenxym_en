import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class TransferTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly transferTransactionBody: TransferTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array);
    static loadFromBinary(payload: Uint8Array): TransferTransactionBuilder;
    static createTransferTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): TransferTransactionBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getMosaics(): UnresolvedMosaicBuilder[];
    getMessage(): Uint8Array;
    getSize(): number;
    getBody(): TransferTransactionBodyBuilder;
    serialize(): Uint8Array;
}
