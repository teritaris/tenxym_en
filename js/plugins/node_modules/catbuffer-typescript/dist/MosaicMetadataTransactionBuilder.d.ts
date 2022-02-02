import { AmountDto } from './AmountDto';
import { MosaicMetadataTransactionBodyBuilder } from './MosaicMetadataTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicMetadataTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicMetadataTransactionBody: MosaicMetadataTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array);
    static loadFromBinary(payload: Uint8Array): MosaicMetadataTransactionBuilder;
    static createMosaicMetadataTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, targetAddress: UnresolvedAddressDto, scopedMetadataKey: number[], targetMosaicId: UnresolvedMosaicIdDto, valueSizeDelta: number, value: Uint8Array): MosaicMetadataTransactionBuilder;
    getTargetAddress(): UnresolvedAddressDto;
    getScopedMetadataKey(): number[];
    getTargetMosaicId(): UnresolvedMosaicIdDto;
    getValueSizeDelta(): number;
    getValue(): Uint8Array;
    getSize(): number;
    getBody(): MosaicMetadataTransactionBodyBuilder;
    serialize(): Uint8Array;
}
