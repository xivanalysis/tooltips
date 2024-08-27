export type ColumnType = 'scalar' | 'icon'

export type ColumnSource = 'fields' | 'transient'

export interface ColumnOptions {
	column: string
	type: ColumnType
	source: ColumnSource
}

export interface DataConstructor<T extends Data> {
	new (): T
	columns?: Record<string, ColumnOptions>
}

export interface BoilmasterSheetResponse {
	schema: string
	rows: BoilmasterRow[]
}

export interface BoilmasterRow {
	row_id: number
	fields: Record<string, unknown>
	transient?: Record<string, unknown>
}

export interface BoilmasterIcon {
	id: number
	path: string
	path_hr1: string
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
	hydrate(data: BoilmasterRow, options: HydrateOptions): void {
		const ctor = this.constructor as typeof Data
		const columns = Object.entries(ctor.columns ?? {})

		for (const [property, {column, type, source}] of columns) {
			const path = column.split('.')
			let value: Record<string, unknown> | undefined = data[source] ?? {}
			for (const key of path) {
				let inner = value[key] as Record<string, unknown>
				if (inner == null) {
					value = undefined
					break
				}

				if (Object.hasOwn(inner, 'fields')) {
					inner = inner.fields as Record<string, unknown>
				}

				value = inner
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
		case 'icon':
			return `${options.baseUrl}/asset/${
				(value as BoilmasterIcon).path_hr1
			}?format=png`
	}

	return value
}

/**
 * Mark a property as a column to hydrate from XIV data.
 * @param column Game data column to hydrate this field from.
 */
export function column(
	column: string,
	options?: Partial<Omit<ColumnOptions, 'property'>>,
) {
	return <T extends Data>(target: T, property: string): void => {
		const ctor = target.constructor as typeof Data
		ctor.columns = {
			...ctor.columns,
			[property]: {
				type: 'scalar',
				source: 'fields',
				...options,
				column,
			},
		}
	}
}
