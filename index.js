const aes = require('./aes')
const wxRequest = require('./wxRequest')

//const session = "DoUmU/vp/2coyEXY9yy0Ke+EDfQz0McLCtxsHDm7MSQDO/pTcZ19UdvoeelzbSY3L8oGzUhc7C9pvWzWNLQsPBPIvw1ZuUbQNuhSSmc5z9tenjH2DDwG86+ay4tKfhEeFgqTjcC2PJqnNqHyy1oMgg=="
//const score = 6666


const baseUrl = 'https://mp.weixin.qq.com/wxagame/'
const getFriendScoreUrl = baseUrl + 'wxagame_getfriendsscore'
const initeUrl = baseUrl + 'wxagame_init'
const settlementUrl = baseUrl + 'wxagame_settlement'




async function koaRouter(ctx, next) {
    let session = ctx.request.body.session
    let score = ctx.request.body.score

    if (!session || !score) {
        ctx.body = 'session 或 score 为空'
    } else {
        let base = {}
        base.session_id = session
        base.fast = 1
        let res = await wxRequest(getFriendScoreUrl, {
            base_req: base
        })
        
        if (res.base_resp.errcode !== 0) {
            ctx.body = 'session错误'
        } else {
            let times = res.my_user_info.times
            res = await wxRequest(initeUrl, {
                base_req: base,
                version: 9
            })
            console.log(res)

            let game_data = {}
            game_data.seed = new Date().getTime()

            let action = []
            let musicList = []
            let touchList = []

            for (let i = 0; i < score; i++) {
                action.push([+Math.random().toFixed(3), +Math.random().toFixed(2), false])
                musicList.push(false)
                touchList.push([200 + Number((2 * Math.random()).toFixed(0)), 250 + Number((2 * Math.random()).toFixed(0))])
            }

            game_data.action = action
            game_data.musicList = musicList
            game_data.touchList = touchList
            game_data.version = 1

            let encData = {}
            encData.score = score
            encData.times = times
            encData.game_data = JSON.stringify(game_data)

            //console.log(JSON.stringify(encData))
            encData = aes(JSON.stringify(encData), session)
            //console.log(encData)
            ctx.body = await wxRequest(settlementUrl, {
                base_req: base,
                action_data: encData
            })
        }
        
    }

    
}

module.exports = koaRouter

