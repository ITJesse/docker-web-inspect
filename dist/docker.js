'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = exports.getById = exports.getByName = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _dockerode = require('dockerode');

var _dockerode2 = _interopRequireDefault(_dockerode);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _returnCode = require('./returnCode');

var returnCode = _interopRequireWildcard(_returnCode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docker = void 0;
if (_config2.default.socketPath && _config2.default.socketPath != 'null') {
  docker = new _dockerode2.default({ socketPath: _config2.default.socketPath });
} else if (_config2.default.host && _config2.default.port) {
  docker = new _dockerode2.default({ host: _config2.default.host, port: _config2.default.port });
} else {
  console.log("Cannot found docker socket config.");
  process.exit();
}

var getAllContainers = function getAllContainers() {
  return new _promise2.default(function (resolve, reject) {
    docker.listContainers(function (err, containers) {
      if (err) {
        return reject(err);
      } else {
        return resolve(containers);
      }
    });
  });
};

var getContainerByName = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name) {
    var containers, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, container, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, containerName;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            containers = void 0;
            _context.prev = 1;
            _context.next = 4;
            return getAllContainers();

          case 4:
            containers = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);
            throw new Error(_context.t0);

          case 10:
            result = null;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = (0, _getIterator3.default)(containers);

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 50;
              break;
            }

            container = _step.value;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 21;
            _iterator2 = (0, _getIterator3.default)(container.Names);

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 33;
              break;
            }

            containerName = _step2.value;

            if (!(containerName.substr(1) == name)) {
              _context.next = 28;
              break;
            }

            result = container;
            return _context.abrupt('break', 33);

          case 28:
            if (!result) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('break', 33);

          case 30:
            _iteratorNormalCompletion2 = true;
            _context.next = 23;
            break;

          case 33:
            _context.next = 39;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context['catch'](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 39:
            _context.prev = 39;
            _context.prev = 40;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 42:
            _context.prev = 42;

            if (!_didIteratorError2) {
              _context.next = 45;
              break;
            }

            throw _iteratorError2;

          case 45:
            return _context.finish(42);

          case 46:
            return _context.finish(39);

          case 47:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 50:
            _context.next = 56;
            break;

          case 52:
            _context.prev = 52;
            _context.t2 = _context['catch'](14);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 56:
            _context.prev = 56;
            _context.prev = 57;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 59:
            _context.prev = 59;

            if (!_didIteratorError) {
              _context.next = 62;
              break;
            }

            throw _iteratorError;

          case 62:
            return _context.finish(59);

          case 63:
            return _context.finish(56);

          case 64:
            return _context.abrupt('return', result);

          case 65:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 7], [14, 52, 56, 64], [21, 35, 39, 47], [40,, 42, 46], [57,, 59, 63]]);
  }));

  return function getContainerByName(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getContainerById = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id) {
    var containers, result, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, container;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            containers = void 0;
            _context2.prev = 1;
            _context2.next = 4;
            return getAllContainers();

          case 4:
            containers = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);
            throw new Error(_context2.t0);

          case 10:
            result = null;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 14;
            _iterator3 = (0, _getIterator3.default)(containers);

          case 16:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context2.next = 24;
              break;
            }

            container = _step3.value;

            if (!(container.Id == id)) {
              _context2.next = 21;
              break;
            }

            result = container;
            return _context2.abrupt('break', 24);

          case 21:
            _iteratorNormalCompletion3 = true;
            _context2.next = 16;
            break;

          case 24:
            _context2.next = 30;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t1 = _context2['catch'](14);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t1;

          case 30:
            _context2.prev = 30;
            _context2.prev = 31;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 33:
            _context2.prev = 33;

            if (!_didIteratorError3) {
              _context2.next = 36;
              break;
            }

            throw _iteratorError3;

          case 36:
            return _context2.finish(33);

          case 37:
            return _context2.finish(30);

          case 38:
            return _context2.abrupt('return', result);

          case 39:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 7], [14, 26, 30, 38], [31,, 33, 37]]);
  }));

  return function getContainerById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var buildContainerStatus = function buildContainerStatus(data) {
  return {
    id: data.Id,
    name: data.Names[0].substr(1),
    state: data.State,
    status: data.Status,
    ports: data.Ports
  };
};

var getByName = exports.getByName = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, name) {
    var container, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            container = void 0;
            _context3.prev = 1;
            _context3.next = 4;
            return getContainerByName(name);

          case 4:
            container = _context3.sent;
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](1);

            ctx.body = (0, _stringify2.default)(returnCode.serverError());
            throw new Error(_context3.t0);

          case 11:
            if (!container) {
              ctx.body = (0, _stringify2.default)(returnCode.containerNotFound(name));
            } else {
              result = buildContainerStatus(container);

              ctx.body = (0, _stringify2.default)(returnCode.resultOk(result));
            }

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 7]]);
  }));

  return function getByName(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var getById = exports.getById = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, id) {
    var container, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            container = void 0;
            _context4.prev = 1;
            _context4.next = 4;
            return getContainerById(id);

          case 4:
            container = _context4.sent;
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](1);

            ctx.body = (0, _stringify2.default)(returnCode.serverError());
            throw new Error(_context4.t0);

          case 11:
            if (!container) {
              ctx.body = (0, _stringify2.default)(returnCode.containerNotFound(id));
            } else {
              result = buildContainerStatus(container);

              ctx.body = (0, _stringify2.default)(returnCode.resultOk(result));
            }

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 7]]);
  }));

  return function getById(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var getAll = exports.getAll = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx) {
    var containers, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            containers = void 0;
            _context5.prev = 1;
            _context5.next = 4;
            return getAllContainers();

          case 4:
            containers = _context5.sent;
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](1);

            ctx.body = (0, _stringify2.default)(returnCode.serverError());
            throw new Error(_context5.t0);

          case 11:
            result = containers.map(function (contianer) {
              return buildContainerStatus(contianer);
            });

            ctx.body = (0, _stringify2.default)(returnCode.resultOk(result));

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 7]]);
  }));

  return function getAll(_x7) {
    return _ref5.apply(this, arguments);
  };
}();