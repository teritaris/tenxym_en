import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicGlobalRestrictionTransactionBodyBuilder } from './MosaicGlobalRestrictionTransactionBodyBuilder';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicGlobalRestrictionTransactionBuilder;
    static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, referenceMosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], previousRestrictionType: MosaicRestrictionTypeDto, newRestrictionType: MosaicRestrictionTypeDto): EmbeddedMosaicGlobalRestrictionTransactionBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getReferenceMosaicId(): UnresolvedMosaicIdDto;
    getRestrictionKey(): number[];
    getPreviousRestrictionValue(): number[];
    getNewRestrictionValue(): number[];
    getPreviousRestrictionType(): MosaicRestrictionTypeDto;
    getNewRestrictionType(): MosaicRestrictionTypeDto;
    getSize(): number;
    getBody(): MosaicGlobalRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
