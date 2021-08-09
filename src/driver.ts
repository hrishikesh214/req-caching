import { CACHE_VALUE, CACHE_DRIVER, after_time, CACHE_OPTS } from "./defined.js"
import jscookie from "js-cookie"

interface CACHE_DRIVER_BUNCH {
	memory: CACHE_DRIVER
	cookie: CACHE_DRIVER
	localstorage: CACHE_DRIVER
}

const driver: CACHE_DRIVER_BUNCH = {
	memory: {
		save: async (key: string, v: any, opts: CACHE_OPTS | undefined) => {
			return true
		},
		get: async (key: string) => {
			return "ok"
		},
		clean: async (key: string) => {
			return true
		},
	},
	cookie: {
		save: async (key: string, v: any, opts: CACHE_OPTS | undefined) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = {
					value: v ?? null,
					expires: after_time(opts?.maxAge),
				}
				let xtime = 1
				if (opts?.maxAge !== undefined) {
					if (opts.maxAge?.seconds !== undefined) {
						xtime = (1 / (24 * 60 * 60)) * opts.maxAge.seconds
					}
					if (opts.maxAge?.minutes !== undefined) {
						xtime = (1 / (24 * 60)) * opts.maxAge.minutes
					}
					if (opts.maxAge?.hours !== undefined) {
						xtime = (1 / 24) * opts.maxAge.hours
					}
				}

				jscookie.set(key, JSON.stringify(value), { expires: xtime })
				return true
			} catch (error) {}
			return false
		},
		get: async (key: string) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = JSON.parse(
					jscookie.get(key) ?? `{"value":null, "expires":0}`
				)
				if (value.value === null) {
					return null
				}
				return value.value
			} catch (error) {}
			return null
		},
		clean: async (key: string) => {
			try {
				key = `_CACHE_${key}`
				jscookie.remove(key)
				return true
			} catch (error) {}
			return false
		},
	},
	localstorage: {
		save: async (key: string, v: any, opts: CACHE_OPTS | undefined) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = {
					value: v ?? null,
					expires: after_time(opts?.maxAge),
				}
				localStorage.setItem(key, JSON.stringify(value))
				return true
			} catch (error) {}
			return false
		},
		get: async (key: string) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = JSON.parse(
					localStorage.getItem(key) ?? `{"value":null, "expires":0}`
				)
				if (value.value === null) {
					return null
				}
				if (value.expires <= Date.now()) return null
				return value.value
			} catch (error) {}
			return null
		},
		clean: async (key: string) => {
			try {
				key = `_CACHE_${key}`
				localStorage.removeItem(key)
				return true
			} catch (error) {}
			return false
		},
	},
}

export default driver
