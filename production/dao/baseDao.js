/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseDao = baseDao;

var _deviceDao = require('./deviceDao');

//allDao注册
var dao = {};
dao.deviceDao = _deviceDao.deviceDao;

//baseDao
function baseDao(module, method, params) {

    //promise
    console.log('baseDao');

    //can not find dao
    if (!dao[module]) {
        console.log('baseDao can not find dao[' + module + ']');
        return Promise.reject('baseDao can not find dao[' + module + ']');
    }

    return dao[module](module, method, params);
}