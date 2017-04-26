/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

//数据库dao
import {baseDao} from '../dao/baseDao';

//objects
import {Token,Message,DeviceList} from './objects';

export const resolvers = {
    Query: {
        getToken() {
            let token = require('crypto').randomBytes(10).toString('hex');
            let message = new Message();
            message.type = "info";
            message.code = "00001";
            message.content = "this is a message test";
            console.log("token_test");
            console.log(token);
            return new Token(token);
            // return message;
        },
        getDeviceListResult(){

            let params = {};
            params.offset = arguments[1].offset;
            params.count = arguments[1].count;

            return baseDao('deviceDao', 'getDeviceListResultByOffsetAndCount', params)
                .then(obj=> {
                    let totalCount = obj[0].totalCount;
                    let deviceList = obj[0].deviceList;

                    let pageInfo = {
                        endCursor: 5,
                        hasNextPage: true
                    };

                    if (arguments[1].offset+arguments[1].count >= totalCount) {
                        pageInfo.endCursor = totalCount;
                        pageInfo.hasNextPage = false;
                    }else {
                        pageInfo.endCursor = arguments[1].offset+arguments[1].count;
                        pageInfo.hasNextPage = true;
                    }

                    return new DeviceList(totalCount,deviceList,pageInfo);
                }).catch(function (e) {
                console.log(e);

                //Message constructor(type,code,content) {
                return new Message("error","00001","数据库连接失败");
            });
            // return message;
        }
    }
};