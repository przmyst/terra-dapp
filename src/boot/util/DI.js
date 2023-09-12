import {
	converge, defaultTo, pair, partial, pipe
} from 'ramda'
import {
	inject, provide
} from 'vue'

const provideSymbol = symbol => partial(provide, [symbol])
const useSymbol = symbol => pipe(partial(inject, [symbol]), defaultTo(new Error('Provider not found')))

const initProvider = symbolName => converge(pair, [provideSymbol, useSymbol])(Symbol(symbolName))

export {
	initProvider
}
