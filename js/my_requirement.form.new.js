/**
 * Created by fengkai on 2017/1/16.
 */



$(function(){

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
    expire_option_changed();

    //初始化联系人
    if(! require_id){
        $('#address_id').val(addresses_json[0]['id']);
    }
    address_select.init({trigger:$('#address_options'),value:$('#address_id').val(),data:addresses_json,position:"bottom",level:1,callback:address_option_changed});
    //触发联系人改变
    address_option_changed();


    //地区
    $(document).on('change','#zdytxt',function(){
        $("#from_region_names").val($("#zdytxt").val());
    });
    var area_data_url = "/index.php?app=mlselection&act=regions4app&up_level=2";
    $.getJSON(area_data_url,function(response){
        if(response.code == 0){
            areas_data = response.data;
            area_select.init({trigger:$('#region_name_select'),value:$('#from_region_id_full').val(),data:areas_data,position:"bottom",callback:area_changed, level:2});
        }
    });


    //商品名称动态匹配商品分类
    /*
    $("#title").keyup(function(){
        var requirement_title = $.trim($(this).val());
        if(requirement_title != '') {
            requirement_title_changed(requirement_title);
        }
    });
    */

    $('#title').bind('input propertychange', function() {
        var requirement_title = $.trim($(this).val());
        if(requirement_title != '') {
            requirement_title_changed(requirement_title);
        }
    });


    $("#submit_btn").click(function(){
        $("#requirement_form").trigger('submit');
    })

});

function area_changed(){
    var value = area_select.value;
    var text = area_select.text;
    $("#from_region_id").val(value[1]);
    $("#from_region_names").val(text[0] + " " + text[1]);
}

function address_option_changed(){
    var value = address_select.value;
    var text = address_select.text;
    $("#address_id").val(value[0]);
}


//分类改变
function gcategory_id_changed(){
    var rcategory_old_value_str = localStorage.getItem('rcategory_old_value');
    var rcategory_old_value = [];
    if(rcategory_old_value_str != '[,,]'){
        rcategory_old_value = JSON.parse(rcategory_old_value_str);
    }
    var new_value = gcategorySelect.value;
    var new_text = gcategorySelect.text;
    if(new_value.toString() == rcategory_old_value.toString()){
        console.log('gcategory same');
        return false;
    }else{
        console.log('load new category');
        var cate_id = new_value[2];
        var cate_name = new_text[0] + ' ' + new_text[1] + ' ' + new_text[2];


        $("#cate_id").val(cate_id);
        $("#cate_name").val(cate_name);


        localStorage.setItem('rcategory_old_value', JSON.stringify(new_value));

        if(page_initialized){
            goods_specs_old = new Array();
        }


        //单位
        get_gcategory_unit(cate_id);

        //属性
        get_gcategory_attributes(cate_id);
    }
}


//获取分类属性
function get_gcategory_attributes(cate_id){
    if(!page_initialized){
        $("#specs_input_div").empty();
        $("#specs_value_div").empty();
        var url = REAL_SITE_URL + '/index.php?app=mlselection&act=get_cate_attrs';
        $.getJSON(url, {cate_id:cate_id}, function(data){
            if(data.errNum == 0){
                var specs_value_div_header = '<div class="goods_norms_con clearfix font_26r">';
                var attrs  = data.retData;
                if(!$.isEmptyObject(attrs)){

                    for(var key in attrs){
                        var attribute = attrs[key];
                        var tpl_tmp = _.template(spec_input_line_tpl);
                        $("#specs_input_div").append(tpl_tmp(attribute));
                        specs_value_div_header += '<span>' + attribute.attr_name + '('+ attribute.unit +')</span>';
                    }

                    tpl_tmp = _.template(spec_input_num_tpl);
                    $("#specs_input_div").append(tpl_tmp(attribute));
                    specs_value_div_header += '<span>采购量</span>';
                }
                specs_value_div_header += '</div>';
                $("#specs_value_div").append(specs_value_div_header);
            }else{
                layer.open({content:data.errMsg, time:2});
            }
            page_initialized = true;
        });
    }
}



//获取分类单位
function get_gcategory_unit(cate_id){
    var get_unit_url = "/index.php?app=my_goods&act=get_gcategory_unit&cate_id="+cate_id;
    $.getJSON(get_unit_url,function(result){
        if(result.code==0 && result.unit!=false){
            $(".requirement_unit").val(result.unit);
        }
    });
}

function add_uploadedfile(file_data) {
    try{
        if(file_data.instance == 'requirement_thumb'){
            $('#img_requirement').attr('src', '{$site_url}/'+ file_data.thumbnail+'?'+(new Date().getTime()));
            $('input[name="requirement_file_id"]').val(file_data.file_id);
            $('input[name="thumb"]').val(file_data.thumbnail);
            $('input[name="raw_image"]').val(file_data.file_path)
        }
    }catch(e){
    }
}


//过期时间改变
function expire_option_changed(){
    var text = expireSelect.text;
    var value = expireSelect.value;
    var eov = parseInt(value[0]);
    var now = new Date();
    var theDate = '';
    switch(eov){
        case -1:
            theDate = $("#expire").attr('default_value');
            $("#expire_options").val(theDate);
            break;
        case 1:
            theDate = getTheTime(now, {type:'d',value:3});
            break;
        case 2:
            theDate = getTheTime(now, {type:'d',value:5});
            break;
        case 3:
            //newTimeMS = now.getTime()+86400000;
            theDate = getTheTime(now, {type:'d',value:7});
            break;
        case 4:
            //newTimeMS = now.getTime()+86400000;
            theDate = getTheTime(now, {type:'d',value:10});
            break;
        case 5:
            //newTimeMS = now.getTime()+86400000;
            theDate = getTheTime(now, {type:'d',value:15});
            break;
        case 6:
            //newTimeMS = now.getTime()+86400000;
            theDate = getTheTime(now, {type:'d',value:30});
            break;
        default:
            break;
    }
    $('#expire').val(theDate);
}

//商品名称改变
function requirement_title_changed(requirement_title){
    //匹配商品分类
    var url = "/index.php?app=mlselection&act=gcategory_breadpiece&return_single=1&top_cate_id=1&keyword="+encodeURIComponent(requirement_title);
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
