import {
	identity
} from 'ramda'
import {
	Subscriber
} from 'rxjs'

export default (
	tag = '',
	active = process.env.MODE !== 'PROD' || true,
	next = e => console.info(`${ tag } next`, e),
	error = e => console.error(`${ tag } error`, e),
	complete = () => console.info(`${ tag } complete`)
) => Subscriber
	.create(
		active ? next : identity,
		active ? error : identity,
		active ? complete : identity
	)
