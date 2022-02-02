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
 * Enumeration of mosaic property flags.
 **/
export enum MosaicFlagsDto {
    /** No flags present.. */
    NONE = 0,

    /** Mosaic supports supply changes through a MosaicSupplyChangeTransaction even when mosaic creator only owns a partial supply.
If the mosaic creator owns the totality of the supply, it can be changed even if this flag is not set.. */
    SUPPLY_MUTABLE = 1,

    /** Mosaic supports TransferTransaction between arbitrary accounts. When not set, this mosaic can only be transferred to or from the mosaic creator.. */
    TRANSFERABLE = 2,

    /** Mosaic supports custom restrictions configured by the mosaic creator.
See MosaicAddressRestrictionTransaction and MosaicGlobalRestrictionTransaction.. */
    RESTRICTABLE = 4,

    /** Mosaic supports revocation of tokens by the mosaic creator.. */
    REVOKABLE = 8,
}
