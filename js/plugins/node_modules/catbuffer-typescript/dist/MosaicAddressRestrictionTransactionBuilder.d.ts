import { AmountDto } from './AmountDto';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto);
    static loadFromBinary(payload: Uint8Array): MosaicAddressRestrictionTransactionBuilder;
    static createMosaicAddressRestrictionTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, restrictionKey: number[], previousRestrictionValue: number[], newRestrictionValue: number[], targetAddress: UnresolvedAddressDto): MosaicAddressRestrictionTransactionBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getRestrictionKey(): number[];
    getPreviousRestrictionValue(): number[];
    getNewRestrictionValue(): number[];
    getTargetAddress(): UnresolvedAddressDto;
    getSize(): number;
    getBody(): MosaicAddressRestrictionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
