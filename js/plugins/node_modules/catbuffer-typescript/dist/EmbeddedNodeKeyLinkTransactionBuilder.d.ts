import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { NodeKeyLinkTransactionBodyBuilder } from './NodeKeyLinkTransactionBodyBuilder';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly nodeKeyLinkTransactionBody: NodeKeyLinkTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedNodeKeyLinkTransactionBuilder;
    static createEmbeddedNodeKeyLinkTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): EmbeddedNodeKeyLinkTransactionBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): NodeKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
