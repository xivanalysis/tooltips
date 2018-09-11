import Base from './Base'

export default class Action extends Base {
	static columns = [
		...Base.columns,
		'Description',
		'Icon',
		'Name',
	]
}
