export type ColumnType = 'url'

export interface ColumnOptions {
	property: string
	type?: ColumnType
}

export interface DataConstructor<T extends Data> {
	new (): T
	columns?: Record<string, ColumnOptions>
}

export interface HydrateOptions {
	baseUrl: string
}

export abstract class Data {
	/** Mapping of columns to the expected class property name for this data sheet. */
	declare static columns?: Record<string, ColumnOptions>;

	// This is effectively just a fallback index sig so we can hydrate, child
	// class properties take precedence for types.
	[key: string]: unknown

	// Not using ctor due to prop initialisation woes
	hydrate(data: Record<string, unknown>, options: HydrateOptions): void {
		const ctor = this.constructor as typeof Data
		const columns = Object.entries(ctor.columns ?? {})

		for (const [column, {property, type}] of columns) {
			const path = column.split('.')
			let value = data
			for (const key of path) {
				value = value[key] as Record<string, unknown>
			}

			this[property] = handleColumnType(value, type, options)
		}
	}
}

function handleColumnType(
	value: unknown,
	type: ColumnType | undefined,
	options: HydrateOptions,
) {
	switch (type) {
		case 'url':
			return `${options.baseUrl}${value}`
	}

	return value
}

/**
 * Mark a property as a column to hydrate from XIV data.
 * @param column Game data column to hydrate this field from.
 */
export function column(
	column: string,
	options?: Omit<ColumnOptions, 'property'>,
) {
	return <T extends Data>(target: T, property: string): void => {
		const ctor = target.constructor as typeof Data
		ctor.columns = {
			...ctor.columns,
			[column]: {...options, property},
		}
	}
}
