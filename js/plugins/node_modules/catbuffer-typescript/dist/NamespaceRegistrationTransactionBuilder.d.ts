import { AmountDto } from './AmountDto';
import { BlockDurationDto } from './BlockDurationDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class NamespaceRegistrationTransactionBuilder extends TransactionBuilder implements Serializer {
    readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;
    constructor(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, duration: BlockDurationDto | undefined, parentId: NamespaceIdDto | undefined, id: NamespaceIdDto, registrationType: NamespaceRegistrationTypeDto, name: Uint8Array);
    static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBuilder;
    static createNamespaceRegistrationTransactionBuilderROOT(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBuilder;
    static createNamespaceRegistrationTransactionBuilderCHILD(signature: SignatureDto, signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, fee: AmountDto, deadline: TimestampDto, parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBuilder;
    getDuration(): BlockDurationDto;
    getParentId(): NamespaceIdDto;
    getId(): NamespaceIdDto;
    getRegistrationType(): NamespaceRegistrationTypeDto;
    getName(): Uint8Array;
    getSize(): number;
    getBody(): NamespaceRegistrationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
