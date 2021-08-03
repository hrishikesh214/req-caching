import { CACHE_VALUE, CACHE_DRIVER, after_time, CACHE_OPTS } from "./defined.js"

interface CACHE_DRIVER_BUNCH {
	memory: CACHE_DRIVER
	cookie: CACHE_DRIVER
	localstorage: CACHE_DRIVER
}

const driver: CACHE_DRIVER_BUNCH = {
	memory: {
		save: async (key: string, value: any, opts: CACHE_OPTS | undefined) => {
			return true
		},
		get: async (key: string) => {
			return "ok"
		},
	},
	cookie: {
		save: async (key: string, value: any, opts: CACHE_OPTS | undefined) => {
			return true
		},
		get: async (key: string) => {
			return "ok"
		},
	},
	localstorage: {
		save: async (key: string, v: any, opts: CACHE_OPTS | undefined) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = {
					value: v,
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
	},
}

export default driver
