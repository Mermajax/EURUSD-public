// Import necesary classes and functions
const config = require('./config.json')
const {call5min, call15min, callDaily} = require('./calls.js')
const { ActivityType } = require('discord.js');
const fs = require('fs');
// Export start loop function
module.exports={
    setNick
}
// Set clients nickname according to price
function setNick(client){
    let swch 
    callDaily()
    setInterval(callDaily, 86400000)
    call()
    setInterval(call, 300000)
    function call(){
        if(swch){swch=false}else{swch=true}
        call5min()
        call15min()
        setTimeout(nick, 3500)
    }
    function nick(){
        const data = JSON.parse(fs.readFileSync('intra5.json', 'utf-8'))
        try{
            console.log(data)
            for(i=0;i<config.guildsId.length;i++){
                client.guilds.cache.get(`${config.guildsId[i]}`).members.me.setNickname(`$${data} ${change()}`)
                client.user.setActivity(`${activity(swch)}`, { type: ActivityType.Watching })
            }
        }catch(e){
            console.log('An error has occurred')
            console.log(e)
        }
    }
}

// Set 24h and 7d price change as dsd activity
function activity(swch){
    const datadaily = JSON.parse(fs.readFileSync('daily.json', 'utf-8'))
    const data15 = JSON.parse(fs.readFileSync('intra15.json', 'utf-8'))
    const data = JSON.parse(fs.readFileSync('intra5.json', 'utf-8'))
    let dif; let base; let t
    if(swch){
        dif = (data-data15), base = data15, t = '24h: '
    }else{
        dif = (data-datadaily), base = datadaily, t = '7d: '
    }
    const chg= dif * 100 / base
    if(dif>0){return t+'+'+String(chg).substring(0, 5)+'%'}
    else{return t+String(chg).substring(0, 5)+'%'}
}
// Arrow up or down depending on the 24h price change
function change(){
    const data15 = JSON.parse(fs.readFileSync('intra15.json', 'utf-8'))
    const data = JSON.parse(fs.readFileSync('intra5.json', 'utf-8'))
    let chg = data-data15
    if(chg<0){
        return '(↘)'
    } else {
        return '(↗)'
    }
}