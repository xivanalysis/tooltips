import React, {ReactElement, useContext} from 'react'
import {Context} from '../context'

export interface IconProps {
	src: string
}

export const Icon = ({src}: IconProps): ReactElement => {
	const {baseUrl} = useContext(Context)

	return <img src={baseUrl + src} />
}
