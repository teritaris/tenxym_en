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

/**
 * Enumeration of receipt types.
 **/
export enum ReceiptTypeDto {
    /** Reserved.. */
    RESERVED = 0,

    /** Mosaic rental fee receipt.. */
    MOSAIC_RENTAL_FEE = 4685,

    /** Namespace rental fee receipt.. */
    NAMESPACE_RENTAL_FEE = 4942,

    /** Harvest fee receipt.. */
    HARVEST_FEE = 8515,

    /** Hash lock completed receipt.. */
    LOCK_HASH_COMPLETED = 8776,

    /** Hash lock expired receipt.. */
    LOCK_HASH_EXPIRED = 9032,

    /** Secret lock completed receipt.. */
    LOCK_SECRET_COMPLETED = 8786,

    /** Secret lock expired receipt.. */
    LOCK_SECRET_EXPIRED = 9042,

    /** Hash lock created receipt.. */
    LOCK_HASH_CREATED = 12616,

    /** Secret lock created receipt.. */
    LOCK_SECRET_CREATED = 12626,

    /** Mosaic expired receipt.. */
    MOSAIC_EXPIRED = 16717,

    /** Namespace expired receipt.. */
    NAMESPACE_EXPIRED = 16718,

    /** Namespace deleted receipt.. */
    NAMESPACE_DELETED = 16974,

    /** Inflation receipt.. */
    INFLATION = 20803,

    /** Transaction group receipt.. */
    TRANSACTION_GROUP = 57667,

    /** Address alias resolution receipt.. */
    ADDRESS_ALIAS_RESOLUTION = 61763,

    /** Mosaic alias resolution receipt.. */
    MOSAIC_ALIAS_RESOLUTION = 62019,
}
