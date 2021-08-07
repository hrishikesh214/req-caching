import {
	CACHE_TYPE,
	CACHE_BUNCH,
	CACHE_OPTS,
	CACHE_VALUE,
	CACHE_DRIVER,
	CACHE_ELEMENT,
} from "./defined"

import driver from "./driver.js"
import jsonfile from "jsonfile"
import path from "path"

/**
 * Class Cache is heart of the library.
 */

export default class Cache {
	bunch: CACHE_BUNCH // bunch of calls
	driver: CACHE_DRIVER // driver type

	constructor(stype: CACHE_TYPE = "localstorage") {
		this.bunch = [] // lets bunch be an empty array
		this.driver = driver[stype] // lets driver be a string
	}

	/**
	 * @param {string} key
	 * @param {()=>any} seed
	 * @param {CACHE_OPTS} options
	 * @returns {void}
	 */
	async add(key: string, seed: () => any, options: CACHE_OPTS) {
		options = {
			maxAge: options?.maxAge || { seconds: 60 },
			strict: options?.strict || false,
			encrypt: options?.encrypt || false,
		}

		this.bunch.push({
			key,
			value: null,
			seed,
			options,
		})
	}

	ver() {
		const fv = jsonfile.readFileSync(
			new URL("../package.json", import.meta.url).toString().substring(8)
		)
		return fv.version
	}

	/**
	 * @param {string} key
	 * @return {any} value
	 */
	async get(key: string) {
		let temp = await this.driver.get(key)
		if (temp === null) {
			let indexer: CACHE_ELEMENT | undefined = this.bunch.find(
				(item) => item.key === key
			)
			if (indexer === undefined) {
				return new Error("NO CACHE FOUND")
			}
			if (indexer.seed.constructor.name === "AsyncFunction")
				temp = await indexer.seed()
			else temp = indexer.seed()
			if (!(await this.driver.save(key, temp, indexer.options))) {
				return new Error("CACHE_SAVE FAILED")
			}
		}
		return temp
	}

	/**
	 * @return {bool} value
	 */
	async cleanAll() {
		try {
			this.bunch.forEach((c) => {
				this.driver.clean(c.key)
			})

			return true
		} catch (error) {}
		return false
	}
}
