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

import { AliasActionDto } from './AliasActionDto';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicIdDto } from './MosaicIdDto';
import { NamespaceIdDto } from './NamespaceIdDto';
import { Serializer } from './Serializer';

/**
 * Shared content between MosaicAliasTransaction and EmbeddedMosaicAliasTransaction
 **/
export class MosaicAliasTransactionBodyBuilder implements Serializer {
    /** Identifier of the namespace that will become (or stop being) an alias for the Mosaic.. **/
    readonly namespaceId: NamespaceIdDto;

    /** Aliased mosaic identifier.. **/
    readonly mosaicId: MosaicIdDto;

    /** Alias action.. **/
    readonly aliasAction: AliasActionDto;

    /**
     * Constructor.
     *
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     * @param mosaicId Aliased mosaic identifier..
     * @param aliasAction Alias action..
     */
    public constructor(namespaceId: NamespaceIdDto, mosaicId: MosaicIdDto, aliasAction: AliasActionDto) {
        GeneratorUtils.notNull(namespaceId, 'namespaceId is null or undefined');
        GeneratorUtils.notNull(mosaicId, 'mosaicId is null or undefined');
        GeneratorUtils.notNull(aliasAction, 'aliasAction is null or undefined');
        this.namespaceId = namespaceId;
        this.mosaicId = mosaicId;
        this.aliasAction = aliasAction;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): MosaicAliasTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const namespaceId: NamespaceIdDto = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        const mosaicId: MosaicIdDto = MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const aliasAction: AliasActionDto = GeneratorUtils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }

    /**
     * Creates an instance of MosaicAliasTransactionBodyBuilder.
     *
     * @param namespaceId Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     * @param mosaicId Aliased mosaic identifier..
     * @param aliasAction Alias action..
     * @return Instance of MosaicAliasTransactionBodyBuilder.
     */
    public static createMosaicAliasTransactionBodyBuilder(
        namespaceId: NamespaceIdDto,
        mosaicId: MosaicIdDto,
        aliasAction: AliasActionDto,
    ): MosaicAliasTransactionBodyBuilder {
        return new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }

    /**
     * Gets Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     *
     * @return Identifier of the namespace that will become (or stop being) an alias for the Mosaic..
     */
    public getNamespaceId(): NamespaceIdDto {
        return this.namespaceId;
    }

    /**
     * Gets Aliased mosaic identifier..
     *
     * @return Aliased mosaic identifier..
     */
    public getMosaicId(): MosaicIdDto {
        return this.mosaicId;
    }

    /**
     * Gets Alias action..
     *
     * @return Alias action..
     */
    public getAliasAction(): AliasActionDto {
        return this.aliasAction;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.namespaceId.getSize(); // namespaceId
        size += this.mosaicId.getSize(); // mosaicId
        size += 1; // aliasAction
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const aliasActionBytes = GeneratorUtils.uint8ToBuffer(this.aliasAction);
        newArray = GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
