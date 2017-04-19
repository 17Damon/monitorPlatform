/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var typeDefs = exports.typeDefs = '\n\n#\u5206\u9875\u6D88\u606F\ntype PageInfo {\n    endCursor: Int!\n    hasNextPage: Boolean!\n}\n\n#\u8F6F\u4EF6\ntype Software {\n    version: String!\n    title: String!\n}\n\n#\u76D1\u63A7\u70B9\ntype Monitor {\n    error_limited: String!\n    monitor_status: String!\n    update_time: String!\n    title: String!\n    monitor_class: String!\n    monitor_value: String!\n    alert_limited: String!\n}\n\n#\u8BBE\u5907\ntype Device {\n    id: Int!\n    title: String!\n    role: String!\n    department: String!\n    content_type: Int!\n    content_type_name: String!\n    username: String!\n    password: String!\n    description: String!\n    brand: String!\n    model_number: String!\n    cpu: Int!\n    mem: Int!\n    disk: Int!\n    ip: String!\n    operate_system: String!\n    up_time: Int!\n    ping_status: String!\n    software_list:[Software]\n#    laneequipment_list: []\n    monitors: [Monitor]\n}\n\ntype DeviceList {\n    totalCount: Int!\n    deviceList: [Device]\n    pageInfo: PageInfo!\n}\n\ntype Token {\n    token: String!\n}\n\ntype Message {\n    type: String!\n    code: String!\n    content: String!\n}\n\n#\u8F93\u5165\u7C7B\u578B\u5173\u952E\u5B57input\n\n#\u8054\u5408\u7C7B\u578BGetTokenResult\nunion GetTokenResult =  Token | Message\n\n#\u8054\u5408\u7C7B\u578BGetDeviceListResult\nunion GetDeviceListResult =  DeviceList | Message\n\ntype Query {\n    getToken(id:ID!): GetTokenResult!\n    getDeviceListResult(offset:Int!,count:Int!): GetDeviceListResult!\n}\n\nschema {\n  query: Query\n}\n\n';