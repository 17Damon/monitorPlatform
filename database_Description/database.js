let db;
//建库
db._createDatabase("monitorPlatform");

//授权数据库
var users = require("@arangodb/users");
users.grantDatabase("tester", "monitorPlatform");

//实体

//设备 Device

// 名称	            title	字符串
// 角色	            role	字符串	服务器：SERVER, PC：PC，车道机：TOLL_CLIENT
// 隶属机构	        department	字符串
// 隶属机构类型	    device_type	外键到ContentType
// 隶属机构id	        device_ object_id	PositiveIntegerField
// 隶属机构对象	    device_object	GenericForeignKey(‘device_type’, ‘device_object_id’)
// 用户名	        username	字符串
// 密码	            password	字符串
// 描述	            description	字符串
// 品牌	            brand	字符串
// 型号	            model_number	字符串
// cpu	            cpu	整形	单位GHZ
// 内存	            mem	整形	单位G
// 磁盘	            disk	整形	单位G
// IP地址	        ip	字符串
// 操作系统	        operate_system	字符串
// 开机时长	        uptime	整形	单位s

// 设备监控点 monitorInstance（设备与监控点的关系表）

    // 监控点	monitor_point	外键到MonitorPoint
    // 更新时间	modified	日期时间	auto_now=True
    // 值	value	字符串
    // 默认值	default_value	字符串
    // 值类型	value_type	字符串	int, float, boolean
    // 值单位	value_unit	字符串	%, K, M
    // 规则类型	rule_type	字符串	旗标: FLAG， 值域：RANGE
    // 规则分类	rule_class	字符串	危险: ALERT， 故障：ERROR
    // 参考值上限	top	字符串
    // 参考值下限	floor	字符串
    // 上限符号	top_symbol	字符串	>, >=, =, <, <=
    // 下限符号	floor_symbol	字符串	>, >=, =, <, <=
    // 持续时间	time_value	整形
    // 持续时间单位	time_unit	字符串	S, M, H
    // 持续时间符号	time_symbol	字符串	>, >=, =, <, <=
    // 状态	staus	字符串	正常，告警、故障


db._create("device");


db._query(`
            INSERT {
                        title: "报表计算机",
                        role: "pc",
                        department: "昌吉公路局",
                        device_type: 13,
                        device_ object_id: 12,
                        device_object: "bureau",
                        username: "root",
                        password: "future",
                        description: "测试",
                        brand: "DELL",
                        model_number: "I7",
                        cpu: 321,
                        mem: 312,
                        disk: 321,
                        ip: "10.65.8.70",
                        operate_system: "windows_10",
                        up_time: 312,
                        monitorInstance: [
                            {
                                
                            },
                        ]
                        
                        ping_status: "None",
                        software_list:[
                            {
                                version: "1.0",
                                title: "报表系统"
                            }
                        ],
                        laneequipment_list: [],
                        monitors: [
                            {
                                error_limited: "0-0",
                                monitor_status: "normal",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测硬盘",
                                monitor_class: "disk",
                                monitor_value: "100",
                                alert_limited: "0-0"
                            },
                            {
                                error_limited: "213-321",
                                monitor_status: "alert",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测内存",
                                monitor_class: "mem",
                                monitor_value: "80",
                                alert_limited: "20-100"
                            },
                            {
                                error_limited: "50-100",
                                monitor_status: "error",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测处理器",
                                monitor_class: "cpu",
                                monitor_value: "60",
                                alert_limited: "70-80"
                            }
                        ]
            },         
            IN device
            return NEW
        `).toArray();



db._query(`
            INSERT {
                        id: 1,
                        title: "报表计算机",
                        role: "pc",
                        department: "昌吉公路局",
                        content_type: 13,
                        content_type_name: "bureau",
                        username: "root",
                        password: "future",
                        description: "测试",
                        brand: "DELL",
                        model_number: "I7",
                        cpu: 321,
                        mem: 312,
                        disk: 321,
                        ip: "10.65.8.70",
                        operate_system: "windows_10",
                        up_time: 312,
                        ping_status: "None",
                        software_list:[
                            {
                                version: "1.0",
                                title: "报表系统"
                            }
                        ],
                        laneequipment_list: [],
                        monitors: [
                            {
                                error_limited: "0-0",
                                monitor_status: "normal",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测硬盘",
                                monitor_class: "disk",
                                monitor_value: "100",
                                alert_limited: "0-0"
                            },
                            {
                                error_limited: "213-321",
                                monitor_status: "alert",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测内存",
                                monitor_class: "mem",
                                monitor_value: "80",
                                alert_limited: "20-100"
                            },
                            {
                                error_limited: "50-100",
                                monitor_status: "error",
                                update_time: "2017-04-14 10:40:35",
                                title: "检测处理器",
                                monitor_class: "cpu",
                                monitor_value: "60",
                                alert_limited: "70-80"
                            }
                        ]
            },         
            IN device
            return NEW
        `).toArray();

//分页获取

db._query(`
LET deviceList = (For i in device
                    LIMIT offset,count
                return i
                )
            return {totalCount:LENGTH(device),deviceList:deviceList}
        `).toArray();

//检测点

// 监控点 MonitorPoint
//
// 名称	字段	值类型	备注
// 名称	title	字符串
// 默认值	default_value	字符串
// 值类型	value_type	字符串	int, float, boolean
// 值单位	value_unit	字符串	%, K, M
// 规则类型	rule_type	字符串	旗标: FLAG， 值域：RANGE
// 规则分类	rule_class	字符串	危险: ALERT， 故障：ERROR
// 参考值上限	top	字符串
// 参考值下限	floor	字符串
// 上限符号	top_symbol	字符串	>, >=, =, <, <=
// 下限符号	floor_symbol	字符串	>, >=, =, <, <=
// 持续时间	time_value	整形
// 持续时间单位	time_unit	字符串	S, M, H
// 持续时间符号	time_symbol	字符串	>, >=, =, <, <=

db._create("monitorPoint");

db._query(`
            INSERT {
                        id: 1689,
                        device_title: "10.65.8.70-DELL-报表计算机",
                        department_id: 1,
                        department_title: "新疆公路管理局",
                        alert_rule: "",
                        error_rule: "",
                        device_role: "pc",
                        modified: "2017-04-13 12:01:07",
                        title: "检测硬盘",
                        value: "100",
                        value_type: "int",
                        status: "normal",
                        device: 1,
                        monitor: 1,
                        monitor_class: 4                              
            },         
            IN monitorPoint
            return NEW
        `).toArray();


