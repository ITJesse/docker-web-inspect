'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBasicAuth = require('koa-basic-auth');

var _koaBasicAuth2 = _interopRequireDefault(_koaBasicAuth);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _docker = require('./docker');

var docker = _interopRequireWildcard(_docker);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

app.use((0, _koaLogger2.default)());

app.use(function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 14;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            if (!(_context.t0.status === 401)) {
              _context.next = 13;
              break;
            }

            ctx.status = 401;
            ctx.set('WWW-Authenticate', 'Basic');
            ctx.body = 'need authenticate';
            _context.next = 14;
            break;

          case 13:
            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.use((0, _koaBasicAuth2.default)({ name: _config2.default.name, pass: _config2.default.pass }));

app.use(_koaRoute2.default.get('/search_by_name/:name', docker.getByName));
app.use(_koaRoute2.default.get('/search_by_id/:id', docker.getById));
app.use(_koaRoute2.default.get('/all', docker.getAll));

app.listen(8000);