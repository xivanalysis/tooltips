import Action from './Action'

const handlers = {
	Action,
}
export default handlers

export const getHandler = type => handlers[type]
