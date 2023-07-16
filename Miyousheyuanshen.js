/**************************************
作者:Zoo
日期:2023.07.17
cookie获取:原神社区手动签到一次即可获取Cookie
1.复制Cookie脚本到重写
2.复制[task_local]内容到本地
3.圈x开抓包手动签到一次，然后关闭抓包搜https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign，把请求体文本查看，内容全部复制到url.body=`{复制到这个里面}` 然后保存到本地就可以了
4.关闭Cookie脚本
[rewrite_local]
https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/MiyousheyuanshenCookie.js
[task_local]
43 9 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/Miyousheyuanshen.js, tag=米游社原神社区签到,enabled=true
[MITM]
hostname = api-takumi.mihoyo.com
*****************************************/
const cookieName = '米游社原神'
const signurlKey = 'photonmang_signurl_miyousheyuanshen'
const signheaderKey = 'photonmang_signheader_miyousheyuanshen'
const photonmang = init()
const signurlVal = photonmang.getdata(signurlKey)
const signheaderVal = photonmang.getdata(signheaderKey)
sign()  
function sign() {
  const url = { url: `https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign`, headers: JSON.parse(signheaderVal) }
  url.body = `{}`
  photonmang.post(url, (error, response, data) => {
   const title = `${cookieName}`
    let subTitle = ''
    const result = JSON.parse(data)
    if (result.retcode == 0) {
      subTitle = `签到成功🎉:${result.message}`
    } else  {
      subTitle = `签到失败❌:${result.message}`
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


