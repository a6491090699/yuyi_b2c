jQuery.extend({
  getCookie : function(sName) {
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++){
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) return decodeURIComponent(aCrumb[1]);
    }
    return '';
  },
  setCookie : function(sName, sValue, sExpires) {
    var sCookie = sName + "=" + encodeURIComponent(sValue);
    if (sExpires != null) sCookie += "; expires=" + sExpires;
    document.cookie = sCookie;
  },
  removeCookie : function(sName) {
    document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
  },
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
      return $.getUrlVars()[name];
  }

});
function drop_confirm(msg, url){
    if(confirm(msg)){
        window.location = url;
    }
}

/* 显示Ajax表单 */
function ajax_form(id, title, url, width)
{
    if (!width)
    {
        width = 400;
    }
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax', url);
    d.setWidth(width);
    d.show('center');

    return d;
}
function go(url){
    window.location = url;
}
function get_location_root(){
	return window.location.protocol+'//'+window.location.host;
}
//验证码增加了宽高
function change_captcha(jqObj,w,h){
    jqObj.attr('src', 'index.php?app=captcha&w='+w+'&h='+h+'&' + Math.round(Math.random()*10000));
}

/* 格式化金额 */
function price_format(price){
    if(typeof(PRICE_FORMAT) == 'undefined'){
        PRICE_FORMAT = '&yen;%s';
    }
    price = number_format(price, 2);

    return PRICE_FORMAT.replace('%s', price);
}

function number_format(num, ext){
    if(ext < 0){
        return num;
    }
    num = Number(num);
    if(isNaN(num)){
        num = 0;
    }
    var _str = num.toString();
    var _arr = _str.split('.');
    var _int = _arr[0];
    var _flt = _arr[1];
    if(_str.indexOf('.') == -1){
        /* 找不到小数点，则添加 */
        if(ext == 0){
            return _str;
        }
        var _tmp = '';
        for(var i = 0; i < ext; i++){
            _tmp += '0';
        }
        _str = _str + '.' + _tmp;
    }else{
        if(_flt.length == ext){
            return _str;
        }
        /* 找得到小数点，则截取 */
        if(_flt.length > ext){
            _str = _str.substr(0, _str.length - (_flt.length - ext));
            if(ext == 0){
                _str = _int;
            }
        }else{
            for(var i = 0; i < ext - _flt.length; i++){
                _str += '0';
            }
        }
    }

    return _str;
}

/* 收藏商品 */
function collect_goods(id)
{
    var url = get_location_root() + '/index.php?app=my_favorite&act=add&type=goods&ajax=1'; //SITE_URL
    $.getJSON(url, {'item_id':id}, function(data){
        layer.open({content:data.msg, time:2});
        if(data.done){
            $("#goods_collected_span").show();
            $("#goods_not_collected_span").hide();
            $(".cartBar a:nth-child(1)").addClass("goods_colle");
        }
    });
}

/* 收藏店铺 */
function collect_store(id)
{
    var url = SITE_URL + '/index.php?app=my_favorite&act=add&type=store&jsoncallback=?&ajax=1';
    $.getJSON(url, {'item_id':id}, function(data){
        layer.open({content:data.msg, time:2});
        if(data.done){
            $("#store_collected_span").show();
            $("#store_not_collected_span").hide();
        }
    });
}
/* 火狐下取本地全路径 */
function getFullPath(obj)
{
    if(obj)
    {
        // ie
        if (window.navigator.userAgent.indexOf("MSIE")>=1)
        {
            obj.select();
            return document.selection.createRange().text;
        }
        // firefox
        else if(window.navigator.userAgent.indexOf("Firefox")>=1)
        {
            if(obj.files)
            {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}

/**
 * 启动邮件队列
 * 
 * @author Garbin
 * @param string
 *            req_url
 * @return void
 */
function sendmail(req_url)
{
    $(function(){
        var _script = document.createElement('script');
        _script.type = 'text/javascript';
        _script.src  = req_url;
        document.getElementsByTagName('head')[0].appendChild(_script);
    });
}
/* 转化JS跳转中的 ＆ */
function transform_char(str)
{
    if(str.indexOf('&'))
    {
        str = str.replace(/&/g, "%26");
    }
    return str;
}

/**
 * 在页面上产生个gotop按钮。 用纯粹的JS实现，无须额外的CSS和HTML支持，兼容所有浏览器。
 * 
 * @param int
 *            width 网页的主体宽度，以下三种取值 - 0 按钮靠浏览器左 - -1 按钮靠流利器右 - 其它正数 按钮靠网页内容右侧
 * @return void
 */
function goto_top(width)
{
	//var gotop = document.querySelector('#goto-top');
	var gotop = document.getElementById('goto-top');
	var ver_no = navigator.appVersion.match(/MSIE ([\d]+)./i);
	var ie_ver = ver_no?parseInt(ver_no[1]):0;
	
	gotop.style.visibility = (document.body.scrollTop + document.documentElement.scrollTop > 10) ? 'visible' : 'hidden';
	if(0 == width){ 
		gotop.style.left = '0em';  
	}
	else if(-1 == width){ 
		gotop.style.right = '0em';  }
	else{
		var resize = function(){
			var left = (document.documentElement.clientWidth - width) / 2 + width + 10;
			if(!left){
				left = 0;
			}
			if((left - gotop.clientWidth) < width)
			{
				gotop.style.right='0em';
				gotop.style.left = null;  // 设定了right属性，则需要取消left属性。
			}
			else
			{
				if(window.navigator.userAgent.indexOf("IE") == -1 || (ie_ver>=9 && ie_ver<11)){
					gotop.style.left = left + 'px';
				}else{
					gotop.style.left = left;
				}
				gotop.style.right = null;
			}
		};
		resize();
		
		if(window.navigator.userAgent.indexOf("IE") == -1 || (ie_ver >= 9)){
			window.addEventListener('resize', function() { resize(); }, false);
		}else{
			window.attachEvent('resize', function() { resize(); }, false);
		}
	}

	if(window.navigator.userAgent.indexOf("IE") == -1|| (ie_ver >= 9)){
		gotop.addEventListener('click', function()
		{
			// IE9和opera下body.scrollTop为0，chrome下documentElement.scrollTop为0
			// 两者始终有一个为0
			var h = document.body.scrollTop + document.documentElement.scrollTop; // 当前位置
			var t = window.setInterval(function()
					{
						window.scrollTo(0,h -= 100); // 每次上移100像素
						if(h <= 0)
						{ window.clearInterval(t);  }
					}, 5);
		}, false);
		
		/* 通过window.onscroll事件确定按钮是否需要显示 */
		window.addEventListener('scroll', function()
		{
			var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
			gotop.style.visibility = scrollTop > 10 ? 'visible':'hidden';
		}, false);
	}else{
		if(gotop.attachEvent){
			gotop.attachEvent('onclick', function()
			{
				// IE9和opera下body.scrollTop为0，chrome下documentElement.scrollTop为0
				// 两者始终有一个为0
				var h = document.body.scrollTop + document.documentElement.scrollTop; // 当前位置
				var t = window.setInterval(function()
						{
							window.scrollTo(0,h -= 100); // 每次上移100像素
							if(h <= 0)
							{ window.clearInterval(t);  }
						}, 5);
			}, false);
		}
		
		/* 通过window.onscroll事件确定按钮是否需要显示 */
		if(window.attachEvent){
			window.attachEvent('onscroll', function()
			{
				var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
				gotop.style.visibility = scrollTop > 10 ? 'visible':'hidden';
			}, false);
		}
	}
}

function getTheTime(d, opts){
	if(!d) return;
	var t = opts.type, v = opts.value;
	switch(t){
		case 'y':
			d.setFullYear( d.getFullYear() + v );
			break;
		case 'M':
			d.setMonth( d.getMonth() + v );
			break;
		case 'd':
			d.setDate( d.getDate() + v );
			break;
		case 'h':
			d.setHours( d.getHours() + v );
			break;
		case 'm':
			d.setMinutes( d.getMinutes() + v );
			break;
		case 's':
			d.setSeconds( d.getSeconds() + v );
			break;
		default:
	}
	return d.format('yyyy-MM-dd');
}

Date.prototype.format =function(format)
{
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	(this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
}

//获取cookie  
function getCookieValue(cookieName)  
{  
    var cookieValue = document.cookie;  
    var cookieStartAt = cookieValue.indexOf(""+cookieName+"=");  
    if(cookieStartAt==-1)  
    {  
        cookieStartAt = cookieValue.indexOf(cookieName+"=");  
    }  
    if(cookieStartAt==-1)  
    {  
        cookieValue = null;  
    }  
    else  
    {  
        cookieStartAt = cookieValue.indexOf("=",cookieStartAt)+1;  
        cookieEndAt = cookieValue.indexOf(";",cookieStartAt);  
        if(cookieEndAt==-1)  
        {  
            cookieEndAt = cookieValue.length;  
        }  
        cookieValue = unescape(cookieValue.substring(cookieStartAt,cookieEndAt));//解码latin-1  
    }  
    return cookieValue;  
}

function is_mobile(){
    var thisOS = navigator.platform.toLowerCase();
    var os = new Array("iphone", "ipod", "ipad", "android", "nokia", "symbianos", "symbian", "windows phone", "phone", "linux armv71", "maui", "untrusted/1.0", "windows ce", "blackberry", "iemobile");
    var flag = false;
    if ($.inArray(thisOS, os) >= 0 ) {
        flag = true;
    }

    //做这一部分是因为Android手机的内核也是Linux
    //但是navigator.platform显示信息不尽相同情况繁多,因此从浏览器下手，即用navigator.appVersion信息做判断
    var check = navigator.appVersion;
    if (check.match(/linux/i)) {
        //X11是UC浏览器的平台 ，如果有其他特殊浏览器也可以附加上条件
        if (check.match(/mobile/i) || check.match(/X11/i)) {
            flag= true;
        }
    }
    return flag;
}

function download_store_poster(store_id,path,name){
    location='/index.php?app=store&act=download_poster&id='+store_id+'&poster='+path+'&file_name='+name;
}