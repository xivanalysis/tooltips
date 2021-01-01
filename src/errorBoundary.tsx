import {PureComponent, ReactNode} from 'react'

export interface ErrorBoundaryProps {
	children?: ReactNode
}

interface ErrorBoundaryState {
	error?: Error
}

export class ErrorBoundary extends PureComponent<ErrorBoundaryProps> {
	state: ErrorBoundaryState = {}

	componentDidCatch(error: Error): void {
		this.setState({error})
	}

	render(): ReactNode {
		return this.state.error == null
			? this.props.children
			: this.state.error.toString()
	}
}
