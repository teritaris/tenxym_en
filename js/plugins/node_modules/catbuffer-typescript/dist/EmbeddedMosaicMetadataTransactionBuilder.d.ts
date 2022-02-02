import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicMetadataTransactionBodyBuilder } from './MosaicMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicMetadataTransactionBuilder;
    static createEmbeddedMosaicMetadataTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): EmbeddedMosaicMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetMosaicId(): UnresolvedMosaicIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): MosaicMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
