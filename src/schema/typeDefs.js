/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

export const typeDefs = `

#分页消息
type PageInfo {
    endCursor: Int!
    hasNextPage: Boolean!
}

#软件
type Software {
    version: String!
    title: String!
}

#监控点
type Monitor {
    error_limited: String!
    monitor_status: String!
    update_time: String!
    title: String!
    monitor_class: String!
    monitor_value: String!
    alert_limited: String!
}

#设备
type Device {
    id: Int!
    title: String!
    role: String!
    department: String!
    content_type: Int!
    content_type_name: String!
    username: String!
    password: String!
    description: String!
    brand: String!
    model_number: String!
    cpu: Int!
    mem: Int!
    disk: Int!
    ip: String!
    operate_system: String!
    up_time: Int!
    ping_status: String!
    software_list:[Software]
#    laneequipment_list: []
    monitors: [Monitor]
}

type DeviceList {
    totalCount: Int!
    deviceList: [Device]
    pageInfo: PageInfo!
}

type Token {
    token: String!
}

type Message {
    type: String!
    code: String!
    content: String!
}

#输入类型关键字input

#联合类型GetTokenResult
union GetTokenResult =  Token | Message

#联合类型GetDeviceListResult
union GetDeviceListResult =  DeviceList | Message

type Query {
    getToken(id:ID!): GetTokenResult!
    getDeviceListResult(offset:Int!,count:Int!): GetDeviceListResult!
}

schema {
  query: Query
}

`;