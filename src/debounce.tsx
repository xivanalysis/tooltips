import {useCallback, useRef} from 'react'

interface DebounceResolution {
	promise: Promise<void>
	resolve: () => void
	timeoutHandle?: number
}

export function useAsyncDebounce(
	fn: () => Promise<unknown>,
	delay: number,
): () => Promise<void> {
	const resolution = useRef<DebounceResolution>()

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

		// If there's an ongoing timeout, can it.
		if (resolution.current.timeoutHandle != null) {
			window.clearTimeout(resolution.current.timeoutHandle)
		}

		resolution.current.timeoutHandle = window.setTimeout(() => {
			// Grab & clear the resolution immediately to prevent races in
			// long-running user functions
			const currentResolution = resolution.current
			resolution.current = undefined

			// Run the user function, then unblock the resolution on completion
			fn().then(() => currentResolution?.resolve())
		}, delay)

		return resolution.current.promise
	}, [fn, delay])
}
