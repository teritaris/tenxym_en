import { LinkActionDto } from './LinkActionDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
export declare class NodeKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: PublicKeyDto;
    readonly linkAction: LinkActionDto;
    constructor(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): NodeKeyLinkTransactionBodyBuilder;
    static createNodeKeyLinkTransactionBodyBuilder(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): NodeKeyLinkTransactionBodyBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
