/*
 * 全局变量
 */

var position_option = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 2000
};

var general_input_tpl = '<input type="{type}" name="{name}" value="{value}"/>';

var number_reg = /^[0-9]+((\.[0-9]{2})?|(\.[0-9]{1})?)$/;
var int_reg = /^[0-9]+$/;

var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;

/*
 * 常用方法
 */

//弹出黑色透明背景
function popup_bg(){
    var ww=$(window).height();
    $(".mask_layer").show().parents().css({
        "height": ww,
        "overflow": "hidden"
    });
}
//关闭黑色透明背景
function close_popup(){
    $(".mask_layer").hide().parents().css("height","").css("overflow","auto");
}

function get_rad(d){
    return d*PI/180.0;
}
function get_great_circle_distance(lat1,lng1,lat2,lng2){
    var radLat1 = get_rad(lat1);
    var radLat2 = get_rad(lat2);

    var a = radLat1 - radLat2;
    var b = get_rad(lng1) - get_rad(lng2);

    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s*EARTH_RADIUS;
    s = Math.round(s*10000)/10000.0;
    if(s<1000){
        s=s.toFixed(2)+'(m)';
    }else{
        s=(s/1000).toFixed(2)+'(km)';
    }
    return s;
}

