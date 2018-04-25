$.validator.addMethod("pureChinese", function(value, element) {
	return this.optional(element) || !/[^\u4e00-\u9fa5$]/.test(value);
}, "只能是汉字");
$.validator.addMethod("phoneCN", function(value, element) {
	return this.optional(element) || /^1[34578]+\d{9}$/.test(value);
}, "请输入有效的有效的手机号");
$.validator.addMethod("telCN", function(value, element) {
	return this.optional(element) || /^\d{3,4}-\d{3,9}-?\d{0,6}$/.test(value);
}, "请输入有效的有效的电话号码");