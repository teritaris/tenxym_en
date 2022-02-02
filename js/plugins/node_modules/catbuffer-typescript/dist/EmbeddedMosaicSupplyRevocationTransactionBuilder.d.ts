import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicSupplyRevocationTransactionBodyBuilder } from './MosaicSupplyRevocationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class EmbeddedMosaicSupplyRevocationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicSupplyRevocationTransactionBody: MosaicSupplyRevocationTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyRevocationTransactionBuilder;
    static createEmbeddedMosaicSupplyRevocationTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder): EmbeddedMosaicSupplyRevocationTransactionBuilder;
    getSourceAddress(): UnresolvedAddressDto;
    getMosaic(): UnresolvedMosaicBuilder;
    getSize(): number;
    getBody(): MosaicSupplyRevocationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
