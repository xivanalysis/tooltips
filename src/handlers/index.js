import Action from './Action'
import Base from './Base'

const handlers = {
	Action,
}
export default handlers

export const getHandler = type => handlers[type] || Base
