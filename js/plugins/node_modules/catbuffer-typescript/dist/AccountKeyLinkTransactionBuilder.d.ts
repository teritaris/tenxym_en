import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { AmountDto } from './AmountDto';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class AccountKeyLinkTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): AccountKeyLinkTransactionBuilder;
    static createAccountKeyLinkTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): AccountKeyLinkTransactionBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): AccountKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
