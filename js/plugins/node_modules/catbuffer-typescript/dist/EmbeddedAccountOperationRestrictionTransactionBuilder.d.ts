import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountOperationRestrictionTransactionBuilder;
    static createEmbeddedAccountOperationRestrictionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, restrictionFlags: AccountRestrictionFlagsDto[], restrictionAdditions: TransactionTypeDto[], restrictionDeletions: TransactionTypeDto[]): EmbeddedAccountOperationRestrictionTransactionBuilder;
    getRestrictionFlags(): AccountRestrictionFlagsDto[];
    getRestrictionAdditions(): TransactionTypeDto[];
    getRestrictionDeletions(): TransactionTypeDto[];
    getSize(): number;
    getBody(): AccountOperationRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
