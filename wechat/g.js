
'use strict'

var sha1 = require('sha1')
var Wechat = require('./wechat')
var RawBody = require('raw-body')
var util = require('./util')

module.exports = function(opts){
    var wechat = new Wechat(opts)

    return function *(next){
        console.log(this.query)
        var token  = opts.token
        var signature = this.query.signature
        var nonce = this.query.nonce
        var timestamp = this.query.timestamp
        var ecostr = this.query.ecostr
    
        var str = [token, timestamp, nonce].sort().join('')
        var sha = sha1(str)

        if (this.method === 'GET'){
            if (sha === signature){
                this.body = ecostr + ''
            }else{
                this.body = 'wrong'
            }
        }else if(this.method === 'POST'){
            if (sha !== signature){
                this.body = 'wrong'
                return false
            }

            var data = yield RawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            })

            var content = yield util.parseXmlAsync(data)

            console.log(data.toString())

            var msg = util.formatMsg(content.xml)
            console.log(msg)

            if (msg.MsgType === 'event'){
                if (msg.Event == 'subscribe'){
                    var now = new Date().getTime()

                    that.status = 200
                    that.type = 'application/xml'
                    that.body = '<xml>'+
                    '<ToUserName><![CDATA['+ msg.FromUserName +']]></ToUserName>'+
                    '<FromUserName><![CDATA['+ msg.ToUserName +']]></FromUserName>'+
                    '<CreateTime>'+ now +'</CreateTime>'+
                    '<MsgType><![CDATA[text]]></MsgType>'+
                    '<Content><![CDATA['+ 'hello sunyh' +']]></Content>'+
                    '</xml>'
                }
            }
        }
    
        
    }
}