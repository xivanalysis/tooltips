export interface DataConstructor<T extends Data> {
	new (): T
	columns?: Record<string, string>
}

export abstract class Data {
	/** Mapping of columns to the expected class property name for this data sheet. */
	declare static columns?: Record<string, string>;

	// This is effectively just a fallback index sig so we can hydrate, child
	// class properties take precedence for types.
	[key: string]: unknown

	// Not using ctor due to prop initialisation woes
	hydrate(data: Record<string, unknown>): void {
		const ctor = this.constructor as typeof Data

		for (const [column, property] of Object.entries(ctor.columns ?? {})) {
			const path = column.split('.')
			let value = data
			for (const key of path) {
				value = value[key] as Record<string, unknown>
			}

			this[property] = value
		}
	}
}

/**
 * Mark a property as a column to hydrate from XIV data.
 * @param column Game data column to hydrate this field from.
 */
export function column(column: string) {
	return <T extends Data>(target: T, key: string): void => {
		const ctor = target.constructor as typeof Data
		ctor.columns = {
			...ctor.columns,
			[column]: key,
		}
	}
}
