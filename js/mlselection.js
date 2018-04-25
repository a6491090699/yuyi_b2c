/* 多级选择相关函数，如地区选择，分类选择
 * multi-level selection
 */


/* 手机端地区选择函数 */
function wap_regionInit(divId){
	$("#" + divId + "  select").change(wap_regionChange); // select的onchange事件
}

function wap_regionChange(){
	
	// 删除后面的select
    $(this).nextAll().detach(); //parents(".ui-select").
	// 计算当前选中到id和拼起来的name
    var selects = $("#region select").andSelf();//.siblings("select").andSelf();
    var id = 0;
    var names = new Array();
    for (i = 0; i < selects.length; i++)
    {
        sel = selects[i];
        if (sel.value > 0)
        {
            id = sel.value;
            name = sel.options[sel.selectedIndex].text;
            names.push(name);
        }
    }
    $(".region_mls_id").val(id);
    $(".region_mls_name").val(name);
    $(".region_mls_names").val(names.join("\t"));
    //店小二的基地页面，获取所选地区的经纬度信息
    if($("#is_waiter_baseaddress_page").val()=='yes'){
        wap_get_region_geo_info(id);
    }
    //添加银行卡页面，只显示两级分类   
    if($("#is_add_bankcard_form").val()=="yes"){
        if($("#region .ui-select").length>=2){
            return false;
        }
    }            
    // ajax请求下级地区
    if (this.value > 0)
    {
        var _self = $(this);
        var url = '/index.php?app=mlselection&type=region';
        $.getJSON(url, {'pid':this.value}, function(data){
            if (data.done)
            {
                if (data.retval.length > 0)
                {

                    $("<select><option>" + lang.select_pls + "</option></select>").change(wap_regionChange).insertAfter(_self);
					
                    var data  = data.retval;

                    for (i = 0; i < data.length; i++)
                    {
						 
						$(_self).next("select").append("<option value='" + data[i].region_id + "'>" + data[i].region_name + "</option>");
                     
                    }

					$("#region").trigger("create");//样式

                }
            }
            else
            {
                alert(data.msg);
            }
        });
    }
    
    /*
    if($("#is_add_bankcard_form").val()=="yes"){
        console.log($("#region .ui-select").length);
        if($("#region .ui-select").length>1){
            $("#region .ui-select").each(function(){
                if($(this).index()>0){
                    $(this).remove();
                }
            })
        }
    }
    */
    hide_region_error();
}

/* 地区选择函数 */
function regionInit(divId)
{
    $("#" + divId + " > select").change(regionChange); // select的onchange事件
    $("#" + divId + " > input:button[class='edit_region']").click(regionEdit); // 编辑按钮的onclick事件
}

function regionChange()
{
    // 删除后面的select
    $(this).nextAll("select").remove();

    // 计算当前选中到id和拼起来的name
    var selects = $(this).siblings("select").andSelf();
    var id = 0;
    var names = new Array();
    for (i = 0; i < selects.length; i++)
    {
        sel = selects[i];
        if (sel.value > 0)
        {
            id = sel.value;
            name = sel.options[sel.selectedIndex].text;
            names.push(name);
        }
    }
    $(".region_mls_id").val(id);
    $(".region_mls_name").val(name);
    $(".region_mls_names").val(names.join("\t"));
    //店小二的基地页面，获取所选地区的经纬度信息
    if($("#is_waiter_baseaddress_page").val()=='yes'){
        get_region_geo_info(id);
    }
    //添加银行卡页面，只显示两级分类
    if($("#bankcard_form #region select").length>=2){
        return false;
    }
    // ajax请求下级地区
    if (this.value > 0)
    {
        var _self = this;
        var url =  '/index.php?app=mlselection&type=region';
        $.getJSON(url, {'pid':this.value}, function(data){
            if (data.done)
            {
                if (data.retval.length > 0)
                {
                    $("<select class=\"select\"><option>" + lang.select_pls + "</option></select>").change(regionChange).insertAfter(_self);
                    var data  = data.retval;
                    for (i = 0; i < data.length; i++)
                    {
                        $(_self).next("select").append("<option value='" + data[i].region_id + "'>" + data[i].region_name + "</option>");
                    }
                }
            }
            else
            {
                alert(data.msg);
            }
        });
    }
    hide_region_error();
}
function hide_region_error(){
    $('#region').find('.error').hide();
}

function regionEdit()
{
    $(this).siblings("select").show();
    $(this).siblings("span").andSelf().hide();
}
//WAP端获取地区的经纬度信息
function wap_get_region_geo_info(region_id){
    //如果不能通过GPS获取位置信息，则读取数据库中的经纬度
    if($("#gps_get_geo_ok").val()=='no'){
        var url="/index.php?app=my_baseaddress&act=get_region_geo_info&region_id="+region_id;
        $.getJSON(url,{},function(region_info){
            if(region_info.region_id!=0){
                $("#lon").val(region_info.lon);
                $("#lat").val(region_info.lat);  
            }
        });
    }
}


//获取地区的经纬度信息
function get_region_geo_info(region_id){
    //如果不能通过GPS获取位置信息，则读取数据库中的经纬度
    if($("#gps_get_geo_ok").val()=='no'){
        var url="/index.php?app=my_baseaddress&act=get_region_geo_info&region_id="+region_id;
        $.getJSON(url,{},function(region_info){
            if(region_info.region_id!=0){
                $("#lon").val(region_info.lon);
                $("#lat").val(region_info.lat);  
            }
        });
    }
}

/* 商品分类选择函数 */
function gcategoryInit(divId)
{
	var elem_select = $("#" + divId + " > select");
	if(elem_select && elem_select.length>0){
		elem_select.get(0).onchange = gcategoryChange; // select的onchange事件
	    //$('#cate_id').onchange = gcategoryChange;
	}
    
    window.onerror = function(){return true;}; // 屏蔽jquery报错
    $("#" + divId + " .edit_gcategory").click(gcategoryEdit); // 编辑按钮的onclick事件
}

function testChange(){
	alert('haha');
}

function gcategoryChange()
{
    // 删除后面的select
    $(this).nextAll("select").remove();
    $(this).nextAll(".qcbox").remove();

    // 计算当前选中到id和拼起来的name
    //var selects = $(this).siblings("select").andSelf();
    var selects = $('.gcate_item');
    var id = 0;
    var names = new Array();
    for (i = 0; i < selects.length; i++)
    {
        sel = selects[i];
//        if (sel.value > 0)
//        {
        	if(sel.type=='text'){
        		id = sel.attributes['cate_id'].value; //sel.attr('cate_id');
        		name = sel.value;
        	}else{
        		id = sel.value;
        		name = sel.options[sel.selectedIndex].text;
        	}
            names.push(name);
//        }
    }
    $(".mls_id").val(id);
    $(".mls_name").val(name);
    $(".mls_names").val(names.join("\t"));

    // ajax请求下级分类
    if (this.value > 0)
    {
        var _self = this;
        var url = REAL_SITE_URL + '/index.php?app=mlselection&type=gcategory';
        var nattr = typeof($(this).attr('nattr'))=='undefined' ? '' : ' nattr='+$(this).attr('nattr');
        var player = typeof($(this).attr('layer'))=='undefined' ? 0 : parseInt($(this).attr('layer'));
        var clayer = player+1;
        var alayer =  (player==0) ? '' : ' layer="'+clayer+'"';
        
        $.getJSON(url, {'pid':this.value}, function(data){
            if (data.done)
            {
                if (data.retval.length > 0)
                {
                	if(player < 2){
	                    $('<select class="gcate_item gleft sel-type"'+alayer+nattr+'><option>' + lang.select_pls + '</option></select>').change(gcategoryChange).insertAfter(_self);
	                    var data  = data.retval;
	                    for (i = 0; i < data.length; i++)
	                    {
	                        $(_self).next("select").append('<option value="' + data[i].cate_id + '">' + data[i].cate_name + '</option>');
	                    }
                	}else{
                		var data  = data.retval;
                		var dd_items = '';
	                    for (i = 0; i < data.length; i++)
	                    {
	                        //$(_self).next("select").append('<option value="' + data[i].cate_id + '">' + data[i].cate_name + '</option>');
	                    	dd_items = dd_items+'<li key="'+data[i].cate_id+'"'+alayer+'><a href="javascript:void(0);" class="js_hotcate_maincate">'+data[i].cate_name+'</a><input type="hidden" data-pinyin="'+data[i].pinyin+'" data-first_letter="'+data[i].first_letter+'"/></li>';
	                    }
                		$('<div class="gleft qcbox qcate"><div class="label_container"></div>'+
                    			'<div class="box_wrapper">'+
                    				'<div id="main3t" class="box_container">'+
                    					'<div id="sinfo3t" class="sinfo" title=""></div>'+
                    					'<div class="sicon"></div>'+
                    					'<div style="clear:both"></div>'+
                    				'</div>'+
                    			'</div>'+
                    			'<input class="textbox gcate_item ctxt_item"'+nattr+alayer+' id="sele_cate_t'+clayer+'" name="sele_cate3t" tabindex="1" placeholder="汉字/拼音/简拼" value="" maxlength="50" autocomplete="off" cate_id="" />'+
                    			'<div class="pop_container">'+
                    				'<div class="pop_panel" style="display:none;">'+
                    					'<div class="gcate_hint">'+
                    						'<div id="__flightcatebox">'+
                    							'<div id="TG_PANEL_15" class="b_hct_lst" style="">'+
                    								'<dl class="e_hct_lst"><dt class="catechar"></dt>'+
                    									'<dd class="catename"><ul>'+dd_items+'</ul></dd></dl></div>'+
                    						'</div>'+
                    					'</div>'+
                    				'</div>'+
                    			'</div>'+
                    		 '</div>').insertAfter(_self);
                	}
                }
            }
            else
            {
                alert(data.msg);
            }
        });
    }
    
    // 如果需要读取分类对应的属性列表
    if($(this).attr("nattr") == "1"){
    	var url = REAL_SITE_URL + '/index.php?app=mlselection&type=attribute';
    	var layer = $(this).attr('layer');
    	$('.attr_item').each(function(){
    		if($(this).attr('layer') >= layer){
    			$(this).remove();
    		}
    	});
    	var selected_cate_id = this.type == 'text'? $(this).attr('cate_id'):$(this).val();
    	$.getJSON(url, {'cate_id':selected_cate_id}, function(data){
    		if (data.done)
            {
                if (data.retval.length > 0)
                {
                	var data  = data.retval;
                	var counter = 0;
                    for (i = 0; i < data.length; i++)
                    {
                    	if(data[i].attr_type=='sell'){
                    		var is_checked = '';
                    		var is_hide = '';
                    		
                    		if($('input.spec_choosen:checked').size() < 3){
                    			is_checked = ' checked="checked"';
                    		}else{
                    			//$('li.custom input.spec_choosen').removeAttr('checked');
                    			if($('#goods_id').val() == ''){
                    				//添加的时候
                    				if($('#spec_custom_2').attr('checked')){
                    					$('#spec_custom_2').removeAttr('checked');
                    					is_checked = ' checked="checked"';
                    				}else{
                    					if($('#spec_custom_1').attr('checked')){
                    						$('#spec_custom_1').removeAttr('checked');
                    						is_checked = ' checked="checked"';
                    					}
                    				}
                    			}else{
                    				//修改的时候，就不自动选择了
                    			}
                    		}
                    		if(is_checked==''){
                    			is_hide = ' style="display:none;"';
                    		}
                    		$('.spec_choosen').change();
                    		
                    		$('#spec_items > li.custom:first').before('<li class="attr_item" layer="'+layer+'"><label><input class="spec_choosen by_sys" name="spec_attr_items[]" type="checkbox" value="'+data[i].attr_id+'"'+is_checked+' /> '+data[i].attr_name+'</label></li>');
                    		var attr_name_desc = data[i].unit ? data[i].attr_name + '('+data[i].unit+')' : data[i].attr_name;
                    		$('#spec_editor > ul.th .custom:first').before('<li item="'+data[i].attr_id+'" class="distance1 attr_item  text_diy" layer="'+layer+'"'+is_hide+'>'+attr_name_desc+'<input name="spec_attr_'+($('#spec_items > li').length - 1)+'" type="hidden" value="'+data[i].attr_id+'" /></li>');
                    		$('#spec_editor > ul.td').each(function(){
                    			$(this).find('li.custom:first').before('<li item="'+data[i].attr_id+'" class="attr_item" layer="'+layer+'"'+is_hide+'><input name="spec_attr_'+data[i].attr_id+'[]" type="text" class=" text_diy width4 attr_'+data[i].input_mode+'" value="" /></li>');
                    		});
                    		
                    	}else{
                    		// 非销售属性
                    		var item_input = '<h2>'+data[i].attr_name+': </h2>';
                    		if(data[i].is_input == '1'){
                    			item_input += '<div class="arrange"><input name="attr_'+data[i].attr_id+'" class="text width_normal" type="text" value="" /><input name="g_attr_elem_'+data[i].attr_id+'" type="hidden" value="" /></div>';
                    		}else if(data[i].is_multi == '1'){
                    			//用checkbox方式显示
                    			var options = '';
                    			for(var j=0; j < data[i].attr_values.length; j++){
                    				options += '<label><input name="attr_'+data[i].attr_id+'[]" type="checkbox" value="'+data[i].attr_values[j].value_id+'" /> '+data[i].attr_values[j].value_name+'<input name="g_attr_elem_'+data[i].attr_id+'" type="hidden" value="" /></label>';
                				}
                    			if(options != ''){
                					item_input += '<div class="arrange"><span class="distance">'+options+'</span></div>';
                				}
                    		}else{
                    			if(data[i].attr_values.length > 4){
                    				//用select方式显示
                    				var options = '';
                    				for(var j=0; j < data[i].attr_values.length; j++){
                    					options += '<option value="'+data[i].attr_values[j].value_id+'">'+data[i].attr_values[j].value_name+'</option>';
                    				}
                    				if(options != ''){
                        				item_input += '<select name="attr_'+data[i].attr_id+'">'+options+'</select><input name="g_attr_elem_'+data[i].attr_id+'" type="hidden" value="" />';
                        			}
                    				
                    			}else if(data[i].attr_values.length > 0){
                    				//用radio方式显示
                    				var options = '';
                    				for(var j=0; j < data[i].attr_values.length; j++){
                    					options += '<label><input name="attr_'+data[i].attr_values[j].attr_id+'" type="radio" value="'+data[i].attr_values[j].value_id+'" /> '+data[i].attr_values[j].value_name+'</label>';
                    				}
                    				if(options != ''){
                    					item_input += '<div class="arrange"><span class="distance">'+options+'<input name="g_attr_elem_'+data[i].attr_id+'" type="hidden" value="" /></span></div>';
                    				}
                    			}
//                    			else{
//                    				item_input += '<div class="arrange"><input name="attr_'+data[i].attr_id+'[]" class="text width_normal" type="text" value="" /></div>';
//                    			}
                    		}
                    		var is_required = '';
                    		if(data[i].is_required){
                    			is_required = '<span class="red">*</span>';
                    		}
                    		if(data[i].attr_type == 'main'){
                    			$('#main_attributes').append('<li class="attr_item" layer="'+layer+'">'+item_input + is_required + '</li>');
                    		}else{
                    			$('#common_attributes').append('<li class="attr_item" layer="'+layer+'">'+item_input + is_required + '</li>');
                    		}
                    	}
                    }
                }
                //清零所有价格和库存信息
//                var data_rows = $("#spec_editor").children("ul[ectype=data]");
//                for(var i=0; i<data_rows.length-1; i++){
//                	data_rows[i].remove();
//                }
                $("#spec_editor").children("ul[ectype=data]:not(:last)").remove();
            }else{
            	alert(data.msg);
            }
    	});
    }
}

function gcategoryEdit()
{
    $(this).siblings("select").show();
    $(this).siblings("span").andSelf().remove();
}

