{
	"action": "1", 						--事件类型 1-连接 2-获取ID 3-消息 4-消息状态通知 5-心跳 11-获取联系人列表（全量）12-获取历史消息
	"fromId":"",            			--发送者id
	"toId":"",        					--接收者id
	"chatMsg": {
		"id": "",            			--消息id
		"type": 0,        				--消息类型（0-文本 1-文件）
		"message": "",          		--消息内容
		"status": 0,       				--消息状态（0-发送中 1-发送成功（未读） 2-已读）
		"time": "2021-12-14 12:00:00"   --消息时间
	}
}


一、连接场景：
客户端->服务端：
{
	"action": "1",
	"fromId":"HK0001"					--ID为HK0001的用户发起连接，1个客户端共享一个连接
}
服务端->客户端：
{
	"action": "1",
	"toId":"HK0001"						--ID为HK0001的用户连接成功
}


二、获取ID
客户端->服务端：
{
	"action": "2",
	"fromId":"HK0001"					--ID为HK0001的用户请求消息ID
}
服务端->客户端：
{
	"action": "2",
	"toId":"HK0001",					--ID为HK0001的用户请求消息ID
	"chatMsg": {
		"message": "MSG000001,MSG000002,MSG000003,MSG000004,MSG000005,MSG000006,MSG000007,MSG000008,MSG000009,MSG000010"
	}
}

三、发送消息
客户端<->服务端：
{
	"action": "3", 						
	"fromId":"HK0001",            		
	"toId":"HK0002",        			
	"chatMsg": {
		"id": "MSG000001",            			
		"type": 0,        				
		"message": "自定义文本消息",          		
		"status": 0,       				--发送中      				
		"time": "2021-12-14 12:00:00"
	}
}

四、消息确认
服务端->客户端：
{
	"action": "4", 						
	"fromId":"HK0002",            		
	"toId":"HK0001",        			
	"chatMsg": {
		"id": "MSG000001",        		
		"status": 1       				--发送成功（未读）
	}
}
服务端<->客户端：
{
	"action": "4", 						
	"fromId":"HK0002",            		
	"toId":"HK0001",        			
	"chatMsg": {
		"id": "MSG000001",        		
		"status": 2       				--已读
	}
}


五、心跳
客户端->服务端：
{
	"action": "5", 						
	"fromId":"HK0001"
}




十一、获取联系人列表（全量）
客户端->服务端：
{
	"action": "11", 						
	"fromId":"HK0001"
}

服务端->客户端：
{
	"action": "11", 						
	"toId":"HK0001",
	"contacts":[
		{
			"toId": "HK0002",
			"toName": "张三"
		},
		{
			"toId": "HK0003",
			"toName": "李四"
		}
	]
}

十二、获取历史消息
客户端->服务端：
{
	"action": "12", 						
	"fromId":"HK0001", 						
	"toId":"HK0002",     		--有toId表示只获取此联系人的历史消息，没有toId表示获取所有联系人的历史消息		
	"baseMsgId": "MSG000001",	--有值表示基于此消息之前的历史消息，没有值表示基于当前时间的历史消息
	"pageSize": 10				--获取消息条数
}

客户端->服务端：
{
	"action": "12", 
	"fromId":"HK0001", 						
	"toId":"HK0002",     		--有toId表示只获取此联系人的历史消息，没有toId表示获取所有联系人的历史消息		
	"historyMsgs": [
		{
			"fromId": "HK0001",
			"toId": "HK0002",
			"chatMsg": {
				"id": "MSG000001",            			
				"type": 0,        				
				"message": "自定义文本消息",          		
				"status": 0,		
				"time": "2021-12-14 12:00:00"
			}
		},
		{
			"fromId": "HK0001",
			"toId": "HK0002",
			"chatMsg": {
				"id": "MSG000002",            			
				"type": 0,        				
				"message": "自定义文本消息",          		
				"status": 0,		
				"time": "2021-12-14 12:00:00"
			}
		},
	]
}