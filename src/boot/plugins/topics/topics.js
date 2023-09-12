import {
	curry
} from 'ramda'
import {
	AsyncSubject, Subject
} from 'rxjs'

import TopicsConfig from 'src/config/topics'

let useTopics

const createTopics = () => {
	if (useTopics) return useTopics

	const topics = new Map()

	let asyncSubjects = new Set(TopicsConfig().filter(e => e.type === 'AsyncSubject').map(e => `${ e.topic }:${ e.subject }`))

	const Topic = curry((topic, subject) => {
		let id = `${ topic }:${ subject }`
		// console.log(id)
		if (!topics.has(id)) {
			if (asyncSubjects.has(id)) {
				topics.set(id, new AsyncSubject())
			} else {
				topics.set(id, new Subject())
			}
		}

		return topics.get(id)
	})

	const Message = curry((topic, subject, value) => {

		let id = `${ topic }:${ subject }`

		if (topics.has(id)) {
			if (asyncSubjects.has(id)) {
				if (!topics.get(id).isStopped) {
					topics.get(id).next(value)
					topics.get(id).complete()
				}
			} else {
				topics.get(id).next(value)
			}
		}
	})

	const Signal = (topic, subject) => Message(topic, subject, null)

	useTopics = {
		Topic,
		Message,
		Signal
	}

	return useTopics
}

export default createTopics()
