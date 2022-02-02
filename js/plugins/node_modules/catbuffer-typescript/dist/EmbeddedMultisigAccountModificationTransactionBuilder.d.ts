import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionBuilder;
    static createEmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): EmbeddedMultisigAccountModificationTransactionBuilder;
    getMinRemovalDelta(): number;
    getMinApprovalDelta(): number;
    getAddressAdditions(): UnresolvedAddressDto[];
    getAddressDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    getBody(): MultisigAccountModificationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
