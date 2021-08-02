import { CACHE_VALUE, CACHE_DRIVER, after_time, CACHE_OPTS } from "./defined"

const driver = {
	memory: {
		save: async (key: string, value: any) => {
			return true
		},
		get: async (key: string) => {
			return "ok"
		},
	},
	cookie: {
		save: async (key: string, value: any) => {
			return true
		},
		get: async (key: string) => {
			return "ok"
		},
	},
	localstorage: {
		save: async (key: string, v: any, opts: CACHE_OPTS) => {
			try {
				key = `_CACHE_${key}`
				let value: CACHE_VALUE = {
					value: v,
					expires: after_time(opts.maxAge),
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
