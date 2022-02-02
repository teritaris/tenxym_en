import { AddressAliasTransactionBodyBuilder } from './AddressAliasTransactionBodyBuilder';
import { AddressDto } from './AddressDto';
import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AddressAliasTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly addressAliasTransactionBody: AddressAliasTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): AddressAliasTransactionBuilder;
    static createAddressAliasTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, address: AddressDto, aliasAction: AliasActionDto): AddressAliasTransactionBuilder;
    getNamespaceId(): NamespaceIdDto;
    getAddress(): AddressDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    getBody(): AddressAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}
