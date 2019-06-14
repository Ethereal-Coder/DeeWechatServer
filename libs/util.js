'use strict'

var fs = require('fs')
var Promise = require('bluebird')

exports.readFileAsync = function(fpath, encoding){
    return new Promise(function(resolve, reject){
        fs.readFile(fpath, encoding, function(error, content){
            if(error){
                reject(error)
            }else{
                resolve(content)
            }
        })
    })
}

exports.writeFileAsync = function(fpath, content){
    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, content, function(error){
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}