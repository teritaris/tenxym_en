import { AliasActionDto } from './AliasActionDto';
import { AmountDto } from './AmountDto';
import { MosaicAliasTransactionBodyBuilder } from './MosaicAliasTransactionBodyBuilder';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class MosaicAliasTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly mosaicAliasTransactionBody: MosaicAliasTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto);
    static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBuilder;
    static createMosaicAliasTransactionBuilder(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto): MosaicAliasTransactionBuilder;
    getNamespaceId(): NamespaceIdDto;
    getMosaicId(): MosaicIdDto;
    getAliasAction(): AliasActionDto;
    getSize(): number;
    getBody(): MosaicAliasTransactionBodyBuilder;
    serialize(): Uint8Array;
}
