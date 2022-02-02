import { AmountDto } from './AmountDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyChangeTransactionBuilder;
    static createEmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): EmbeddedMosaicSupplyChangeTransactionBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getDelta(): AmountDto;
    getAction(): MosaicSupplyChangeActionDto;
    getSize(): number;
    getBody(): MosaicSupplyChangeTransactionBodyBuilder;
    serialize(): Uint8Array;
}
