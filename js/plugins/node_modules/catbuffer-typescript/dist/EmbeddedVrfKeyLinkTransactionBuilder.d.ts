import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { LinkActionDto } from './LinkActionDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { VrfKeyLinkTransactionBodyBuilder } from './VrfKeyLinkTransactionBodyBuilder';
export declare class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly vrfKeyLinkTransactionBody: VrfKeyLinkTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedVrfKeyLinkTransactionBuilder;
    static createEmbeddedVrfKeyLinkTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, linkedPublicKey: PublicKeyDto, linkAction: LinkActionDto): EmbeddedVrfKeyLinkTransactionBuilder;
    getLinkedPublicKey(): PublicKeyDto;
    getLinkAction(): LinkActionDto;
    getSize(): number;
    getBody(): VrfKeyLinkTransactionBodyBuilder;
    serialize(): Uint8Array;
}
