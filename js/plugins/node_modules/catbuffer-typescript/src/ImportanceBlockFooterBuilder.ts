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
import { GeneratorUtils } from './GeneratorUtils';
import { Hash256Dto } from './Hash256Dto';
import { Serializer } from './Serializer';

/**
 * Binary layout for an importance block footer
 **/
export class ImportanceBlockFooterBuilder implements Serializer {
    /** Number of voting eligible accounts. **/
    readonly votingEligibleAccountsCount: number;

    /** Number of harvesting eligible accounts. **/
    readonly harvestingEligibleAccountsCount: number[];

    /** Total balance eligible for voting. **/
    readonly totalVotingBalance: AmountDto;

    /** Previous importance block hash. **/
    readonly previousImportanceBlockHash: Hash256Dto;

    /**
     * Constructor.
     *
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     */
    public constructor(
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: number[],
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ) {
        GeneratorUtils.notNull(votingEligibleAccountsCount, 'votingEligibleAccountsCount is null or undefined');
        GeneratorUtils.notNull(harvestingEligibleAccountsCount, 'harvestingEligibleAccountsCount is null or undefined');
        GeneratorUtils.notNull(totalVotingBalance, 'totalVotingBalance is null or undefined');
        GeneratorUtils.notNull(previousImportanceBlockHash, 'previousImportanceBlockHash is null or undefined');
        this.votingEligibleAccountsCount = votingEligibleAccountsCount;
        this.harvestingEligibleAccountsCount = harvestingEligibleAccountsCount;
        this.totalVotingBalance = totalVotingBalance;
        this.previousImportanceBlockHash = previousImportanceBlockHash;
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): ImportanceBlockFooterBuilder {
        const byteArray = Array.from(payload);
        const votingEligibleAccountsCount: number = GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const harvestingEligibleAccountsCount: number[] = GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const totalVotingBalance: AmountDto = AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalVotingBalance.getSize());
        const previousImportanceBlockHash: Hash256Dto = Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousImportanceBlockHash.getSize());
        return new ImportanceBlockFooterBuilder(
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        );
    }

    /**
     * Creates an instance of ImportanceBlockFooterBuilder.
     *
     * @param votingEligibleAccountsCount Number of voting eligible accounts.
     * @param harvestingEligibleAccountsCount Number of harvesting eligible accounts.
     * @param totalVotingBalance Total balance eligible for voting.
     * @param previousImportanceBlockHash Previous importance block hash.
     * @return Instance of ImportanceBlockFooterBuilder.
     */
    public static createImportanceBlockFooterBuilder(
        votingEligibleAccountsCount: number,
        harvestingEligibleAccountsCount: number[],
        totalVotingBalance: AmountDto,
        previousImportanceBlockHash: Hash256Dto,
    ): ImportanceBlockFooterBuilder {
        return new ImportanceBlockFooterBuilder(
            votingEligibleAccountsCount,
            harvestingEligibleAccountsCount,
            totalVotingBalance,
            previousImportanceBlockHash,
        );
    }

    /**
     * Gets number of voting eligible accounts.
     *
     * @return Number of voting eligible accounts.
     */
    public getVotingEligibleAccountsCount(): number {
        return this.votingEligibleAccountsCount;
    }

    /**
     * Gets number of harvesting eligible accounts.
     *
     * @return Number of harvesting eligible accounts.
     */
    public getHarvestingEligibleAccountsCount(): number[] {
        return this.harvestingEligibleAccountsCount;
    }

    /**
     * Gets total balance eligible for voting.
     *
     * @return Total balance eligible for voting.
     */
    public getTotalVotingBalance(): AmountDto {
        return this.totalVotingBalance;
    }

    /**
     * Gets previous importance block hash.
     *
     * @return Previous importance block hash.
     */
    public getPreviousImportanceBlockHash(): Hash256Dto {
        return this.previousImportanceBlockHash;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += 4; // votingEligibleAccountsCount
        size += 8; // harvestingEligibleAccountsCount
        size += this.totalVotingBalance.getSize(); // totalVotingBalance
        size += this.previousImportanceBlockHash.getSize(); // previousImportanceBlockHash
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const votingEligibleAccountsCountBytes = GeneratorUtils.uint32ToBuffer(this.getVotingEligibleAccountsCount());
        newArray = GeneratorUtils.concatTypedArrays(newArray, votingEligibleAccountsCountBytes);
        const harvestingEligibleAccountsCountBytes = GeneratorUtils.uint64ToBuffer(this.getHarvestingEligibleAccountsCount());
        newArray = GeneratorUtils.concatTypedArrays(newArray, harvestingEligibleAccountsCountBytes);
        const totalVotingBalanceBytes = this.totalVotingBalance.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, totalVotingBalanceBytes);
        const previousImportanceBlockHashBytes = this.previousImportanceBlockHash.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, previousImportanceBlockHashBytes);
        return newArray;
    }
}
