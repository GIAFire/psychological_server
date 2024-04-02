const express = require('express');
const router = express.Router();
const chatConfig = require("../utils/chatConfig")
const WebSocket = require('ws');
let modelDomain = "generalv3"; 
let txt = '';
let restxt = "";
router.post("/chat",(req,res)=>{
    // const url = chatConfig.getWebsocketUrl()
    let bigModel = new TTSRecorder()
    bigModel.connectWebSocket()
    console.log(restxt)
    res.send(restxt)
})

// 连接websocket


class TTSRecorder {

    // 连接websocket
    connectWebSocket() {
        return chatConfig.getWebsocketUrl().then(url => {
            let ttsWS = new WebSocket(url)
            ttsWS.onopen = e => {
                restxt = this.webSocketSend()
            }
            ttsWS.onmessage = e => {
                this.result(e.data)
            }
            ttsWS.onerror = e => {
                console.log("报错了");
                console.log(e);
            }
            ttsWS.onclose = e => {
                console.log(e)
            }
        })
    }


    // websocket发送数据
    webSocketSend() {
        var params = {
            "header": {
                "app_id": this.appId, "uid": "fd3f47e4-d"
            }, "parameter": {
                "chat": {
                    "domain": modelDomain, "temperature": 0.5, "max_tokens": 1024
                }
            }, "payload": {
                "message": {
                    "text": [{
                        "role": "user", "content": "中国第一个皇帝是谁？"
                    }, {
                        "role": "assistant", "content": "秦始皇"
                    }, {
                        "role": "user", "content": "秦始皇修的长城吗"
                    }, {
                        "role": "assistant", "content": "是的"
                    }, {
                        "role": "user", "content": txt
                    }]
                }
            }
        }
        console.log(JSON.stringify(params))
        
        return txt;
    }

    // websocket接收数据的处理
    result(resultData) {
        let jsonData = JSON.parse(resultData)
        total_res = total_res + resultData
        $('#output_text').val(total_res)
        // console.log(resultData)
        // 提问失败
        if (jsonData.header.code !== 0) {
            alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
            console.error(`${jsonData.header.code}:${jsonData.header.message}`)
            return
        }
        if (jsonData.header.code === 0 && jsonData.header.status === 2) {
            this.ttsWS.close()
            bigModel.setStatus("init")
        }
    }
}
module.exports = router;