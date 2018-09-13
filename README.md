<h1 align="center">xivanalysis</h1>
<p align="center">tooltips</p>

React tooltip library for Final Fantasy XIV: Stormblood content, using data from [XIVAPI](https://xivapi.com/).

_**NOTE:** This package is primarily written for use in xivanalysis. While I've tried to make it as generically usable as possible, compatability and support for the xivanalysis client will always be preferenced._

## Example

```javascript
import {Provider, Tooltip} from '@xivanalysis/tooltips'

const Example = () => (
	<Provider language="ja">
		<Tooltip type="Action" id={3579}/>{/* Ruin III */}
	</Provider>
)
```
