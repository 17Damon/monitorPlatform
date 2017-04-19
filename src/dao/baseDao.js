/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

import {userDao} from './userDao';
import {deviceDao} from './deviceDao';

//allDao注册
var dao = {};
dao.user = userDao;
dao.deviceDao = deviceDao;


//baseDao
export function baseDao( module, method, params) {

    //promise
    console.log('baseDao');

    //can not find dao
    if(!dao[module]) {
        console.log('baseDao can not find dao['+module+']');
        return Promise.reject(
            'baseDao can not find dao['+module+']'
        );
    }

    return dao[module]( module, method, params);
}
