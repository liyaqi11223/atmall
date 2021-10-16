import $ from './library/jquery.js';

import cookie from './library/cookie.js';

// console.log($);

$.ajax({
    type: 'get',
    url: 'http://localhost/atianmao/interface/getitems.php',
    dataType: 'json'
}).then((res) => {
    // console.log(res);
    res.forEach((elm, i) => {
        let pic = JSON.parse(elm.picture);
        // console.log(pic);
        // template += `
        // `
        $(`.tmall_right>ul>li:eq(${i+1})>a>img`).attr('src', `${pic[0].src}`);
        $(`.tmall_right>ul>li:eq(${i+1})>a>.li_item_title`).text(`${elm.title}`);
        $(`.tmall_right>ul>li:eq(${i+1})>a>.price`).text(`￥${elm.price}`);
        $(`.tmall_right>ul>li:eq(${i+1})>a`).attr('href', `./detailpage.html?item=${elm.id}`);
        // console.log($(`.tmall_right>ul>li:eq(${i})>img`));
    })
}).catch(xhr => {
    console.log(xhr.status);
});


let uname = cookie.get('username');
// console.log(uname);

if (uname !== undefined) {
    $('#hd_left').html(`<span>欢迎回来!!&nbsp;&nbsp;&nbsp;<span><span>${uname}&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="" id="loginout">退出</a>`);
} else {
    $('#hd_left').html(` <span>喵，欢迎来天猫</span>
	<a href="./login.html" id="denglu">请登录</a>
	<a href="./register.html" id="zhuce">免费注册</a>`);
}

$('#loginout').on('click', function() {
    cookie.remove('username');
    location.reload();
})