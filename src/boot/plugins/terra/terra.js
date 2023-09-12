import useTopics from 'boot/plugins/topics/topics'
import {
	initProvider
} from 'boot/util/DI'
import Logger$ from 'boot/util/Logger$'
import {
	pipe, prop
} from 'ramda'
import {
	reactive
} from 'vue'
import {
	catchError, tap
} from 'rxjs/operators'
import {
	filter, from, map, of, switchMap
} from 'rxjs'

const [TerraSymbol, useTerra] = initProvider('TerraSymbol')

const createTerra = config => {

	const TerraState = reactive({
		loading: false,
		model: {
			code: 7980,
			label: '',
			contract: '',
			admin: '',
			count: 0
		},
		txhash: ''
	})

	const {
		Topic,
		Message
	} = useTopics

	let {
		LCDClient, MsgExecuteContract, MsgInstantiateContract, lcd, isInjected
	} = {
	}

	const InjectTerra = (_LCDClient, _MsgExecuteContract, _MsgInstantiateContract) => {
		if (isInjected) return

		isInjected = true

		LCDClient = _LCDClient
		MsgExecuteContract = _MsgExecuteContract
		MsgInstantiateContract = _MsgInstantiateContract

		lcd = new LCDClient({
			URL: 'https://terra-classic-lcd.publicnode.com',
			chainID: 'columbus-5',
			gasPrices: {
				uluna: '50'
			},
			isClassic: true
		})
	}

	Topic('wallet', 'connected')
		.pipe(tap(connectedWallet => {
			if (connectedWallet.addresses && connectedWallet.addresses['columbus-5']) {
				TerraState.model.admin = connectedWallet.addresses['columbus-5']
			}
		}))
		.subscribe(Logger$('Wallet Connected Terra:', false))

	const Broadcast$ = e => of(e)
		.pipe(switchMap(([connectedWallet, msg]) => from(connectedWallet.sign({
			chainID: 'columbus-5',
			msgs: [msg]
		}))))
		.pipe(catchError(() => of(null).pipe(tap(() => TerraState.loading = false))))
		.pipe(filter(prop('result')))
		.pipe(map(prop('result')))
		.pipe(switchMap(result => from(lcd.tx.broadcastSync(result, 'columbus-5'))))
		.pipe(catchError(() => of(null).pipe(tap(() => TerraState.loading = false))))
		.pipe(filter(prop('txhash')))
		.pipe(map(prop('txhash')))
		.pipe(tap(txhash => TerraState.txhash = txhash))
		.pipe(tap(() => TerraState.loading = false))

	const Instantiate = () =>
		Topic('wallet', 'connected')
			.pipe(tap(() => TerraState.loading = true))
			.pipe(map(connectedWallet => [
				connectedWallet,
				new MsgInstantiateContract(
					connectedWallet.addresses['columbus-5'],
					TerraState.model.admin,
					TerraState.model.code,
					{
						count: TerraState.model.count
					},
					{
						uluna: 1
					},
					TerraState.model.label
				)
			]))
			.pipe(switchMap(e => Broadcast$(e)))
			.subscribe(Logger$('Instantiate', true))

	const Execute = () =>
		Topic('wallet', 'connected')
			.pipe(tap(() => TerraState.loading = true))
			.pipe(map(connectedWallet => [
				connectedWallet,
				new MsgExecuteContract(
					connectedWallet.addresses['columbus-5'],
					TerraState.model.contract,
					{
						reset: {
							count: TerraState.model.count
						}
					})
			]))
			.pipe(switchMap(e => Broadcast$(e)))
			.subscribe(Logger$('Execute', true))

	const Query = () =>
		Topic('wallet', 'connected')
			.pipe(tap(() => TerraState.loading = true))
			.pipe(switchMap(connectedWallet => [
				connectedWallet,
				new MsgExecuteContract(
					connectedWallet.addresses['columbus-5'],
					TerraState.model.contract,
					{
						get_count: {
						}
					}
				)
			]))
			.pipe(switchMap(e => Broadcast$(e)))
			.subscribe(Logger$('Query', true))

	return {
		InjectTerra,
		TerraState,
		Instantiate,
		Execute,
		Query
	}
}

const provideTerra = pipe(createTerra, TerraSymbol)

export {
	provideTerra, useTerra
}
