const url = `https://api.03c3.cn/zb/api.php`;
const method = `GET`;
const headers = {
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {

$notify("每天60s讀報", '  ',' 點擊此處查看內容',{"open-url":JSON.parse(response.body).imageUrl});
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
