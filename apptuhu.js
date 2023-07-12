/**************************************
作者:Zoo
日期:2023.07.13
途虎app积分签到
cookie获取:打开途虎app我的页面获取Cookie后关闭脚本

[rewrite_local]
https://cl-gateway.tuhu.cn/cl-common-api/api/member/getSignInInfo url script-request-header https://raw.githubusercontent.com/Crazy-Z7/Task/main/apptuhuCookie.js

[task_local]
50 8 * * * https://raw.githubusercontent.com/Crazy-Z7/Task/main/apptuhu.js, tag=途虎app积分签到,enabled=true
[MITM]
hostname = cl-gateway.tuhu.cn
*****************************************/











const cookieName='途虎app'const signurlKey='photonmang_signurl_tuhu'const signheaderKey='photonmang_signheader_tuhu'const photonmang=init()const signurlVal=photonmang.getdata(signurlKey)const signheaderVal=photonmang.getdata(signheaderKey)function sign(){const url={url:`https:url.body='{}'photonmang.post(url,(error,response,data)=>{photonmang.log(`${cookieName},data:${data}`)const title=`${cookieName}`let subTitle=''let detail=''const result=JSON.parse(data)if(result.Code==1){subTitle=`签到结果:签到成功`detail+=`积分增加:${result.AddIntegral}`+`\n`detail+=`已连续签到:${result.NeedDays}`+`/7天`}else if(result.Code==0){subTitle=`签到结果:${result.Message}`}photonmang.msg(title,subTitle,detail)photonmang.done()})}function init(){isSurge=()=>{return undefined===this.$httpClient?false:true}isQuanX=()=>{return undefined===this.$task?false:true}getdata=(key)=>{if(isSurge())return $persistentStore.read(key)if(isQuanX())return $prefs.valueForKey(key)}setdata=(key,val)=>{if(isSurge())return $persistentStore.write(key,val)if(isQuanX())return $prefs.setValueForKey(key,val)}msg=(title,subtitle,body)=>{if(isSurge())$notification.post(title,subtitle,body)if(isQuanX())$notify(title,subtitle,body)}log=(message)=>console.log(message)get=(url,cb)=>{if(isSurge()){$httpClient.get(url,cb)}if(isQuanX()){url.method='GET'$task.fetch(url).then((resp)=>cb(null,{},resp.body))}}post=(url,cb)=>{if(isSurge()){$httpClient.post(url,cb)}if(isQuanX()){url.method='POST'$task.fetch(url).then((resp)=>cb(null,{},resp.body))}}done=(value={})=>{$done(value)}return{isSurge,isQuanX,msg,log,getdata,setdata,get,post,done}}
