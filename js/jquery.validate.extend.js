// 手机号码验证 
jQuery.validator.addMethod("is_mobile", function(value, element) { 
		var length = value.length; 
		var mobile = /^1[34578]+\d{9}$/;
		return this.optional(element) || (length == 11 && mobile.test(value)); 
	}, "请正确填写您的手机号码"
); 

jQuery.validator.addMethod("is_tel", function(value, element) { 
		var tel = /^\d{3,4}-\d{3,9}-?\d{0,6}$/; 
		return this.optional(element) || (tel.test(value)); 
	}, "请正确填写您的电话号码"
);

jQuery.validator.addMethod("is_tel_or_mobile", function(value, element) { 
		var length = value.length; 
	    var tel = /^\d{3,4}-+\d{7,9}$/;
		var mobile = /^1[34578]+\d{9}$/;
		return this.optional(element) || (tel.test(value)) || (length == 11 && mobile.test(value)); 
	}, "请正确填写您的电话号码"
);

//是否字母数字混合编制
jQuery.validator.addMethod("is_alphameric", function(value, element) {
		var alphameric = /^[0-9a-z]+$/i;
		return this.optional(element) || (alphameric.test(value));
	}, "只能填写字母和数字"
);

jQuery.validator.addMethod("is_chinese", function(value, element) { 
		var chinese = /[^\u4e00-\u9fa5]/; 
		return this.optional(element) || (!chinese.test(value)); 
	}, "用户名包含非汉字字符"
);
jQuery.validator.addMethod("nowhitespace", function(value, element) {
	return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please");

jQuery.validator.addMethod("is_sensitive", function(value, element) { 
	var sensitive = /.*?(花木场|苗圃|苗木场|苗木|基地|花圃|公司|园艺|林场|园林|合作社|林业|专卖|绿化社|花木|农场|苗场|园艺场|苗木园|农业|苗圃园|林木|花卉|种子|绿化).*$/i; 
	return this.optional(element) || (!sensitive.test(value)); 
}, "包含敏感词汇");

jQuery.validator.addMethod("is_ownercard", function(value, element) { 
		//身份证正则表达式(15位) 
		var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
		//身份证正则表达式(18位)
		var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
		return this.optional(element) || (!isIDCard1.test(value)) || (!isIDCard2.test(value)); 
	}, "用户名包含非汉字字符"
);
jQuery.validator.addMethod("byteRange", function(value, element, param) { 
                var length = value.length;
                var mb_length = param[2] == 'utf-8' ? 3 : 2;
                for (var i = 0; i < value.length; i++) {
                    if (value.charCodeAt(i) > 127) {
                        length = length + mb_length - 1;
                    }
                }
                return this.optional(element) || ((param[0] == '' || length >= param[0]) && (param[1] == '' || length <= param[1]));
}, "用户名包含非汉字字符"
);
jQuery.validator.addMethod("small_digit", function(value, element) {         
   return this.optional(element) || /^\d+(\.\d{1,2})?$/.test(value);         
}, "小数位不能超过三位");     

//字数验证UTF8版
jQuery.validator.addMethod("minlength_utf8", function(value, element, param) {
    var realLength = 0; 
    var len = value.length; 
    var charCode = -1; 
    for(var i = 0; i < len; i++){ 
        charCode = value.charCodeAt(i); 
        if (charCode >= 0 && charCode <= 128) {  
            realLength += 1; 
        }else{  
            // 如果是中文则长度加3 
            realLength += 3; 
        } 
    }
    return realLength>=param;         
});