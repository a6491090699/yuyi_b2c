var mobile_reg = /^1[3578][0-9]{9}$/;
function verify_mobile(){
    var val = $("#phone_mob").val();
    if(!mobile_reg.test(val)){
        $(".verify").show().html("请正确输入手机号码").css({
            color:"#ff710c",fontSize:"2.4rem"
        });
        $("#phone_mob").attr('has_error', 0);
        return false;
        //$(this).parent().css("borderBottomColor","#ff710c");
        //$(this).prev().css("color","#ff710c");
    }else{
        $(".verify").show().html("&#xe69a;").css({
            color:"#40d3b9",fontSize:"4rem"
        });
        //$(this).parent().css("borderBottomColor","#dddddd");
        $(this).prev().css("color"," #9c9c9c");
        $("#phone_mob").attr('has_error', 0);
        return true;
    }
}
function verify_password() {
    var val = $("#password").val();
    var reg=/^[0-9a-zA-Z]{6,20}$/;
    if(!reg.test(val)){
        $("#password").next().show().html("密码须为6-20位字母或数字");
        return false;
    }else{
        return true;
    }
}


//商品详情header样式变化
//window.onscroll=function(){
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
//            document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        function bg_change(){
            var header=$("#header_bg");
            var bg=$(document).scrollTop()/50;
            var icon_bg=0.5-bg<0?0:0.5-bg;
            var icon_color;
            if(icon_bg==0){
                icon_color="#9a9a9a";
            }else{
                icon_color="#fff";
            }
            header.css("backgroundColor","rgba(248,248,248,"+bg+")");
            header.find(".icon_container").css("backgroundColor","rgba(0,0,0,"+icon_bg+")").css("color",icon_color);
            header.find("h1").css("opacity",bg);
        }
        var startX = 0, startY = 0;
        $(window).on("touchstart", function (evt) {

        });
        $(window).on("touchmove", function (C) {
            bg_change();
        });
        $(window).on("touchend", function (f) {
            window.onscroll=function(){
                //function bg_change(){
                var header=$("#header_bg");
                var bg=$(document).scrollTop()/50;
                var icon_bg=0.5-bg<0?0:0.5-bg;
                var icon_color;
                if(icon_bg==0){
                    icon_color="#9a9a9a";
                }else{
                    icon_color="#fff";
                }
                header.css("backgroundColor","rgba(248,248,248,"+bg+")");
                header.find(".icon_container").css("backgroundColor","rgba(0,0,0,"+icon_bg+")").css("color",icon_color);
                header.find("h1").css("opacity",bg);
            }
        });
    } else {
        window.onscroll=function(){
            //function bg_change(){
            var header=$("#header_bg");
            var bg=$(document).scrollTop()/50;
            var icon_bg=0.5-bg<0?0:0.5-bg;
            var icon_color;
            if(icon_bg==0){
                icon_color="#9a9a9a";
            }else{
                icon_color="#fff";
            }
            header.css("backgroundColor","rgba(248,248,248,"+bg+")");
            header.find(".icon_container").css("backgroundColor","rgba(0,0,0,"+icon_bg+")").css("color",icon_color);
            header.find("h1").css("opacity",bg);
        }
    }
}
browserRedirect();

//购买商品数量
function changePrice(type) {
    var qty = document.forms['ECS_FORMBUY'].elements['quantity'].value;
    if (type == 1) {
        qty--;
    }
    if (type == 3) {
        qty++;
    }
    if (qty <= 0) {
        qty = 1;
    }
    if (!/^[0-9]*$/.test(qty)) {
        qty = document.getElementById('back_number').value;
    }
    document.getElementById('quantity').value = qty;
}
window.onload = function () {
    //动态设置购物车DD元素的高
    var card_goods=$(".cart_goods_details");
    var hg=card_goods.height();
    $(".cart_goods_details dl dd.compile_yes").css("height",hg);
//    input获得焦点时改变样式
    $(".register_input_form").find("input").focus(function () {
        $(this).parent().css("borderBottomColor", "#02C5A3");
        $(this).prev().css("color", "#02C5A3");
    }).blur(function () {
        $(this).parent().css("borderBottomColor", "#dddddd");
        $(this).prev().css("color", " #9c9c9c");
    });
//input失去焦点检测输入是否正确
    $("#tel").blur(function () {
        var reg = /^1[3578][0-9]{9}$/;
        var val = $("#tel").val();
        if (!reg.test(val)) {
            $(".verify").show().html("请正确输入手机号码").css({
                color: "#ff710c", fontSize: "2.4rem"
            });
            $(this).focus(function () {
                $(".verify").hide();
            });
            //$(this).parent().css("borderBottomColor","#ff710c");
            //$(this).prev().css("color","#ff710c");
        } else {
            $(".verify").show().html("&#xe69a;").css({
                color: "#40d3b9", fontSize: "4rem"
            });
            //$(this).parent().css("borderBottomColor","#dddddd");
            $(this).prev().css("color", " #9c9c9c");
        }
        $(this).focus(function () {
            $(this).next().hide();
        });
    });
//密码设置验证
    $("#password_set").blur(function () {
        var reg = /^[0-9a-zA-Z]{6,20}$/;
        var val = $(this).val();
        if (val.length < 6) {
            $(this).next().show().html("密码少于6位");
        } else {
            if (!reg.test(val)) {
                $(this).next().show().html("密码包含非法字符，请重新输入");
            }
        }
        $(this).focus(function () {
            $(this).next().hide();
        });
    });
//密码确认验证
    $("#password_affirm").blur(function () {
        var password = $("#password_set").val();
        var val = $(this).val();
        if (password !== val) {
            $(this).next().show().html("两次密码输入不一致，请重新输入");
        }
        $(this).focus(function () {
            $(this).next().hide();
        });
    });
//注册协议勾选
    $(".input_icon_container").click(function () {
        //e.cancelBubble =true;
        var ischecked = $(this).find("input[name='agree']").attr("checked");
        if (ischecked) {
            $(this).find("input[name='agree']").removeAttr("checked");
            $(".input_icon-checked-false").show();
            $(".input_icon-checked-true").hide();
        } else {
            $(this).find("input[name='agree']").attr("checked", "checked");
            $(".input_icon-checked-true").show();
            $(".input_icon-checked-false").hide();
        }
    });
//发票类型选择
    $(".invoice_type .input_radio-right input[type='radio']:checked").parent(".input_radio-right").addClass("input_radio_select");
    $(".invoice_type .input_radio-right").click(function () {
        console.log(123)
        $(".invoice_type .input_radio-right").removeClass("input_radio_select").find("input[type='radio']").attr("checked", false);
        $(this).addClass("input_radio_select").find("input[type='radio']").attr("checked", "checked");
        $("#invoice_type_text").html($(this).find('input').attr('text_value'));
    });
    $("#invoice_type").click(function () {
        console.log(123)
        popup_bg();
        console.log(123)
        $(".invoice_type").show();
    });

    //$("#pay_mode").click(function () {
    //    popup_bg();
    //    $(".pay_mode").show();
    //});
    //支付页面付款方式
    $(".pay_mode_container .input_radio-right input[type='radio']:checked").parent(".input_radio-right").addClass("input_radio_select");
    $(".pay_mode_container .input_radio-right").click(function () {
        $(".pay_mode_container .input_radio-right").removeClass("input_radio_select").find("input[type='radio']").prop("checked", false);
        $(this).addClass("input_radio_select").find("input[type='radio']").prop( "checked", true );
    });
    //取消选择关闭弹出
    $(".abolish_select_btn").click(function () {
        close_popup();
        $(".mask_layer").children().hide();
    });


//我的订单页面切换列表
    $(".order_nav-list>li").click(function () {
        var index = $(this).index();
        $(this).addClass("hover_list").siblings().removeClass("hover_list");
        if (index != 0) {
            $("ul[id^=hover_list-]").hide();
            $("ul[id^=hover_list-" + index + "]").show();
        } else {
            $("ul[id^=hover_list-]").show();
        }
    });
    //商品详情页面切换列表
    $(".goods_details_select-list>li").click(function () {
        var index = $(this).index();
        $(this).addClass("hover_li").siblings().removeClass("hover_li");
        $("[id^=hover_li-]").hide();
        $("[id^=hover_li-" + index + "]").show();
    });
//添加新地址默认选择
    $(".switch_off").click(function(){
        $(this).toggleClass("switch_open");
    });
    //选择默认地址 and 选择提现银行
    $(".input_radio input[type='radio']:checked").parent(".input_radio").addClass("input_radio_select");
    $(".input_radio").click(function(){
        $(".input_radio").removeClass("input_radio_select").find("input[type='radio']").attr("checked",false);
        $(this).addClass("input_radio_select").find("input[type='radio']").attr("checked","checked");
        var store_id = $(this).find('input').val();
        $(".pay_btn").hide();
        $("#pay_btn_"+store_id).show();
    });

    //采购和供应列表切换
    $(".supply_purchase-list>li").click(function(){
        var index=$(this).index();
        $(this).addClass("hover_list").siblings().removeClass("hover_list");
        if(index==0){
            $(".supply_information-list").show();
            $(".store_more_btn").show();
            $(".purchase_information-list").hide();
        }else if(index==2){
            $(".supply_information-list").hide();
            $(".purchase_information-list").show();
            $(".store_more_btn").hide();
        }
    });
    //实地查验弹出
    $("#check").click(function(){
        $(".mask_layer-translucence").show();
    });
    $(".tooltip_abolish_btn").click(function(){
        $(".mask_layer-translucence").hide();
    });


    //系统消息页面
    //    超出部分省略号替代
    $(".figcaption").each(function(i){
        var divH = $(this).height();
        var $p = $("p", $(this)).eq(0);
        var m=0;
        while ($p.outerHeight() > divH) {
            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            console.log(m++);
        }
    });
//编辑系统消息
    $("#messages_compile").click(function(){
        $(this).hide();
        $("#compile_accomplish").show();
        $("footer").show();
        var mess_list=$(".messages_list");
        mess_list.find(".messages_list-left").show().next().addClass("messages_list-right");
    });
//完成编辑
    $("#compile_accomplish").click(function(){
        $(this).hide();
        $("footer").hide();
        $("#messages_compile").show();
        var mess_list=$(".messages_list");
        mess_list.find(".messages_list-left").hide().next().removeClass("messages_list-right");
    });
//全选/取消
    var click_num=0;
    $("#select_all").click(
        function(){
            if(click_num++ %2==0){
                $(".messages_list").find(".input_checkbox").addClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",true);
            }else{
                $(".messages_list").find(".input_checkbox").removeClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",false);
            }
        });

//选择系统信息
    $(".messages_list .input_checkbox").click(function(){
        var tt=$(this).find("input[type='checkbox']").attr("checked");
        if(tt){
            $(this).removeClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",false);
        }else{
            $(this).addClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",true);
        }
    });
    //商品评价评分
    $("#goods_grade").children().click(function(){
        $("#goods_grade").children(".color_ffd016").removeClass("color_ffd016");
        $(this).addClass("color_ffd016").prevAll().addClass("color_ffd016");
    });
    //购物车商品选择编辑
        //店铺商品全选、全不选
    var click_num_cart=0;
    $("#cart_form .input_radio").click(function(){
        //if(click_num_cart++ %2==0) {
        $("#cart_form").find(".input_radio").removeClass("input_radio_select").find("input[type='radio']").attr("checked",false);
        $(this).addClass("input_radio_select").find("input[type='radio']").attr("checked", true);
        //}else{

        //}
    });
        //单个商品选择
    card_goods.find(".input_checkbox").click(function(){
        if($(this).is(".input_checkbox_select")){
            $(this).removeClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",false);
            if($(this).parent().prev().children(".cart_select_store_goods").is(".input_checkbox_select")){
                $(this).parent().prev().children(".cart_select_store_goods").removeClass("input_checkbox_select").find("input[type='checkbox']").attr("checked",false);
            }
        }else{
            $(this).addClass("input_checkbox_select").find("input[type='checkbox']").attr("checked", true);
        }
    });
        //编辑
    $(".cart_goods_btn-1").click(function(){
        $(this).hide().next(".cart_goods_btn-2").show().parent().parent().find(".cart_goods_details dd.compile_no").hide().next(".compile_yes").show();
    });
        //完成
    $(".cart_goods_btn-2").click(function(){
        $(this).hide().prev(".cart_goods_btn-1").show().parent().parent().find(".cart_goods_details dd.compile_no").show().next(".compile_yes").hide();
    });
        //删除
    $(".delete_cart_goods-btn").click(function(){
       $(this).closest(".cart_goods_details").remove();
    });
};
