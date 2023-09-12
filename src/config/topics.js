// Async - Last value sent after completion
// Behavior - Latest value sent to new subscribers
// Subject - Multicasted value to all subscribers similar to addEventListener
// Replay - Send N old values to new subscribers

export default () => [
	{
		topic: 'wallet',
		subject: 'connected',
		type: 'AsyncSubject'
	}
]

