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

import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicSupplyRevocationTransactionBodyBuilder } from './MosaicSupplyRevocationTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicBuilder } from './UnresolvedMosaicBuilder';

/**
 * Embedded version of MosaicSupplyRevocationTransaction.
 **/
export class EmbeddedMosaicSupplyRevocationTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic supply revocation transaction body. **/
    readonly mosaicSupplyRevocationTransactionBody: MosaicSupplyRevocationTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param sourceAddress Address from which tokens should be revoked..
     * @param mosaic Revoked mosaic and amount..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        sourceAddress: UnresolvedAddressDto,
        mosaic: UnresolvedMosaicBuilder,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicSupplyRevocationTransactionBody = new MosaicSupplyRevocationTransactionBodyBuilder(sourceAddress, mosaic);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyRevocationTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyRevocationTransactionBody: MosaicSupplyRevocationTransactionBodyBuilder =
            MosaicSupplyRevocationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyRevocationTransactionBody.getSize());
        return new EmbeddedMosaicSupplyRevocationTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicSupplyRevocationTransactionBody.sourceAddress,
            mosaicSupplyRevocationTransactionBody.mosaic,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicSupplyRevocationTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param sourceAddress Address from which tokens should be revoked..
     * @param mosaic Revoked mosaic and amount..
     * @return Instance of EmbeddedMosaicSupplyRevocationTransactionBuilder.
     */
    public static createEmbeddedMosaicSupplyRevocationTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        sourceAddress: UnresolvedAddressDto,
        mosaic: UnresolvedMosaicBuilder,
    ): EmbeddedMosaicSupplyRevocationTransactionBuilder {
        return new EmbeddedMosaicSupplyRevocationTransactionBuilder(signerPublicKey, version, network, type, sourceAddress, mosaic);
    }

    /**
     * Gets Address from which tokens should be revoked..
     *
     * @return Address from which tokens should be revoked..
     */
    public getSourceAddress(): UnresolvedAddressDto {
        return this.mosaicSupplyRevocationTransactionBody.getSourceAddress();
    }

    /**
     * Gets Revoked mosaic and amount..
     *
     * @return Revoked mosaic and amount..
     */
    public getMosaic(): UnresolvedMosaicBuilder {
        return this.mosaicSupplyRevocationTransactionBody.getMosaic();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicSupplyRevocationTransactionBody.getSize(); // mosaicSupplyRevocationTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicSupplyRevocationTransactionBodyBuilder {
        return this.mosaicSupplyRevocationTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyRevocationTransactionBodyBytes = this.mosaicSupplyRevocationTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyRevocationTransactionBodyBytes);
        return newArray;
    }
}
