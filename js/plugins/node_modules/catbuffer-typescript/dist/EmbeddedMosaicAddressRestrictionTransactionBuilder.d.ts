import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto);
    static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAddressRestrictionTransactionBuilder;
    static createEmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto): EmbeddedMosaicAddressRestrictionTransactionBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getRestrictionKey(): number[];
    getPreviousRestrictionValue(): number[];
    getNewRestrictionValue(): number[];
    getTargetAddress(): UnresolvedAddressDto;
    getSize(): number;
    getBody(): MosaicAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
