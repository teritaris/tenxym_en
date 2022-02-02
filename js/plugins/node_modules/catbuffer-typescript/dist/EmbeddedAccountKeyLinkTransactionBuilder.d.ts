import { AccountKeyLinkTransactionBodyBuilder } from './AccountKeyLinkTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly accountKeyLinkTransactionBody: AccountKeyLinkTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedAccountKeyLinkTransactionBuilder;
    static createEmbeddedAccountKeyLinkTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): EmbeddedAccountKeyLinkTransactionBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): AccountKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
