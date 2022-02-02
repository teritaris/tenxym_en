import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { MosaicDefinitionTransactionBodyBuilder } from './MosaicDefinitionTransactionBodyBuilder';
import { MosaicFlagsDto } from './MosaicFlagsDto';
import { MosaicIdDto } from './MosaicIdDto';
import { MosaicNonceDto } from './MosaicNonceDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class MosaicDefinitionTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicDefinitionTransactionBody: MosaicDefinitionTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number);
    static loadFromBinary(payload: Uint8Array): MosaicDefinitionTransactionBuilder;
    static createMosaicDefinitionTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, id: MosaicIdDto, duration: BlockDurationDto, nonce: MosaicNonceDto, flags: MosaicFlagsDto[], divisibility: number): MosaicDefinitionTransactionBuilder;
    getId(): MosaicIdDto;
    getDuration(): BlockDurationDto;
    getNonce(): MosaicNonceDto;
    getFlags(): MosaicFlagsDto[];
    getDivisibility(): number;
    getSize(): number;
    getBody(): MosaicDefinitionTransactionBodyBuilder;
    serialize(): Uint8Array;
}
