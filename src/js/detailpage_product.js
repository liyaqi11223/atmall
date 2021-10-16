import $ from './library/jquery.js';

import './library/jquery-tabs.js'

import cookie from './library/cookie.js'
let id = location.search.split('=')[1];

// 选项卡
$('.tabs').tabs({
    ev: 'mouseenter',
    active: 'active',
    display: 'display'
});

// 渲染页面
$.ajax({
    type: 'get',
    url: 'http://localhost/atianmao/interface/getitem.php',
    data: { id },
    dataType: 'json'
}).then((res) => {

    // 将对象转为数组并使用foreach方法
    let div1 = Array.from($('.phone_big'));
    let li1 = Array.from($('#selec_left>ul>li'))
    let pic = JSON.parse(res.picture);
    div1.forEach((elm, i) => {
        $(elm).children('img').attr('src', `${pic[i].src}`);
    })
    li1.forEach((elm, i) => {
            $(elm).children('img').attr('src', `${pic[i].src}`);
        })
        // console.log(pic);
        // 选择对应元素放入数据库中的内容
    $('#selec_right>h1').text(`${res.title}`);
    $('#selec_right>.price>em').text(`${res.price}`);
    $('#selec_right>.number>._buynumber>input').attr('max', `${res.num}`);

    // 添加加入购物车点击事件

    $('.addto').on('click', function() {
        // alert(111);
        additem(res.id, $('._buynumber>input').val());

    })

}).catch(xhr => {
    console.log(xhr.status);
})



function additem(id, num) {
    let shop = cookie.get('shop')
    let product = { id, num }
    if (shop) {
        shop = JSON.parse(shop);
        // shop.push(product);


        if (shop.some(el => el.id == id)) {
            let index = shop.findIndex(elm => elm.id == id);
            let count = parseInt(shop[index].num);
            count += parseInt(num);
            shop[index].num = count;
        } else {


            shop.push(product);
        }

    } else {
        shop = [];
        shop.push(product);
    }
    cookie.set('shop', JSON.stringify(shop), 1);
}