import { LinkActionDto } from './LinkActionDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
export declare class AccountKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: PublicKeyDto;
    readonly linkAction: LinkActionDto;
    constructor(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): AccountKeyLinkTransactionBodyBuilder;
    static createAccountKeyLinkTransactionBodyBuilder(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): AccountKeyLinkTransactionBodyBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
