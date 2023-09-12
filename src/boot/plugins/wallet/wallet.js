import useTopics from 'boot/plugins/topics/topics'
import {
	initProvider
} from 'boot/util/DI'
import Logger$ from 'boot/util/Logger$'
import {
	identity, isNotNil, path, pipe
} from 'ramda'
import {
	reactive
} from 'vue'
import {
	tap
} from 'rxjs/operators'

import {
	delayP, isNull
} from 'ramda-adjunct'
import {
	filter, from, map, Observable, pluck, switchMap, take
} from 'rxjs'

const [WalletSymbol, useWallet] = initProvider('WalletSymbol')
import {
	getApp
} from 'firebase/app'
import {
	addDoc, collection, doc, getFirestore, onSnapshot
} from 'firebase/firestore'
import {
	getAuth, onAuthStateChanged, signInWithCustomToken
} from 'firebase/auth'

const createWallet = config => {
	const app = getApp()
	const db = getFirestore(app)
	const auth = getAuth()

	const authChanged$ = new Observable(observer => onAuthStateChanged(auth, e => observer.next(e)))

	const WalletState = reactive({
		loading: false,
		message: '',
		isConnected: false,
		address: ''
	})

	const {
		Topic,
		Message
	} = useTopics

	Topic('wallet', 'connected')
		.pipe(tap(connectedWallet => {
			if (connectedWallet.addresses && connectedWallet.addresses['columbus-5']) {
				WalletState.address = connectedWallet.addresses['columbus-5']
				WalletState.isConnected = true
				WalletState.loading = false
			}
		}))
		.subscribe(Logger$('Wallet Connected:', true))

	let {
		getChainOptions, WalletController, isInjected, verifyBytes
	} = {
	}

	const InjectWallet = (_getChainOptions, _WalletController, _verifyBytes) => {
		if (isInjected) return

		isInjected = true

		getChainOptions = _getChainOptions
		WalletController = _WalletController
		verifyBytes = _verifyBytes
	}

	const ConnectWallet = async () => {
		WalletState.loading = true

		const chainOptions = await getChainOptions()
		let controller = new WalletController({
			...chainOptions
		})

		controller
			.connectedWallet()
			.pipe(filter(e => !!e))
			.pipe(take(1))
			.subscribe(Message('wallet', 'connected'))

		await delayP(1000)

		from(controller.connect('EXTENSION'))
			.subscribe(Logger$('EXTENSION Connected:', true))

	}

	authChanged$
		.pipe(filter(isNull))
		.pipe(tap(Message('auth', 'unauthenticated')))
		.subscribe(Logger$('Not Authenticated', true))

	authChanged$
		.pipe(filter(isNotNil))
		.pipe(pluck('uid'))
		.pipe(tap(Message('auth', 'authenticated')))
		.subscribe(Logger$('Authenticated', true))

	const SignBytes = () =>
		Topic('wallet', 'connected')
			.pipe(tap(() => WalletState.loading = true))
			.pipe(switchMap(connectedWallet => from(
				connectedWallet
					.signBytes(
						Buffer.from('Sign this message to login'),
						connectedWallet.addresses['columbus-5']))
			)
			)
			.pipe(pluck('result'))
			.pipe(map(e => JSON.stringify(e)))
			.pipe(map(e => JSON.parse(e)))
			.pipe(switchMap(result => from(addDoc(collection(db, 'connections'), result))))
			.pipe(switchMap(connectionDoc => new Observable(observer => {
				const unsub = onSnapshot(doc(db, 'codes', connectionDoc.id), _doc => _doc.data() ? observer.next(_doc.data()) && unsub() : identity)
			})))
			.pipe(pluck('token'))
			.pipe(switchMap(token => from(signInWithCustomToken(getAuth(), token))))
			.pipe(map(path(['user', 'uid'])))
			.pipe(tap(Message('auth', 'authenticated')))
			.pipe(take(1))
			.subscribe(Logger$('Wallet Connected:', true))

	return {
		InjectWallet,
		WalletState,
		ConnectWallet,
		SignBytes
	}
}

const provideWallet = pipe(createWallet, WalletSymbol)

export {
	provideWallet, useWallet
}
