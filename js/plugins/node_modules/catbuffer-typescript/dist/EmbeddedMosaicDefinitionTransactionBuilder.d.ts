import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicDefinitionTransactionBuilder;
    static createEmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number): EmbeddedMosaicDefinitionTransactionBuilder;
    getId(): MosaicIdDto;
    getDuration(): BlockDurationDto;
    getNonce(): MosaicNonceDto;
    getFlags(): MosaicFlagsDto[];
    getDivisibility(): number;
    getSize(): number;
    getBody(): MosaicDefinitionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
