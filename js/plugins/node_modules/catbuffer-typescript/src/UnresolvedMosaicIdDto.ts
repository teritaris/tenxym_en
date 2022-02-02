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

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/** Either a MosaicId or a NamespaceId.
The **most**-significant bit of the first byte is 0 for MosaicId's and 1 for NamespaceId's.. */
export class UnresolvedMosaicIdDto implements Serializer {
    /** Either a MosaicId or a NamespaceId.
The **most**-significant bit of the first byte is 0 for MosaicId's and 1 for NamespaceId's.. */
    readonly unresolvedMosaicId: number[];

    /**
     * Constructor.
     *
     * @param unresolvedMosaicId Either a MosaicId or a NamespaceId.
The **most**-significant bit of the first byte is 0 for MosaicId's and 1 for NamespaceId's..
     */
    constructor(unresolvedMosaicId: number[]) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }

    /**
     * Creates an instance of UnresolvedMosaicIdDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of UnresolvedMosaicIdDto.
     */
    public static loadFromBinary(payload: Uint8Array): UnresolvedMosaicIdDto {
        const unresolvedMosaicId = GeneratorUtils.bufferToUint64(Uint8Array.from(payload));
        return new UnresolvedMosaicIdDto(unresolvedMosaicId);
    }

    /**
     * Gets Either a MosaicId or a NamespaceId.
The **most**-significant bit of the first byte is 0 for MosaicId's and 1 for NamespaceId's..
     *
     * @return Either a MosaicId or a NamespaceId.
The **most**-significant bit of the first byte is 0 for MosaicId's and 1 for NamespaceId's..
     */
    public getUnresolvedMosaicId(): number[] {
        return this.unresolvedMosaicId;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return GeneratorUtils.uint64ToBuffer(this.getUnresolvedMosaicId());
    }
}
