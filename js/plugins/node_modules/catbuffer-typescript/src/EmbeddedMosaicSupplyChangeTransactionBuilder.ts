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

import { AmountDto } from './AmountDto';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicSupplyChangeActionDto } from './MosaicSupplyChangeActionDto';
import { MosaicSupplyChangeTransactionBodyBuilder } from './MosaicSupplyChangeTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Embedded version of MosaicSupplyChangeTransaction.
 **/
export class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic supply change transaction body. **/
    readonly mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Affected mosaic identifier..
     * @param delta Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     * @param action Supply change action..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        delta: AmountDto,
        action: MosaicSupplyChangeActionDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicSupplyChangeTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyChangeTransactionBody: MosaicSupplyChangeTransactionBodyBuilder =
            MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicSupplyChangeTransactionBody.mosaicId,
            mosaicSupplyChangeTransactionBody.delta,
            mosaicSupplyChangeTransactionBody.action,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Affected mosaic identifier..
     * @param delta Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     * @param action Supply change action..
     * @return Instance of EmbeddedMosaicSupplyChangeTransactionBuilder.
     */
    public static createEmbeddedMosaicSupplyChangeTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        delta: AmountDto,
        action: MosaicSupplyChangeActionDto,
    ): EmbeddedMosaicSupplyChangeTransactionBuilder {
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, version, network, type, mosaicId, delta, action);
    }

    /**
     * Gets Affected mosaic identifier..
     *
     * @return Affected mosaic identifier..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    }

    /**
     * Gets Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     *
     * @return Change amount. It cannot be negative, use the `action` field to indicate if this amount should be **added** or **subtracted** from the current supply..
     */
    public getDelta(): AmountDto {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    }

    /**
     * Gets Supply change action..
     *
     * @return Supply change action..
     */
    public getAction(): MosaicSupplyChangeActionDto {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicSupplyChangeTransactionBody.getSize(); // mosaicSupplyChangeTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicSupplyChangeTransactionBodyBuilder {
        return this.mosaicSupplyChangeTransactionBody;
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
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}
