"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var containerNotFound = exports.containerNotFound = function containerNotFound(info) {
  return {
    errorCode: -1,
    desp: "Container " + info + " cannot be found"
  };
};

var resultOk = exports.resultOk = function resultOk(info) {
  return {
    errorCode: 0,
    desp: "ok",
    data: info
  };
};

var serverError = exports.serverError = function serverError() {
  return {
    errorCode: -999,
    desp: "server error"
  };
};