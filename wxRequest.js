const axios = require('axios')

function wxReq(url, data) {
    return new Promise(function (resolve, reject) {
        {
            axios({
                url: url,
                data: data,
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'zh-cn',
                    'Referer': 'https://servicewechat.com/wx7c8d593b2c3a7703/3/page-frame.html',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B466 MicroMessenger/6.6.1 NetType/WIFI Language/zh_CN'
                }
            })
                .then(function (res) {
                    resolve(res.data)
                })
                .catch(function (e) {
                    reject(e)
                })
        }
    })
}

module.exports = wxReq