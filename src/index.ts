import {
	CACHE_TYPE,
	CACHE_BUNCH,
	CACHE_OPTS,
	CACHE_VALUE,
	CACHE_ELEMENT,
} from "./defined"

import driver from "./driver"

/**
 * Class Cache is heart of the library.
 */

export default class Cache {
	bunch: CACHE_BUNCH // bunch of calls
	driver: any // driver type

	constructor(stype: CACHE_TYPE = "memory") {
		this.bunch = [] // lets bunch be an empty array
		this.driver = driver[stype] // lets driver be a string
	}

	async add(key: string, seed: () => any, options: CACHE_OPTS) {
		this.bunch.push({
			key,
			value: null,
			seed,
			options,
		})
	}

	async get(key: string) {
		let temp = await this.driver.get(key)
		if (temp === null) {
			let indexer: CACHE_ELEMENT | undefined = this.bunch.find(
				(item) => item.key === key
			)
			if (indexer === undefined) {
				return null
			}
			temp = indexer.seed()
			await this.driver.save(key, temp, indexer.options?.maxAge)
		}
		return temp
	}
}
