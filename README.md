# Express LESS

On-the-fly LESS-to-CSS conversion middleware.

For more information on LESS visit [lesscss.org](http://lesscss.org/).

## Installation

    $ npm install express-less

## Usage

```js
var express = require('express'),
    expressLess = require('express-less');

var app = express();
app.use('/less-css', expressLess(__dirname + '/less'));
```
Now request to */less-css/styles.css* will return rendered contents of *./less/styles.less*.
**Note the change of file extension from `.less` to `.css`.**

Additionally, you can ask LESS to compress the result:

```js
app.use('/less-css', expressLess(__dirname + '/less', { compress: true }));
```

You can enable the cache system to improve performance:

```js
app.use('/less-css', expressLess(__dirname + '/less', { cache: true }));
```

For detail information on LESS errors use the `debug` option, e.g.

```js
// Enable error reporting permanently
app.use('/less-css', expressLess(__dirname + '/less', { debug: true }));

// or only for development environment
app.use('/less-css', expressLess(__dirname + '/less', {
    debug: app.get('env') == 'development'
}));
```

## Tests

    $ npm test

# License

Copyright (C) 2016 Andrew A. Usenok &lt;tooogle@mail.ru&gt;

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
