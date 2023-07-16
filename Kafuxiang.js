/**************************************
作者:Zoo
日期:2023.07.16
https://fscrm.kraftheinz.net.cn/?from=nkOpOelAJ2CGfXST4N3J9g==    复制链接到vx打开 然后关注公众号 右下角参谋福利/会员中心签到
cookie获取脚本 签到的积分可兑换爱奇艺 腾讯视频会员 手机话费

注意!!!:Cookie有效期7天，7天之后需要重新获取Cookie

[rewrite_local]
https://fscrm.kraftheinz.net.cn/crm/public/index.php/api/v1/getUserInfo url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/KafuxiangCookie.js

[task_local]
30 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Kafuxiang.js, tag=卡夫享积分签到,enabled=true
[MITM]
hostname = fscrm.kraftheinz.net.cn
*****************************************/

const cookieName = '卡夫享'
const signurlKey = 'photonmang_signurl_kfx'
const signheaderKey = 'photonmang_signheader_kfx'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()  
function sign() {
  const url = { url: `https://fscrm.kraftheinz.net.cn/crm/public/index.php/api/v1/dailySign`, headers: JSON.parse(signheaderVal) }
  url.body = `{}`
  photonmang.post(url, (error, response, data) => {
   const title = `${cookieName}`
    let subTitle = ''
    const result = JSON.parse(data)
    if (result.error_code == 30001) {
      subTitle = `签到失败❌: ${result.msg}`
    } else  {
      subTitle = `签到结果: 签到成功！积分加1`
    } 
    photonmang.msg(title, subTitle,)
    photonmang.done()
  })
}
function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}



