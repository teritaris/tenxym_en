import { AmountDto } from './AmountDto';
import { MosaicSupplyRevocationTransactionBodyBuilder } from './MosaicSupplyRevocationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';
export declare class MosaicSupplyRevocationTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicSupplyRevocationTransactionBody: MosaicSupplyRevocationTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyRevocationTransactionBuilder;
    static createMosaicSupplyRevocationTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, sourceAddress: UnresolvedAddressDto, mosaic: UnresolvedMosaicBuilder): MosaicSupplyRevocationTransactionBuilder;
    getSourceAddress(): UnresolvedAddressDto;
    getMosaic(): UnresolvedMosaicBuilder;
    getSize(): number;
    getBody(): MosaicSupplyRevocationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
