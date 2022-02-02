import { AccountAddressRestrictionTransactionBodyBuilder } from './AccountAddressRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly accountAddressRestrictionTransactionBody: AccountAddressRestrictionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountAddressRestrictionTransactionBuilder;
    static createEmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: UnresolvedAddressDto[], restrictionDeletions: UnresolvedAddressDto[]): EmbeddedAccountAddressRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): UnresolvedAddressDto[];
    getRestrictionDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    getBody(): AccountAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
