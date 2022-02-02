import { AmountDto } from './AmountDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceMetadataTransactionBodyBuilder } from './NamespaceMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class NamespaceMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly namespaceMetadataTransactionBody: NamespaceMetadataTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): NamespaceMetadataTransactionBuilder;
    static createNamespaceMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetNamespaceId: NamespaceIdDto, valueSizeDelta: number, value: Uint8Array): NamespaceMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetNamespaceId(): NamespaceIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): NamespaceMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
