import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class AccountMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): AccountMetadataTransactionBuilder;
    static createAccountMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], valueSizeDelta: number, value: Uint8Array): AccountMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): AccountMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
