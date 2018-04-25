/* spec对象 */
function spec(id, spec1, spec2, spec3, spec4, spec5, spec6, spec7, price, stock, short_stock, minimum) {
	this.id = id;
	this.spec1 = spec1;
	this.spec2 = spec2;
	this.spec3 = spec3;
	this.spec4 = spec4;
	this.spec5 = spec5;
	this.spec6 = spec6;
	this.spec7 = spec7;
	this.price = price;
	this.stock = stock;
	this.short_stock = short_stock;
	this.minimum = minimum;
}

/* goodsspec对象 */
function goodsspec(specs, specAttrQty, specQty, defSpec) {
	this.specs = specs;
	this.specAttrQty = specAttrQty;
	this.specQty = specQty;
	this.totalQty = specAttrQty + specQty;
	this.defSpec = defSpec;
	this.spec1 = ''; // null
	this.spec2 = '';
	this.spec3 = '';
	this.spec4 = '';
	this.spec5 = '';
	this.spec6 = '';
	this.spec7 = '';
	this.selectedSpecs = new Array();
	this.selectedSpecsDesc = new Array();
	this.specItems = new Array();
	this.selectedNum = 0;
	if (this.specAttrQty >= 1 || this.specQty >= 1) {
		for ( var i = 0; i < this.specs.length; i++) {
			// 默认spec
			if (this.specs[i].id == this.defSpec) {
				// 系统规格
				if (this.specAttrQty > 0) {
					this.spec1 = this.specs[i].spec1;
					//this.selectedSpecs[1] = this.specs[i].spec1;
					//this.selectedNum++;
				}
				if (this.specAttrQty > 1) {
					this.spec2 = this.specs[i].spec2;
					//this.selectedSpecs[2] = this.specs[i].spec2;
					//this.selectedNum++;
				}
				if (this.specAttrQty > 2) {
					this.spec3 = this.specs[i].spec3;
					//this.selectedSpecs[3] = this.specs[i].spec3;
				}
				if (this.specAttrQty > 3) {
					this.spec4 = this.specs[i].spec4;
					//this.selectedSpecs[4] = this.specs[i].spec4;
				}
				if (this.specAttrQty > 4) {
					this.spec5 = this.specs[i].spec5;
					//this.selectedSpecs[5] = this.specs[i].spec5;
				}

				// 自定义规格
				if (this.specQty > 0) {
					this.spec6 = this.specs[i].spec6;
					//this.selectedSpecs[6] = this.specs[i].spec6;
					//this.selectedNum++;
				}
				if (this.specQty > 1) {
					this.spec7 = this.specs[i].spec7;
					//this.selectedSpecs[7] = this.specs[i].spec7;
					//this.selectedNum++;
				}

				break;
			}
		}
	}

	// 取得某字段的不重复值，如果有spec1，以此为条件
	this.getDistinctValues = function(field, spec1) {
		var values = new Array();
		for ( var i = 0; i < this.specs.length; i++) {
			var value = this.specs[i][field];
			if (spec1 != '' && spec1 != this.specs[i].spec1)
				continue;
			if ($.inArray(value, values) < 0) {
				values.push(value);
			}
		}
		return (values);
	}

	// 取得某字段的可选值
	this.getSelectableValues = function(fieldId) {
		var values = new Array();

		for ( var i = 0; i < this.specs.length; i++) {
			var badFlag = false;
			var value = this.specs[i]['spec' + fieldId]; // 'spec_'+
			for ( var scid in this.selectedSpecs) {
				if (this.selectedSpecs[scid] != undefined
						&& this.selectedSpecs[scid] != this.specs[i]['spec'	+ scid]
						&& scid!=fieldId) {
					// continue;
					badFlag = true;
					break;
				}
			}
			if (badFlag)
				continue;
//			if(this.selectedSpecs[fieldId]!=undefined && this.selectedSpecs[fieldId] != this.specs[i]['spec'+fieldId])continue;
			// if (spec1 != '' && spec1 != this.specs[i].spec1) continue;
			if ($.inArray(value, values) < 0) {
				values.push(value);
			}
		}
		return (values);
	}

	// 取得选中的spec
	this.getSpec = function() {
		for ( var i = 0; i < this.specs.length; i++) {
			if (this.specAttrQty >= 1 && this.specs[i].spec1 != this.spec1)
				continue;
			if (this.specAttrQty >= 2 && this.specs[i].spec2 != this.spec2)
				continue;
			if (this.specAttrQty >= 3 && this.specs[i].spec3 != this.spec3)
				continue;
			if (this.specAttrQty >= 4 && this.specs[i].spec4 != this.spec4)
				continue;
			if (this.specAttrQty >= 5 && this.specs[i].spec5 != this.spec5)
				continue;

			if (this.specQty >= 1 && this.specs[i].spec6 != this.spec6)
				continue;
			if (this.specQty >= 2 && this.specs[i].spec7 != this.spec7)
				continue;

			return this.specs[i];
		}
		return null;
	}

	// 初始化
	this.init = function() {
		for ( var i = 1; i <= 7; i++) {
			// col
			var specAttrValues = this.getDistinctValues('spec' + i, '');
			if (specAttrValues.length > 0 ) {
				//&& specAttrValues[i] != ''
				this.specItems[i] = specAttrValues;
				var optsSpecUL = $("#opts_spec_" + i);
				for ( var j = 0; j < specAttrValues.length; j++) {
					var unit = $(optsSpecUL).attr('dunit')!=undefined?$(optsSpecUL).attr('dunit'):'';
					optsSpecUL.append('<li class="selectable" spec_col_id="'+i+'" spec_col_value="'+specAttrValues[j]+'">' + specAttrValues[j] + unit +'</li>'); // + optsSpecUL.attr('dunit')
				}
			} else {
				this.specItems[i] = null;
			}
		}
	}
}

function slideUp_fn() {
	$('.ware_cen').slideUp('slow');
}

function shortStock(n){
	return n > 10000 ? (n/10000).toFixed(2)+'万':n;
}


$(function() {
	goodsspec.init();

	// 放大镜效果/
	if ($(".jqzoom img").attr('jqimg')) {
		$(".jqzoom").jqueryzoom({
			xzoom : 430,
			yzoom : 300
		});
	}

	// 图片替换效果
	$('.ware_box li').mouseover(
			function() {
				$('.ware_box li').removeClass();
				$(this).addClass('ware_pic_hover');
				$('.big_pic img').attr('src',
						$(this).children('img:first').attr('src'));
				$('.big_pic img').attr('jqimg', $(this).attr('bigimg'));
			});

	// 点击后移动的距离
	var left_num = -61;

	// 整个ul超出显示区域的尺寸
	var li_length = ($('.ware_box li').width() + 6) * $('.ware_box li').length
			- 305;

	$('.right_btn').click(function() {
		var posleft_num = $('.ware_box ul').position().left;
		if ($('.ware_box ul').position().left > -li_length) {
			$('.ware_box ul').css({
				'left' : posleft_num + left_num
			});
		}
	});

	$('.left_btn').click(function() {
		var posleft_num = $('.ware_box ul').position().left;
		if ($('.ware_box ul').position().left < 0) {
			$('.ware_box ul').css({
				'left' : posleft_num - left_num
			});
		}
	});

	// 加入购物车弹出层
	$('.close_btn').click(function() {
		$('.ware_cen').slideUp('slow');
	});
	
	//为属性动态绑定点击事件
	$('.chose-type li').bind('click',function(){
		if($(this).hasClass('unselectable')){
			return;
		}
		var num = $(this).attr("spec_col_id");
		var liObj = this;
		
		goodsspec['spec' + num ] = $(liObj).attr('spec_col_value'); //$(liObj).html();

		if($(liObj).hasClass("detail_year")){
			//已选中
			$(liObj).removeClass("detail_year");
			goodsspec.selectedSpecs[num] = undefined; //$(liObj).html();
			//$(liObj).siblings(".unselectable").attr("onclick", "selectSpec("+num+",this)").removeClass("unselectable");
		}else{
			//未选中
			$(liObj).addClass("detail_year");
			goodsspec.selectedSpecs[num] = $(liObj).attr('spec_col_value');
			goodsspec.selectedSpecsDesc[num] = $(liObj).parent().attr('data_attr')+':'+$(liObj).html();
			$(liObj).siblings(".detail_year").removeClass("detail_year");
		}
		
		for ( var i = 1; i <= 7; i++) {
			if (goodsspec.specItems[i] != null) {
				var specEnableValues = goodsspec.getSelectableValues(i);
				$('#opts_spec_'+i+' > li').each(function(j){
					if ($.inArray($(this).attr('spec_col_value'), specEnableValues) >= 0) {
						if(goodsspec.selectedSpecs[i] != undefined && $(this).attr('spec_col_value') == goodsspec.selectedSpecs[i]){
							//已被选中
						}else{
							//未被选中
						}
						if($(this).hasClass('unselectable')){
							$(this).removeClass('unselectable');
						}
					}else{
						//不可选
						$(this).addClass('unselectable');
					}
				});

			}
		}
		var spec = goodsspec.getSpec();
		if (spec != null) {
			$(".goods_price").html(goodsspec.selectedSpecsDesc.join(' '));
			$("[ectype='goods_price']").html('¥&nbsp;'+number_format(spec.price,2));
			$("[ectype='goods_stock']").html(spec.short_stock);
			$("[ectype='goods_minimum']").html(spec.minimum);
			$("#quantity").val(spec.minimum);
		}
		return;
	});
	
	$('.hm_reduce').click(function(){
		var currQty = parseInt($('#quantity').val());
		var spec = goodsspec.getSpec();
		var minimum = parseInt(spec.minimum);
		if(currQty > 1 && currQty > minimum){
			currQty = currQty - 1;
			$('#quantity').val(currQty);
		}
	})
	$('.hm_increase').click(function(){
		var currQty = parseInt($('#quantity').val());
		var spec = goodsspec.getSpec();
		var maxStock = parseInt(spec.stock);
		if(currQty < maxStock){
			currQty = currQty + 1;
			$('#quantity').val(currQty);
		}
	})
});