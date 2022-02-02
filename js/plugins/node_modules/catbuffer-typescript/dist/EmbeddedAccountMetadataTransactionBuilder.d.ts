import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountMetadataTransactionBuilder;
    static createEmbeddedAccountMetadataTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array): EmbeddedAccountMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): AccountMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
