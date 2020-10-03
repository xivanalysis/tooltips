export interface DataConstructor<T extends Data> {
	new (): T
	sheet: string
	columns?: Record<string, string>
}

export abstract class Data {
	/** XIV sheet to request data from. */
	private static _sheet?: string
	static get sheet(): string {
		if (this._sheet != null) {
			return this._sheet
		}
		throw new Error(`Missing \`static sheet\` declaration on ${this.name}`)
	}
	static set sheet(value) {
		this._sheet = value
	}

	/** Mapping of columns to the expected class property name for this data sheet. */
	declare static columns?: Record<string, string>;

	// This is effectively just a fallback index sig so we can hydrate, child
	// class properties take precedence for types.
	[key: string]: unknown

	// Not using ctor due to prop initialisation woes
	hydrate(data: Record<string, unknown>) {
		const ctor = this.constructor as typeof Data

		for (const [column, property] of Object.entries(ctor.columns ?? {})) {
			this[property] = data[column]
		}
	}
}

/** Mark a property as a column to hydrate from XIV data. */
export function column(column: string) {
	return <T extends Data>(target: T, key: string) => {
		const ctor = target.constructor as typeof Data
		ctor.columns = {
			...ctor.columns,
			[column]: key,
		}
	}
}
