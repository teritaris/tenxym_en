import { BlockDurationDto } from './BlockDurationDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { Serializer } from './Serializer';
export declare class NamespaceRegistrationTransactionBodyBuilder implements Serializer {
    readonly duration?: BlockDurationDto;
    readonly parentId?: NamespaceIdDto;
    readonly id: NamespaceIdDto;
    readonly registrationType: NamespaceRegistrationTypeDto;
    readonly name: Uint8Array;
    constructor(duration: BlockDurationDto | undefined, parentId: NamespaceIdDto | undefined, id: NamespaceIdDto, registrationType: NamespaceRegistrationTypeDto, name: Uint8Array);
    static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    static createNamespaceRegistrationTransactionBodyBuilderROOT(duration: BlockDurationDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    static createNamespaceRegistrationTransactionBodyBuilderCHILD(parentId: NamespaceIdDto, id: NamespaceIdDto, name: Uint8Array): NamespaceRegistrationTransactionBodyBuilder;
    getDuration(): BlockDurationDto;
    getParentId(): NamespaceIdDto;
    getId(): NamespaceIdDto;
    getRegistrationType(): NamespaceRegistrationTypeDto;
    getName(): Uint8Array;
    getSize(): number;
    serialize(): Uint8Array;
}
