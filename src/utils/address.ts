import { utils } from "ethers"

export const { isAddress } = utils

export const AddressZero = "0x0000000000000000000000000000000000000000"

export function shortenAddress(address: string, chars = 4): string {
	const parsed = isAddress(address)
	if (!parsed) {
		throw Error(`Invalid 'address' parameter '${address}'.`)
	}
	return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}
