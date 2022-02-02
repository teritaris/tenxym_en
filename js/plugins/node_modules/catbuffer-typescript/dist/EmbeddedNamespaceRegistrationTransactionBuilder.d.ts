import { BlockDurationDto } from './BlockDurationDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTransactionBodyBuilder } from './NamespaceRegistrationTransactionBodyBuilder';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
export declare class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    readonly namespaceRegistrationTransactionBody: NamespaceRegistrationTransactionBodyBuilder;
    constructor(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, duration: BlockDurationDto | undefined, parentId: NamespaceIdDto | undefined, id: NamespaceIdDto, registrationType: NamespaceRegistrationTypeDto, name: Uint8Array);
    static loadFromBinary(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    static createEmbeddedNamespaceRegistrationTransactionBuilderROOT(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    static createEmbeddedNamespaceRegistrationTransactionBuilderCHILD(signerPublicKey: PublicKeyDto, version: number, network: NetworkTypeDto, type: TransactionTypeDto, parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): EmbeddedNamespaceRegistrationTransactionBuilder;
    getDuration(): BlockDurationDto;
    getParentId(): NamespaceIdDto;
    getId(): NamespaceIdDto;
    getRegistrationType(): NamespaceRegistrationTypeDto;
    getName(): Uint8Array;
    getSize(): number;
    getBody(): NamespaceRegistrationTransactionBodyBuilder;
    serialize(): Uint8Array;
}
