import React, {ReactElement, useContext} from 'react'
import {Context} from '../context'

export interface IconProps {
	src: string
	className?: string
}

export const Icon = ({src, className}: IconProps): ReactElement => {
	const {baseUrl} = useContext(Context)

	return <img src={baseUrl + src} className={className} />
}
