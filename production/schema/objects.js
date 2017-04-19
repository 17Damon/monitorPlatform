/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function Token(token) {
    _classCallCheck(this, Token);

    this.token = token;
};

var Message = exports.Message = function Message(type, code, content) {
    _classCallCheck(this, Message);

    this.type = type;
    this.code = code;
    this.content = content;
};

var DeviceList = exports.DeviceList = function DeviceList(totalCount, deviceList, pageInfo) {
    _classCallCheck(this, DeviceList);

    this.totalCount = totalCount;
    this.deviceList = deviceList;
    this.pageInfo = pageInfo;
};