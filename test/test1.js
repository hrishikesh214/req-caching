import caching from "../lib/index.js"

const cache = new caching()

cache.add("m1", () => {
	return 1
})

console.log(cache)
