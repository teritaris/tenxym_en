import { AliasActionDto } from './AliasActionDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedMosaicAliasTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAliasTransactionBuilder;
    static createEmbeddedMosaicAliasTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): EmbeddedMosaicAliasTransactionBuilder;
    getNamespaceId(): NamespaceIdDto;
    getMosaicId(): MosaicIdDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    getBody(): MosaicAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}
