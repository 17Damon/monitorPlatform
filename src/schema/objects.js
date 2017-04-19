/**
 * Created by zhubg on 2017/4/17.
 */
   
'use strict';

export class Token {
    constructor(token) {
        this.token = token;
    }
}

export class Message {
    constructor(type,code,content) {
        this.type = type;
        this.code = code;
        this.content = content;
    }

}

export class DeviceList {
    constructor(totalCount,deviceList,pageInfo) {
        this.totalCount = totalCount;
        this.deviceList = deviceList;
        this.pageInfo = pageInfo;
    }

}