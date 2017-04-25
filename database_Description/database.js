let db;
//建库
db._createDatabase("monitorPlatform");

//授权数据库
var users = require("@arangodb/users");
users.grantDatabase("tester", "monitorPlatform");

// -------------------- 实体 --------------------

// -------------------- 设备 Device --------------------

// 名称	            title	            字符串
// 角色	            role	            字符串	服务器：SERVER, PC：PC，车道机：TOLL_CLIENT
// 隶属机构	        department	        字符串
// 隶属机构类型	    device_type	        外键到ContentType
// 隶属机构id	        device_object_id	PositiveIntegerField
// 隶属机构对象	    device_object	    GenericForeignKey(‘device_type’, ‘device_object_id’)
// 用户名	        username	        字符串
// 密码	            password	        字符串
// 描述	            description	        字符串
// 品牌	            brand	            字符串
// 型号	            model_number	    字符串
// cpu	            cpu	                整形	单位GHZ
// 内存	            mem	                整形	单位G
// 磁盘	            disk	            整形	单位G
// IP地址	        ip	                字符串
// 操作系统	        operate_system	    字符串
// 开机时长	        uptime	            整形	单位s

// -------------------- softwareList 关系表属性 --------------------
// 软件列表          softwareList         [{}]
// -------------------- softwareList --------------------
// 软件ID	        software_fid	    字符串	ForeignKey外键到MonitorType

// -------------------- monitorPointList 关系表属性 --------------------
// 监控点列表         monitorPointList         [{}]
// -------------------- softwareList --------------------
// 监控点ID	         monitorPoint_fid	字符串	ForeignKey外键到monitorPoint
// 规则ID            rule_fid                字符串	ForeignKey外键到rule
// 监控点类型         monitor_type_fid        字符串	ForeignKey外键到MonitorType
// 值                value                   字符串
// 故障危险时间       time_value              字符串
// 监控点状态         monitorPoint_status     字符串  正常：NORMAL，危险：ALERT，故障：ERROR
// 更新时间           modified                字符串  auto_now=True



db._create("device");

db._query(`
            INSERT {
                        title: '报表计算机',
                        role: 'pc',
                        department: '昌吉公路局',
                        device_type: 13,
                        device_object_id: 12,
                        device_object: 'bureau',
                        username: 'root',
                        password: 'future',
                        description: '测试',
                        brand: 'DELL',
                        model_number: 'I7',
                        cpu: 321,
                        mem: 312,
                        disk: 321,
                        ip: '10.65.8.70',
                        operate_system: 'windows_10',
                        up_time: 312,
                        softwareList:[
                        {software_fid:'software/23482444'},
                        {software_fid:'software/23482444'}
                        ],
                        monitorPointList:[
                        {
                            monitorPoint_fid:'monitorPoint/23484428',
                            rule_fid:'rule/23484530',
                            monitor_type_fid:'monitorType/23484331',
                            value: "888",
                            time_value: "888",
                            monitorPoint_status: "NORMAL",
                            modified:"2017-04-25 18:00:00"
                        },
                        {
                            monitorPoint_fid:'monitorPoint/23484428',
                            rule_fid:'rule/23484530',
                            monitor_type_fid:'monitorType/23484331',
                            value: "888",
                            time_value: "888",
                            monitorPoint_status: "NORMAL",
                            modified:"2017-04-25 18:00:00"
                        }
                        ]
            }         
            IN device
            return NEW
        `).toArray();


// --------------------  监控点类型 MonitorType --------------------
//
// 名称	            title	            字符串	ping，mem，cpu，disk，等

db._create("monitorType");

db._query(`
            INSERT {
                        title: "ping"
            }         
            IN monitorType
            return NEW
        `).toArray();


// -------------------- 设备监控点 MonitorInstance --------------------
//
// 名称	            title	            字符串

//todo  去除
// 默认规则	        rule_id	            字符串

//todo  改 monitor_class -> monitor_type_fid
// 监控点类型	        monitor_type_fid	ForeignKey外键到MonitorType

// 默认值	        default_value	    字符串
// 值类型	        value_type	        字符串	int, float, boolean
// 值单位	        value_unit	        字符串	%, K, M
// 是否为关键监控点	important	        boolean

db._create("monitorPoint");

db._query(`
            INSERT {
                        title: "检测硬盘",
                        monitor_type_fid: "monitorType/23484331",
                        default_value: "default_value",
                        value_type: "value_type",
                        value_unit: "value_unit",
                        important: false
            }        
            IN monitorPoint
            return NEW
        `).toArray();

// -------------------- 软件 Software --------------------
//
// 名称	            title	            字符串
// 版本号	        version	            字符串

//todo  改 modified -> modified_date
// 更新时间	        modified_date	    字符串

db._create("software");

db._query(`
            INSERT {
                        title: "报表系统",
                        version: "1.0",
                        modified_date: "2017-04-25 18:00:00"
            }        
            IN software
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

// --------------------  规则 Rule --------------------
//
// 规则名称	        title	            字符串
// 规则描述	        description	        字符串

//todo  改 monitor_type -> monitor_type_fid
// 规则类型	        monitor_type_fid	字符串	ForeignKey外键到MonitorType
//todo  区分d danger || e error  上下限符号	是否需要区分？
// 危险规则类型	    d_rule_type	        字符串	旗标: FLAG， 值域：RANGE
// 危险规则分类	    d_rule_class	    字符串	危险: ALERT， 故障：ERROR
// 危险参考值上限	    d_top	            字符串
// 危险参考值下限	    d_floor	            字符串
// 上限符号	        top_symbol	        字符串	>, >=, =, <, <=
// 下限符号	        floor_symbol	    字符串	>, >=, =, <, <=
// 危险持续时间	    d_time_value	    整形
// 危险持续时间单位	d_time_unit	        字符串	S, M, H
// 危险持续时间符号	d_time_symbol	    字符串	>, >=, =, <, <=
// 故障规则类型	    e_rule_type	        字符串	旗标: FLAG， 值域：RANGE
// 故障规则分类	    e_rule_class	    字符串	危险: ALERT， 故障：ERROR
// 故障参考值上限	    e_top	            字符串
// 故障参考值下限	    e_floor	            字符串
// 故障持续时间	    e_time_value	    整形
// 故障持续时间单位	e_time_unit	        字符串	S, M, H
// 故障持续时间符号	e_time_symbol	    字符串	>, >=, =, <, <=

db._create("rule");

db._query(`
            INSERT {
                        title: "报表系统",
                        description: "description",
                        monitor_type_fid: "monitorType/123456789",
                        d_rule_type:"FLAG",
                        d_rule_class:"ALERT",
                        d_top: "",
                        d_floor: "",
                        top_symbol: "",
                        floor_symbol: "",
                        d_time_value: 0,
                        d_time_unit: "",	        
                        d_time_symbol: "",	     
                        e_rule_class: "",	    
                        e_top: "",	            
                        e_floor: "",	            
                        e_time_value: 0,	    
                        e_time_unit: "",	        
                        e_time_symbol: ""
            }        
            IN rule
            return NEW
        `).toArray();

