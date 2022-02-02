import { LinkActionDto } from './LinkActionDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
export declare class VrfKeyLinkTransactionBodyBuilder implements Serializer {
    readonly linkedPublicKey: PublicKeyDto;
    readonly linkAction: LinkActionDto;
    constructor(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): VrfKeyLinkTransactionBodyBuilder;
    static createVrfKeyLinkTransactionBodyBuilder(linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): VrfKeyLinkTransactionBodyBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    serialize(): Uint8Array;
}
