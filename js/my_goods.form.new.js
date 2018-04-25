/**
 * Created by fengkai on 2016/12/28.
 */



$(function(){
    //初始化单位
    if($('#goods_unit').val() == ''){
        $('#goods_unit_btn').val(goods_unit_options[0].id);
        $('#goods_unit').val(goods_unit_options[0].name);
    }

    unitSelect.init({trigger:$('#goods_unit_btn'),value:$('#goods_unit').val(),data:goods_unit_options,position:"bottom",level:1,callback:goods_unit_changed});
    goods_unit_changed();


    //初始化商品分类
    $.getJSON(gcategory_data_url,function(response){
        if(response.code == 0){
            gcategory_data = response.data;
            if($('#gcategory_full_id').val() == ',,'){
                var first_gc1 = gcategory_data[0];
                var first_gc2 = first_gc1.child[0];
                var first_gc3 = first_gc2.child[0];
                var default_cate_id = first_gc1.id + ',' +  first_gc2.id + ',' + first_gc3.id;
                var default_cate_name = first_gc1.name + ' ' +  first_gc2.name + ' ' + first_gc3.name;
                $("#gcategory_full_id").val(default_cate_id);
                $("#gcategory_full_text").val(default_cate_name);
            }

            gcategorySelect.init({trigger:$('#gcategory_full_text'),value:$('#gcategory_full_id').val(),data:gcategory_data,position:"bottom",callback:gcategory_id_changed});
            //触发分类改变
            gcategory_id_changed();
        }
    });

    //初始化过期时间
    expireSelect.init({trigger:$('#expire_options'),value:$('#expire_option_id').val(),data:expire_options,position:"bottom",level:1,callback:expire_option_changed});
    //触发过期时间改变
    expire_option_changed(null, expireSelect.text, expireSelect.value);


    //商品名称动态匹配商品分类
    /*
    $("#goods_name").keyup(function(){
        var goods_name = $.trim($(this).val());
        if(goods_name != '') {
            goods_name_changed(goods_name);
        }
    });
    */

    $('#goods_name').bind('input propertychange', function() {
        var goods_name = $.trim($(this).val());
        if(goods_name != '') {
            goods_name_changed(goods_name);
        }
    });


    //删除图片
    $(".del_img").click(function () {
        drop_image($(this).parent().attr('file_id'));
    });

    //商品规格 层切换
    $("#goods_specification").click(function(){
        popup_bg();
        $(".goods_specification-container").show();
        $('#wap_description').css('display','none');//2017-5-26
        //关闭商品规格弹出
        $(".univalence_affirm_btn").click(function(){
            $(".goods_specification-container").hide();
            $('#wap_description').css('display','block');//2017-5-26
            close_popup();
        });
    });
    //商品单价 层切换
    $("#goods_univalence").click(function(){
        popup_bg();
        $(".goods_univalence-container").show();
        //关闭商品单价弹出
        $(".univalence_affirm_btn").click(function(){
            $(".goods_univalence-container").hide();
            $(".univalence_units_select").hide();
            close_popup();
        });
    });
    //商品单价 层切换
    $("#units_select").click(function(){
        $(".univalence_units_select").toggle('fast');
    });

    $("#univalence_btn").click(function(){
        var price = $("input[empty_name='price[]']").val();
        var minimum = $("input[empty_name='minimum[]']").val();
        var goods_unit = $("#goods_unit").val();
        $("#goods_univalence").find('span').html(price + '元/' + goods_unit + ' ' + minimum + goods_unit + '起售');
    });

    $("#spec_confirm_btn").click(function(){
        spec_confirm_btn_confirm();
    });

    $("#submit_btn").click(function(){
        $("#goods_form").trigger('submit');
    })

});

function spec_confirm_btn_confirm(){
    $("#specs_value_div_header").empty();
    $("#specs_value_div_body").empty();
    $("#spec_editor").children().each(function(){
        var attr_name = $(this).find('span').eq(0).html();
        var attr_value = $(this).find('input').eq(0).val();
        if($.trim(attr_value) == ''){
            attr_value = '&nbsp;';
        }
        $("#specs_value_div_header").append('<span>' + attr_name + '</span>');
        $("#specs_value_div_body").append('<span>' + attr_value + '</span>');
    });
    $("#specs_value_div").show();
}

//分类改变
function gcategory_id_changed(){
    var gcategory_old_value = JSON.parse(localStorage.getItem('gcategory_old_value'));
    var new_value = gcategorySelect.value;
    var new_text = gcategorySelect.text;
    if(new_value.toString() == gcategory_old_value.toString()){
        return false;
    }else{
        var cate_id = new_value[2];
        var cate_name = new_text[0] + ' ' + new_text[1] + '' + new_text[2];

        $("#cate_id").val(cate_id);
        $("#cate_name").val(cate_name);
        //$("#gcategory_full_text").attr('readonly', false);
        //$("#gcategory_full_text").val(cate_name);
        //$("#gcategory_full_text").attr('readonly', true);


        localStorage.setItem('gcategory_old_value', JSON.stringify(new_value));

        if(page_initialized){
            goods_specs_old = new Array();
            goods_spec_attr_1_old = "";
            goods_spec_attr_2_old = "";
            goods_spec_attr_3_old = "";
            goods_spec_attr_4_old = "";
            goods_spec_attr_5_old = "";
        }


        //单位
        get_gcategory_unit(cate_id);

        //属性
        get_gcategory_attributes(cate_id);
    }
}


//获取分类属性
function get_gcategory_attributes(cate_id){
    var get_attr_url = "/index.php?app=mlselection&act=gcategory_attributes&cate_id="+cate_id;
    $("#spec_editor").empty();
    $("#spec_attr_items").empty();
    $.getJSON(get_attr_url,function(result){
        if(result.code == 0){
            var data = result.data;

            attrs_total = data.length;

            for (var i = 0; i < data.length; i++) {
                var attribute = data[i];
                //销售属性 start
                if(attribute.attr_type=='sell'){
                    attribute.spec_id = "";
                    var matched_attr_id = "";
                    var matched_attr_value = "";
                    if(! _.isUndefined(goods_specs_old.specs) && goods_specs_old.specs != null){
                        var default_spec = goods_specs_old.specs[0];

                        attribute.spec_id = default_spec.spec_id;

                        if(attribute.attr_id == goods_spec_attr_1_old){
                            matched_attr_id = attribute.attr_id;
                            matched_attr_value = default_spec.spec_attr_1;
                        }
                        if(attribute.attr_id == goods_spec_attr_2_old){
                            matched_attr_id = attribute.attr_id;
                            matched_attr_value = default_spec.spec_attr_2;
                        }
                        if(attribute.attr_id == goods_spec_attr_3_old){
                            matched_attr_id = attribute.attr_id;
                            matched_attr_value = default_spec.spec_attr_3;
                        }
                        if(attribute.attr_id == goods_spec_attr_4_old){
                            matched_attr_id = attribute.attr_id;
                            matched_attr_value = default_spec.spec_attr_4;
                        }
                        if(attribute.attr_id == goods_spec_attr_5_old){
                            matched_attr_id = attribute.attr_id;
                            matched_attr_value = default_spec.spec_attr_5;
                        }
                    }

                    if(attribute.input_mode == 'select'){
                        var select_data = new Array();
                        for(var k in attribute['attr_values']){
                            var attr_value_tmp =attribute['attr_values'][k];
                            select_data.push({id:attr_value_tmp.value_name, name:attr_value_tmp.value_name});
                        }
                        if(matched_attr_value !='' ){
                            attribute.default_value = matched_attr_value;
                        }else{
                            attribute.default_value = select_data[0]['name'];
                        }
                        var attr_select_mp = new MobileSelectArea();
                        var trigger_id = "spec_attr_" + attribute.attr_id + "_text";
                        var value_id = "spec_attr_" + attribute.attr_id + "val";
                        var tpl = _.template(gcategory_attribute_select_tpl);
                        $("#spec_editor").append(tpl(attribute));
                        attr_select_mp.init({trigger:$('#'+trigger_id),value:$('#'+value_id).val(),data:select_data,position:"bottom",level:1, callback: spec_confirm_btn_confirm});
                        //goods_attr_data.push({id:attribute.attr_id,attribute:attribute,select_data:select_data,mobile_select_obj:attr_select_mp});
                    }else{
                        if(matched_attr_value !='' ){
                            attribute.default_value = matched_attr_value;
                        }else{
                            attribute.default_value = "";
                        }
                        var tpl = _.template(gcategory_attribute_text_tpl);

                        $("#spec_editor").append(tpl(attribute));
                    }

                    $("#spec_attr_items").append('<input type="hidden" style="display:none;" name="spec_attr_items[]" value="' + attribute.attr_id + '"/>');

                    if(matched_attr_value != ''){
                        $("#spec_attr_items").append('<input name="spec_id['+ default_spec.spec_id +']" item="spec_id" type="hidden" value="' + default_spec.spec_id + '" />');
                    }
                }
            }

            if(page_initialized){
                $('.spec_attr_input').each(function(){
                    if($(this).attr('name') != $(this).attr('empty_name')){
                        $(this).attr('name', $(this).attr('empty_name'));
                        $(this).val('');
                    }
                })
            }

            //销售属性 end
            page_initialized = true;

            //显示所填的规格
            $("#univalence_btn").trigger('click');
            $("#spec_confirm_btn").trigger('click');
        }
    });
}


//单位
function goods_unit_changed(){
    $("#goods_unit_btn").val(unitSelect.text[0]);
    $("#goods_unit").val(unitSelect.text[0]);
}

//获取分类单位
function get_gcategory_unit(cate_id){
    var get_unit_url = "/index.php?app=my_goods&act=get_gcategory_unit&cate_id="+cate_id;
    $.getJSON(get_unit_url,function(result){
        if(result.code==0 && result.unit!=false){
            var unit_value = new Array();
            unit_value.push(result.unit);
            unit_value.push(0);
            unit_value.push(0);

            unitSelect.text = unit_value;
            unitSelect.value = unit_value;

            goods_unit_changed();
        }
    });
}

function drop_image(goods_file_id)
{
    layer.open({
        content: '确定要删除吗？删除后不可恢复。',
        btn: ['删除', '取消'],
        yes: function(index){
            layer.close(index);
            var url = '/index.php?app=my_goods&act=drop_image';
            $.getJSON(url, {'id':goods_file_id}, function(data){
                if (data.done)
                {
                    $('*[file_id="' + goods_file_id + '"]').remove();
                    //set_cover($("#goods_images li:first-child").attr('file_id'));
                    var files_count = $("input[name='goods_file_id[]']").size();
                    if (files_count >= 1) {
                        $('#is_uploaded').val('true');
                    } else {
                        $('#is_uploaded').val('');
                    }
                }
                else
                {
                    layer.open({content:data.msg, time:3})
                }
            });
        },
        no: function(index){
            layer.closeAll(index);
        }
    });
}

function display_image_upload_notice() {
    $("#image_upload_notice").show();
}

function add_uploadedfile(file_data) {
    if (file_data.instance == 'goods_image') {
        var tpl = _.template(goods_uploaded_img_tpl);
        $('#btn_add_image').before(tpl(file_data));
        var files_count = $("input[name='goods_file_id[]']").size();
        if (files_count >= 1) {
            $('#is_uploaded').val('true');
        } else {
            $('#is_uploaded').val('');
        }
        $("#image_upload_notice").hide();
    }
}

function get_rad(d) {
    return d * PI / 180.0;
}
/**
 * caculate the great circle distance
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function get_great_circle_distance(lat1, lng1, lat2, lng2) {
    var radLat1 = get_rad(lat1);
    var radLat2 = get_rad(lat2);

    var a = radLat1 - radLat2;
    var b = get_rad(lng1) - get_rad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    return s;
}

function array_resort_by_key(order, sort_by) {
    var ord_alpah = (order == 'asc') ? '>' : '<';
    var sortFun = new Function('a', 'b', 'return a.' + sort_by + ord_alpah + 'b.' + sort_by + '?1:-1');
    return sortFun;
}

function make_baseaddress_list_options(baseaddress_list_json) {
    var new_list = new Array();
    for (var i = 0; i < baseaddress_list_json.length; i++) {
        var baseaddress_a = baseaddress_list_json[i];
        baseaddress_a['name'] = baseaddress_a.name+'【'+baseaddress_a.region_name+'】';
        if((edit_baseaddress_id > 0 && baseaddress_a.baseaddress_id == edit_baseaddress_id) || (edit_baseaddress_id ==0 && i==0)){
            $('#baseaddress_options').val(baseaddress_a['name']);
            $('#baseaddress_id').val(baseaddress_a['id']);
        }
        new_list.push(baseaddress_a);
    }
    baseaddress_list_json = new_list;
    var baseaddress_select = new MobileSelectArea();
    baseaddress_select.init({trigger:$('#baseaddress_options'),value:$('#baseaddress_id').val(),data:baseaddress_list_json,position:"bottom",level:1});

}


//过期时间改变
function expire_option_changed(scroller,text,value){
    var eov = parseInt(value[0]);
    var now = new Date();
    var theDate = '';
    switch(eov){
        case -1:
            theDate = $("#expire").attr('default_value');
            $("#expire_options").val(theDate);
            break;
        case 1:
            theDate = getTheTime(now, {type:'d',value:1});
            break;
        case 2:
            theDate = getTheTime(now, {type:'d',value:3});
            break;
        case 3:
            theDate = getTheTime(now, {type:'d',value:7});
            break;
        case 4:
            theDate = getTheTime(now, {type:'M',value:1});
            break;
        case 5:
            theDate = getTheTime(now, {type:'M',value:3});
            break;
        case 6:
            theDate = getTheTime(now, {type:'M',value:6});
            break;
        case 7:
            theDate = getTheTime(now, {type:'y',value:1});
            break;
        default:
            break;
    }
    $('#expire').val(theDate);
}

//商品名称改变
function goods_name_changed(goods_name){
    //匹配商品分类
    var url = "/index.php?app=mlselection&act=gcategory_breadpiece&return_single=1&keyword="+encodeURIComponent(goods_name);
    $.getJSON(url,function(result){
        if(result.code==0 && result.data){
            var first_gc3 = result.data;
            var first_gc2 = first_gc3.parent_cate;
            var first_gc1 = first_gc3.grand_cate;
            var default_cate_id = first_gc1.cate_id + ',' +  first_gc2.cate_id + ',' + first_gc3.cate_id;
            var default_cate_name = first_gc1.cate_name + ' ' +  first_gc2.cate_name + ' ' + first_gc3.cate_name;
            $("#gcategory_full_id").val(default_cate_id);
            $("#gcategory_full_text").val(default_cate_name);

            var text_arr = new Array();
            text_arr[0] = first_gc1.cate_name;
            text_arr[1] = first_gc2.cate_name;
            text_arr[2] = first_gc3.cate_name;

            var id_arr = new Array();
            id_arr[0] = first_gc1.cate_id;
            id_arr[1] = first_gc2.cate_id;
            id_arr[2] = first_gc3.cate_id;

            //重新设定MobileSelectArea打开时选定的值
            gcategorySelect.text = text_arr;
            gcategorySelect.value = id_arr;

            //触发分类改变
            gcategory_id_changed();
        }
    });
}


