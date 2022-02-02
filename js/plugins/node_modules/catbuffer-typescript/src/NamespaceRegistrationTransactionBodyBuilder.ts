/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { BlockDurationDto } from './BlockDurationDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NamespaceIdDto } from './NamespaceIdDto';
import { NamespaceRegistrationTypeDto } from './NamespaceRegistrationTypeDto';
import { Serializer } from './Serializer';

/**
 * Shared content between NamespaceRegistrationTransaction and EmbeddedNamespaceRegistrationTransaction.
 **/
export class NamespaceRegistrationTransactionBodyBuilder implements Serializer {
    /** Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces.. **/
    readonly duration?: BlockDurationDto;

    /** Parent namespace identifier. Required for sub-namespaces.. **/
    readonly parentId?: NamespaceIdDto;

    /** Namespace identifier.. **/
    readonly id: NamespaceIdDto;

    /** Namespace registration type.. **/
    readonly registrationType: NamespaceRegistrationTypeDto;

    /** Namespace name.. **/
    readonly name: Uint8Array;

    /**
     * Constructor.
     *
     * @param duration Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     * @param parentId Parent namespace identifier. Required for sub-namespaces..
     * @param id Namespace identifier..
     * @param registrationType Namespace registration type..
     * @param name Namespace name..
     */
    public constructor(
        duration: BlockDurationDto | undefined,
        parentId: NamespaceIdDto | undefined,
        id: NamespaceIdDto,
        registrationType: NamespaceRegistrationTypeDto,
        name: Uint8Array,
    ) {
        if (registrationType === NamespaceRegistrationTypeDto.ROOT) {
            GeneratorUtils.notNull(duration, 'duration is null or undefined');
        }
        if (registrationType === NamespaceRegistrationTypeDto.CHILD) {
            GeneratorUtils.notNull(parentId, 'parentId is null or undefined');
        }
        GeneratorUtils.notNull(id, 'id is null or undefined');
        GeneratorUtils.notNull(registrationType, 'registrationType is null or undefined');
        GeneratorUtils.notNull(name, 'name is null or undefined');
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): NamespaceRegistrationTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const registrationTypeCondition = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const id: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        const registrationType: NamespaceRegistrationTypeDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const nameSize: number = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const name: Uint8Array = GeneratorUtils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration: BlockDurationDto | undefined = undefined;
        if (registrationType === NamespaceRegistrationTypeDto.ROOT) {
            duration = new BlockDurationDto(registrationTypeCondition);
        }
        let parentId: NamespaceIdDto | undefined = undefined;
        if (registrationType === NamespaceRegistrationTypeDto.CHILD) {
            parentId = new NamespaceIdDto(registrationTypeCondition);
        }
        return new NamespaceRegistrationTransactionBodyBuilder(duration, parentId, id, registrationType, name);
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param duration Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     * @param id Namespace identifier..
     * @param name Namespace name..
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static createNamespaceRegistrationTransactionBodyBuilderROOT(
        duration: BlockDurationDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBodyBuilder {
        const registrationType = NamespaceRegistrationTypeDto.ROOT;
        return new NamespaceRegistrationTransactionBodyBuilder(duration, undefined, id, registrationType, name);
    }

    /**
     * Creates an instance of NamespaceRegistrationTransactionBodyBuilder.
     *
     * @param parentId Parent namespace identifier. Required for sub-namespaces..
     * @param id Namespace identifier..
     * @param name Namespace name..
     * @return Instance of NamespaceRegistrationTransactionBodyBuilder.
     */
    public static createNamespaceRegistrationTransactionBodyBuilderCHILD(
        parentId: NamespaceIdDto,
        id: NamespaceIdDto,
        name: Uint8Array,
    ): NamespaceRegistrationTransactionBodyBuilder {
        const registrationType = NamespaceRegistrationTypeDto.CHILD;
        return new NamespaceRegistrationTransactionBodyBuilder(undefined, parentId, id, registrationType, name);
    }

    /**
     * Gets Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     *
     * @return Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces..
     */
    public getDuration(): BlockDurationDto {
        if (!(this.registrationType === NamespaceRegistrationTypeDto.ROOT && this.duration)) {
            throw new Error('registrationType is not set to ROOT.');
        }
        return this.duration;
    }

    /**
     * Gets Parent namespace identifier. Required for sub-namespaces..
     *
     * @return Parent namespace identifier. Required for sub-namespaces..
     */
    public getParentId(): NamespaceIdDto {
        if (!(this.registrationType === NamespaceRegistrationTypeDto.CHILD && this.parentId)) {
            throw new Error('registrationType is not set to CHILD.');
        }
        return this.parentId;
    }

    /**
     * Gets Namespace identifier..
     *
     * @return Namespace identifier..
     */
    public getId(): NamespaceIdDto {
        return this.id;
    }

    /**
     * Gets Namespace registration type..
     *
     * @return Namespace registration type..
     */
    public getRegistrationType(): NamespaceRegistrationTypeDto {
        return this.registrationType;
    }

    /**
     * Gets Namespace name..
     *
     * @return Namespace name..
     */
    public getName(): Uint8Array {
        return this.name;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        if (this.registrationType === NamespaceRegistrationTypeDto.ROOT) {
            size += this.duration!.getSize(); // duration
        }
        if (this.registrationType === NamespaceRegistrationTypeDto.CHILD) {
            size += this.parentId!.getSize(); // parentId
        }
        size += this.id.getSize(); // id
        size += 1; // registrationType
        size += 1; // nameSize
        size += this.name.length; // name
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        if (this.registrationType === NamespaceRegistrationTypeDto.ROOT) {
            const durationBytes = this.duration!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationTypeDto.CHILD) {
            const parentIdBytes = this.parentId!.serialize();
            newArray = GeneratorUtils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = GeneratorUtils.uint8ToBuffer(this.registrationType);
        newArray = GeneratorUtils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = GeneratorUtils.uint8ToBuffer(this.name.length);
        newArray = GeneratorUtils.concatTypedArrays(newArray, nameSizeBytes);
        const nameBytes = this.name;
        newArray = GeneratorUtils.concatTypedArrays(newArray, nameBytes);
        return newArray;
    }
}
