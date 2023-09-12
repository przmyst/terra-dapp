import useTopics from 'boot/plugins/topics/topics'
import {
	initProvider
} from 'boot/util/DI'
import Logger$ from 'boot/util/Logger$'
import {
	pipe
} from 'ramda'
import {
	reactive
} from 'vue'
import {
	tap
} from 'rxjs/operators'

const [TemplateSymbol, useTemplate] = initProvider('TemplateSymbol')

const createTemplate = config => {

	const TemplateState = reactive({
		loading: false,
		message: ''
	})

	const {
		Topic,
		Message
	} = useTopics

	Topic('do', 'something')
		.pipe(tap(message => TemplateState.message = message))
		.subscribe(Logger$('Something was:', true))

	const DoSomething = (message = 'done') => Message('do', 'something', message)

	return {
		TemplateState,
		DoSomething
	}
}

const provideTemplate = pipe(createTemplate, TemplateSymbol)

export {
	provideTemplate, useTemplate
}
