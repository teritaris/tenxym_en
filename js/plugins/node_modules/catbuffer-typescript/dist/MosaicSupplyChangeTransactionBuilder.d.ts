import { AmountDto } from './AmountDto';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';
export declare class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto);
    static loadFromBinary(payload: Uint8Array): MosaicSupplyChangeTransactionBuilder;
    static createMosaicSupplyChangeTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, mosaicId: UnresolvedMosaicIdDto, delta: AmountDto, action: MosaicSupplyChangeActionDto): MosaicSupplyChangeTransactionBuilder;
    getMosaicId(): UnresolvedMosaicIdDto;
    getDelta(): AmountDto;
    getAction(): MosaicSupplyChangeActionDto;
    getSize(): number;
    getBody(): MosaicSupplyChangeTransactionBodyBuilder;
    serialize(): Uint8Array;
}
