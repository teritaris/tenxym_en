import { AmountDto } from './AmountDto';
import { MultisigAccountModificationTransactionBodyBuilder } from './MultisigAccountModificationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
export declare class MultisigAccountModificationTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly multisigAccountModificationTransactionBody: MultisigAccountModificationTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]);
    static loadFromBinary(payload: Uint8Array): MultisigAccountModificationTransactionBuilder;
    static createMultisigAccountModificationTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, minRemovalDelta: number, minApprovalDelta: number, addressAdditions: UnresolvedAddressDto[], addressDeletions: UnresolvedAddressDto[]): MultisigAccountModificationTransactionBuilder;
    getMinRemovalDelta(): number;
    getMinApprovalDelta(): number;
    getAddressAdditions(): UnresolvedAddressDto[];
    getAddressDeletions(): UnresolvedAddressDto[];
    getSize(): number;
    getBody(): MultisigAccountModificationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
