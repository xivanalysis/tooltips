import {debounce} from 'debounce'
import {useCallback, useMemo, useRef} from 'react'

interface DebounceResolution {
	promise: Promise<void>
	resolve: () => void
}

export function useAsyncDebounce(
	fn: () => Promise<unknown>,
	delay: number,
): () => Promise<void> {
	const resolution = useRef<DebounceResolution>()

	const debouncedFn = useMemo(
		() =>
			// TODO: roll own debounce I mean really
			debounce(() => {
				// Grab & clear the resolution immediately to prevent races in
				// long-running user functions
				const currentResolution = resolution.current
				resolution.current = undefined

				// Run the user function, then unblock the resolution on completion
				fn().then(() => currentResolution?.resolve())
			}, delay),
		[delay, fn],
	)

	return useCallback(() => {
		// If there's no debounce running yet, configure one
		if (resolution.current == null) {
			let resolve!: () => void
			const promise = new Promise<void>(internalResolve => {
				resolve = internalResolve
			})
			resolution.current = {
				promise,
				resolve,
			}
		}

		debouncedFn()

		return resolution.current.promise
	}, [debouncedFn])
}
