/*
 * Express LESS middleware.
 *
 * Copyright (C) 2015  Andrew A. Usenok
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    less = require('less');

module.exports = function(root, options) {
    options = options || {};
    root = root || __dirname + '/less';

    return function(req, res, next) {
        if (req.method != 'GET' && req.method != 'HEAD') {
            return next();
        }

        var pathname = url.parse(req.url).pathname;

        if (path.extname(pathname) != '.css') {
            return next();
        }

        var src = path.join(
            root,
            path.dirname(pathname),
            path.basename(pathname, '.css') + '.less'
        );

        fs.readFile(src, function(err, data) {
            if (err) return next();

            var opts = {};

            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    opts[key] = options[key];
                }
            }

            opts.paths = [
                path.join(
                    root,
                    path.dirname(pathname)
                )
            ];

            opts.filename = path.basename(src);

            less.render(new String(data), opts, function(err, output) {
                if (err) {
                    if (options.debug) {
                        less.writeError(err);
                    }

                    return res.sendStatus(500);
                }

                res.set('Content-Type', 'text/css');
                res.send(output.css);
            });
        });
    };
};
