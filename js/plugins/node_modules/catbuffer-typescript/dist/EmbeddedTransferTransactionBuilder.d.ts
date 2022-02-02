import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { TransferTransactionBodyBuilder } from './TransferTransactionBodyBuilder';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly transferTransactionBody: TransferTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedTransferTransactionBuilder;
    static createEmbeddedTransferTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, recipientAddress: UnresolvedAddressDto, mosaics: UnresolvedMosaicBuilder[], message: Uint8Array): EmbeddedTransferTransactionBuilder;
    getRecipientAddress(): UnresolvedAddressDto;
    getMosaics(): UnresolvedMosaicBuilder[];
    getMessage(): Uint8Array;
    getSize(): number;
    getBody(): TransferTransactionBodyBuilder;
    serialize(): Uint8Array;
}
