import $ from './library/jquery.js';

import cookie from './library/cookie.js';


let shop = cookie.get('shop');
if (shop) {
    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();
    $.ajax({
        type: 'get',
        url: '../../interface/getshop.php',
        data: {
            idList
        },
        dataType: 'json'
    }).then(res => {
        // console.log(res);

        let template = '';

        res.forEach((el, i) => {
            let picture = JSON.parse(el.picture);

            let current = shop.filter(elm => elm.id === el.id);
            // console.log(current);
            template += `  <li class="clearfix">
								<input type="checkbox" class="box" name="checkall">
								<img src="${picture[0].src}" alt="">
								<span style="width: 200px;">${el.title}</span>
								<em>￥${parseFloat(el.price).toFixed(2)}</em>
								<input type="number" value="${current[0].num}" max="${el.num}" min="1" class="num">
								<b>￥${(el.price * current[0].num).toFixed(2)}</b>
								<a href="javascript:" class="removeitem" data-id="${el.id}">删除</a>
							</li>`;

            $('.shopcar_value>ul').html(template).find('.removeitem').on('click', function() {
                let res = shop.filter(el => el.id !== $(this).attr('data-id'));
                cookie.set('shop', JSON.stringify(res), 1);
                location.reload();
            });
        })

		
		
		
    }).catch(xhr => {
		console.log(xhr.status);
    })
}
window.onload = function () {
	let all = document.querySelector('#all');
	let box = document.querySelectorAll('.box');
	all.onclick = function () {

		$('.box').prop('checked',true);
		if (!this.checked) {
			$('.box').prop('checked',false);
		}
	}

	

	$(document).on('click', '.box', function () {
		// let flag = true;
			// for (let k = 0; k <$('.box').length; k++){
			// 	if (!this.checked) {
			// 		flag = false;
			// 		console.log(flag);
			// 	}
		
			// }
		
		$('.box').each(function (i) {
			// console.log(this);
			console.log(this);
			// if (!this.prop('checked')) {
			// 	// flag = false;
			// 	$('.box').removeProp('checked',false);
			// } else {
			// 	$('.box').prop('checked',true);
			// }
		})

	  })


}