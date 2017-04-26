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
    modified_date: String!
}

#监控点类型
type MonitorType {
    title: String!
}

#监控点
type MonitorPoint {
    default_value: String!
    important: Boolean!
    monitor_type: MonitorType!
    title: String!
    value_type: String!
    value_unit: String!
}

#规则
type Rule {
    title: String!
    description: String!
    monitor_type: MonitorType!
    d_rule_type: String!
    d_rule_class: String!
    d_top: String!
    d_floor: String!
    top_symbol: String!
    floor_symbol: String!
    d_time_value: String!
    d_time_unit: String!	        
    d_time_symbol: String!	     
    e_rule_class: String!	    
    e_top: String!	            
    e_floor: String!	            
    e_time_value: String!	    
    e_time_unit: String!	        
    e_time_symbol: String!
}

#设备监控点关系表
type MonitorPointListItem {
    value: String!
    time_value: String!            
    monitorPoint_status: String!  
    modified: String!
    monitorPoint: MonitorPoint!
    rule: Rule! 
    monitor_type: MonitorType!           
}

#设备
type Device {
    id: String!
    title: String!
    role: String!
    department: String!
    device_type: String!
    device_object_id: String!
    device_object: String!
    username: String!
    password: String!
    description: String!
    brand: String!
    model_number: String!
    cpu: String!
    mem: String!
    disk: String!
    ip: String!
    operate_system: String!
    up_time: String!
    softwareList:[Software]
    monitorPointList: [MonitorPointListItem]
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