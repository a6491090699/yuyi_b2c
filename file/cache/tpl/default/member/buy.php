<?php defined('IN_DESTOON') or exit('Access Denied');?><?php if($DT_PC) { ?>
<?php include template('header');?>
<?php } else { ?>
<?php include template('header', 'member');?>
<?php } ?>
<?php if($action == 'show') { ?>
<div class="m">
<div class="nav">
<a href="<?php echo $MODULE['1']['linkurl'];?>">首页</a> <i>&gt;</i> <a href="<?php echo $MOD['linkurl'];?>"><?php echo $MOD['name'];?></a> <i>&gt;</i> 提交订单
</div>
<div class="cart-msg"><img src="image/ok.gif" alt="" align="absmiddle"/>  订单提交成功！ 
&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $forward;?>" class="b">支付订单</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $MOD['linkurl'];?>" class="b">继续购物</a></div>
<meta http-equiv="refresh" content="5;URL=<?php echo $forward;?>"/>
</div>
<?php } else { ?>
<script type="text/javascript">var errimg = '<?php echo DT_SKIN;?>image/nopic50.gif';</script>
<div class="m">
<div class="nav">
<a href="<?php echo $MODULE['1']['linkurl'];?>">首页</a> <i>&gt;</i> <a href="<?php echo $MOD['linkurl'];?>"><?php echo $MOD['name'];?></a> <i>&gt;</i> 提交订单
</div>
<?php if($lists) { ?>
<form method="post" action="buy.php" onsubmit="return check();">
<input type="hidden" name="submit" value="1"/>
<input type="hidden" name="mid" value="<?php echo $mid;?>"/>
<div class="b20 bd-t"></div>
<div>
<div class="f_r" style="padding:10px 0 0 0;"><a href="cart.php?mid=<?php echo $mid;?>" class="b">返回购物车重新挑选</a></div>
<img src="<?php echo DT_SKIN;?>image/buy_1.gif" width="160" height="30" alt=""/> 
</div>
<div class="b20"></div>
<table cellpadding="16" cellspacing="0" class="tb">
<tr>
<th width="50">图片</th>
<th>商品</th>
<th width="60">库存</th>
<th width="60">单价</th>
<th width="100">数量</th>
<th width="90">快递</th>
<th width="80">运费</th>
<th width="100">小计</th>
</tr>
<?php if(is_array($lists)) { foreach($lists as $tags) { ?>
<?php if(is_array($tags)) { foreach($tags as $i => $t) { ?>
<?php if($i == 0) { ?>
<tr bgcolor="#FAFAFA" align="center">
<td>卖家</td>
<td align="left">
<?php if($t['vip']) { ?><img src="<?php echo DT_SKIN;?>image/vip_<?php echo $t['vip'];?>.gif" alt="<?php echo VIP;?>" title="<?php echo VIP;?>:<?php echo $t['vip'];?>级" align="absmiddle"/> <?php } ?>
<a href="<?php echo userurl($t['username']);?>" target="_blank"><?php echo $t['company'];?></a>
<?php if($DT['im_web']) { ?><?php echo im_web($t['username'].'&mid='.$t['mid'].'&itemid='.$t['itemid']);?>&nbsp;<?php } ?>
<?php if($t['qq'] && $DT['im_qq']) { ?><?php echo im_qq($t['qq']);?>&nbsp;<?php } ?>
<?php if($t['wx'] && $DT['im_wx']) { ?><?php echo im_wx($t['wx'], $t['username']);?>&nbsp;<?php } ?>
<?php if($t['ali'] && $DT['im_ali']) { ?><?php echo im_ali($t['ali']);?>&nbsp;<?php } ?>
<?php if($t['skype'] && $DT['im_skype']) { ?><?php echo im_skype($t['skype']);?></a>&nbsp;<?php } ?>
</td>
<td></td>
<?php $promos = get_promos($t['username']);?>
<?php $coupons = get_coupons($_username, $t['username']);?>
<td><?php if($promos) { ?><a href="<?php echo $MODULE['2']['linkurl'];?>coupon.php?username=<?php echo $t['username'];?>" class="b" target="_blank"><div class="cart-promo">领券</div></a><?php } ?>
</td>
<td colspan="3" align="left">
<?php if($coupons) { ?>
<select name="coupon[<?php echo $t['username'];?>]" id="coupon-<?php echo $t['username'];?>" onchange="calculate();">
<option value="0">我的优惠券</option>
<?php if(is_array($coupons)) { foreach($coupons as $c) { ?>
<option value="<?php echo $c['itemid'];?>" coupon-price="<?php echo $c['price'];?>" coupon-cost="<?php echo $c['cost'];?>"><?php echo $DT['money_sign'];?><?php echo $c['price'];?><?php if($c['cost']) { ?>，满<?php echo $c['cost'];?>可用<?php } ?>
</option>
<?php } } ?>
</select>
<?php } ?>

</td>
<td><span class="f_price px16" id="total-<?php echo $t['username'];?>" data-user="<?php echo $t['username'];?>">0.00</span></td>
</td>
</tr>
<?php } ?>
<tr align="center" data-key="<?php echo $t['key'];?>">
<td><a href="<?php echo $t['linkurl'];?>" target="_blank"><img src="<?php echo $t['thumb'];?>" width="50" alt="<?php echo $t['alt'];?>" onerror="this.src=errimg;"/></a></td>
<td align="left" style="line-height:24px;color:#666666;">
<a href="<?php echo $t['linkurl'];?>" target="_blank" class="b" title="<?php echo $t['alt'];?>"><?php echo $t['title'];?></a><br/>
<div style="padding:3px 0 3px 0;">备注：<input type="text" name="post[<?php echo $t['key'];?>][note]" value="" size="20" style="border:#CCCCCC 1px solid;" maxlength="100" title="限100字以内"/></div>
品牌:<?php if($t['brand']) { ?><?php echo $t['brand'];?><?php } else { ?>未填写<?php } ?>
&nbsp;<?php if($t['m1']) { ?><?php echo $t['n1'];?>:<?php echo $t['m1'];?>&nbsp;<?php } ?>
<?php if($t['m2']) { ?><?php echo $t['n2'];?>:<?php echo $t['m2'];?>&nbsp;<?php } ?>
<?php if($t['m3']) { ?><?php echo $t['n3'];?>:<?php echo $t['m3'];?>&nbsp;<?php } ?>
</td>
<td><?php echo $t['amount'];?></td>
<td title="<?php if($t['a2']) { ?><?php echo $t['a1'];?>-<?php echo $t['a2'];?><?php echo $t['unit'];?> <?php echo $DT['money_sign'];?><?php echo $t['p1'];?>&#10;<?php if($t['a3']) { ?><?php echo $t['a2']+1;?>-<?php echo $t['a3'];?><?php echo $t['unit'];?> <?php echo $DT['money_sign'];?><?php echo $t['p2'];?>&#10;<?php echo $t['a3'];?><?php echo $t['unit'];?>以上 <?php echo $DT['money_sign'];?><?php echo $t['p3'];?><?php } else { ?><?php echo $t['a2']+1;?><?php echo $t['unit'];?>以上 <?php echo $DT['money_sign'];?><?php echo $t['p2'];?><?php } ?>
<?php } else { ?><?php echo $DT['money_sign'];?><?php echo $t['p1'];?><?php } ?>
"><span class="f_b" id="price_<?php echo $t['key'];?>"><?php echo $t['price'];?></span></td>
<td><img src="<?php echo DT_SKIN;?>image/arrow_l.gif" width="16" height="8" alt="减少" class="c_p" onclick="alter('<?php echo $t['key'];?>', '-');"/> <input type="text" name="post[<?php echo $t['key'];?>][number]" value="<?php echo $t['a'];?>" size="3" class="cc_inp" id="number_<?php echo $t['key'];?>" onblur="calculate();"/> <img src="<?php echo DT_SKIN;?>image/arrow_r.gif" width="16" height="8" alt="增加" class="c_p" onclick="alter('<?php echo $t['key'];?>', '+');"/></td>
<td>
<select name="post[<?php echo $t['key'];?>][express]" id="express_<?php echo $t['key'];?>" onchange="calculate();">
<?php if($t['express_name_1'] == '包邮') { ?>
<?php if($t['fee_start_1']>0) { ?>
<?php if($t['fee_start_2']>0) { ?><option value="2" data-2><?php echo $t['express_name_2'];?></option><?php } ?>
<?php if($t['fee_start_3']>0) { ?><option value="3" data-3><?php echo $t['express_name_3'];?></option><?php } ?>
<option value="-1" data--1>包邮</option>
<?php if($t['fee_start_2']>0 || $t['fee_start_3']>0) { ?>
<?php } else { ?>
<option value="0" data-0>联系卖家</option>
<?php } ?>
<?php } else { ?>
<option value="0" data-0>包邮</option>
<?php } ?>
<?php } else if($t['fee_start_1']>0 || $t['fee_start_2']>0 || $t['fee_start_3']>0) { ?>
<?php if($t['fee_start_1']>0) { ?><option value="1"><?php echo $t['express_name_1'];?></option><?php } ?>
<?php if($t['fee_start_2']>0) { ?><option value="2"><?php echo $t['express_name_2'];?></option><?php } ?>
<?php if($t['fee_start_3']>0) { ?><option value="3"><?php echo $t['express_name_3'];?></option><?php } ?>
<?php } else { ?>
<option value="0">联系卖家</option>
<?php } ?>
</select>
<?php if($t['express_name_1'] == '包邮' && $t['fee_start_1']>0) { ?>
<div style="margin-top:16px;" class="f_gray">满<?php echo $t['fee_start_1'];?>包邮</div>
<?php } ?>
<?php if($t['cod']) { ?>
<div style="margin-top:16px;"><input type="checkbox" name="post[<?php echo $t['key'];?>][cod]" value="1" checked<?php if($t['cod'] == 1) { ?> disabled<?php } ?>
/> 货到付款</div>
<?php } ?>
<input type="hidden" id="a1_<?php echo $t['key'];?>" value="<?php echo $t['a1'];?>"/>
<input type="hidden" id="a2_<?php echo $t['key'];?>" value="<?php echo $t['a2'];?>"/>
<input type="hidden" id="a3_<?php echo $t['key'];?>" value="<?php echo $t['a3'];?>"/>
<input type="hidden" id="p1_<?php echo $t['key'];?>" value="<?php echo $t['p1'];?>"/>
<input type="hidden" id="p2_<?php echo $t['key'];?>" value="<?php echo $t['p2'];?>"/>
<input type="hidden" id="p3_<?php echo $t['key'];?>" value="<?php echo $t['p3'];?>"/>
<input type="hidden" id="amount_<?php echo $t['key'];?>" value="<?php echo $t['amount'];?>"/>
<input type="hidden" id="fee_start_<?php echo $t['key'];?>_1" value="<?php echo $t['fee_start_1'];?>"/>
<input type="hidden" id="fee_step_<?php echo $t['key'];?>_1" value="<?php echo $t['fee_step_1'];?>"/>
<input type="hidden" id="fee_start_<?php echo $t['key'];?>_2" value="<?php echo $t['fee_start_2'];?>"/>
<input type="hidden" id="fee_step_<?php echo $t['key'];?>_2" value="<?php echo $t['fee_step_2'];?>"/>
<input type="hidden" id="fee_start_<?php echo $t['key'];?>_3" value="<?php echo $t['fee_start_3'];?>"/>
<input type="hidden" id="fee_step_<?php echo $t['key'];?>_3" value="<?php echo $t['fee_step_3'];?>"/>
</td>
<td><span class="f_price" id="fee_<?php echo $t['key'];?>">0.00</span></td>
<td><span class="f_price" id="total_<?php echo $t['key'];?>" total-<?php echo $t['username'];?>="1">0.00</span></td>
</tr>
<?php } } ?>
<?php } } ?>
</table>
<div class="b20"></div>
<table cellpadding="10" cellspacing="0" width="100%">
<tr>
<td class="f_gray">提示：实际的运费可能因为收货地址的不同而有差异，具体以提交之后系统计算或与卖家协商为准</td>
<td class="t_r" width="300">共 <span class="f_red" id="total_good"><?php echo $num;?></span> 种商品，总价：</td>
<td class="t_r" width="100"><span id="total_price"></span></td>
<td width="10"></td>
</tr>
<tr>
<td></td>
<td class="t_r">优惠：</td>
<td class="t_r"><span id="total_discount"></span></td>
<td></td>
</tr>
<tr>
<td></td>
<td class="t_r">实付：</td>
<td class="t_r"><span class="f_red f_b px16" id="total_amount"></span></td>
<td></td>
</tr>
</table>
<div class="b20"></div>
<div><img src="<?php echo DT_SKIN;?>image/buy_2.gif" width="160" height="30" alt=""/></div>
<div class="b20"></div>
<table cellpadding="16" cellspacing="0" class="tf">
<tr>
<td class="tl"><span class="f_red">&nbsp;</span> 常用地址：</td>
<td>
<?php if($address) { ?>
<?php if(is_array($address)) { foreach($address as $k => $v) { ?>
<div>
<?php if($k == 0) { ?><span class="f_r"><a href="<?php echo $MODULE['2']['linkurl'];?>address.php?action=add" class="b" target="_blank">新增地址</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $MODULE['2']['linkurl'];?>address.php" class="b" target="_blank">管理地址</a></span><?php } ?>
<input type="radio" name="addr" id="addr_<?php echo $k;?>" value="<?php echo $v['areaid'];?>|<?php echo $v['street'];?>|<?php echo $v['postcode'];?>|<?php echo $v['truename'];?>|<?php echo $v['mobile'];?>" onclick="Adr(this.value);"<?php if($k == 0) { ?> checked<?php } ?>
/><label for="addr_<?php echo $k;?>"> <?php echo $v['address'];?> (<?php echo $v['truename'];?>) <?php echo $v['mobile'];?></label></div>
<div class="b10"></div>
<?php } } ?>
<?php } else { ?>
<strong>暂无常用收货地址</strong>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $MODULE['2']['linkurl'];?>address.php?action=add" class="b" target="_blank">新增地址</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo $MODULE['2']['linkurl'];?>address.php" class="b" target="_blank">管理地址</a>
<?php } ?>
</td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 收货地址：</td>
<td><?php echo ajax_area_select('add[areaid]', '请选择', $user['areaid']);?> <input type="text" size="60" name="add[address]" id="address" value="<?php echo $user['address'];?>"/> <span id="dareaid" class="f_red"></span><span id="daddress" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 邮政编码：</td>
<td><input type="text" size="10" name="add[postcode]" id="postcode" value="<?php echo $user['postcode'];?>"/> <span id="dpostcode" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 真实姓名：</td>
<td><input type="text" size="10" name="add[truename]" id="truename" value="<?php echo $user['truename'];?>"/> <span id="dtruename" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 手机号码：</td>
<td><input type="text" size="20" name="add[mobile]" id="mobile" value="<?php echo $user['mobile'];?>"/> <span id="dmobile" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"> </td>
<td><input type="submit" name="submit" value=" 立即购买 " class="btn-green"/></td>
</tr>
</table>
</form>
<?php } else { ?>
<div class="cart-msg">您还没有挑选商品，赶快行动吧！马上去 <a href="<?php echo $MOD['linkurl'];?>" class="b">挑选商品</a></div>
<?php } ?>
</div>
<?php } ?>
<?php if(!$_userid) { ?><script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/guest.js"></script><?php } ?>
<script type="text/javascript">
function check() {
if(Dd('total_amount').innerHTML == '0.00') {
alert('订单总额为0.00，请检查商品数量');
window.scroll(0, 0);
return false;
}
var l;
var f;
f = 'areaid_1';
if(Dd(f).value == 0) {
Dmsg('请选择所在地区', 'areaid', 1);
return false;
}
f = 'address';
l = Dd(f).value.length;
if(l < 5) {
Dmsg('请填写街道地址', f);
return false;
}
f = 'postcode';
l = Dd(f).value.length;
if(l < 6) {
Dmsg('请填写邮政编码', f);
return false;
}
f = 'truename';
l = Dd(f).value.length;
if(l < 2) {
Dmsg('请填写真实姓名', f);
return false;
}
f = 'mobile';
l = Dd(f).value.length;
if(l < 11) {
Dmsg('请填写手机号码', f);
return false;
}
return true;
}
function Adr(s) {
var t = s.split('|');
try {
Dd('address').value = t[1];
Dd('postcode').value = t[2];
Dd('truename').value = t[3];
Dd('mobile').value = t[4];
load_area(t[0], 1);
}
catch (e) {}
}
<?php if($address) { ?>Adr(Dd('addr_0').value);<?php } ?>
function alter(i, t) {
if(t == '+') {
var maxa = parseFloat(Dd('amount_'+i).value);
if(maxa && Dd('number_'+i).value >= maxa) return;
Dd('number_'+i).value =  parseInt(Dd('number_'+i).value) + 1;
} else {
var mina = parseFloat(Dd('a1_'+i).value);
if(Dd('number_'+i).value <= mina) return;
Dd('number_'+i).value = parseInt(Dd('number_'+i).value) - 1;
}
calculate();
}
function get_price(i) {
if(Dd('a2_'+i).value > 0) {
if(Dd('a3_'+i).value > 1 && parseInt(Dd('number_'+i).value) > parseInt(Dd('a3_'+i).value)) return Dd('p3_'+i).value;
if(Dd('a2_'+i).value > 1 && parseInt(Dd('number_'+i).value) > parseInt(Dd('a2_'+i).value)) return Dd('p2_'+i).value;
}
return Dd('p1_'+i).value
}
function calculate() {
var _good = 0;
$('[data-key]').each(function() {
var num, good, maxa, mina, price;
var key = $(this).attr('data-key');
num = parseInt(Dd('number_'+key).value);
maxa = parseInt(Dd('amount_'+key).value);
mina = parseInt(Dd('a1_'+key).value);
if(num < mina) Dd('number_'+key).value = num = mina;
if(num > maxa) Dd('number_'+key).value = num = maxa;
if(isNaN(num) || num < 0) Dd('number_'+key).value = num = mina;
price = parseFloat(get_price(key));
good = price*num;
var es = $('#express_'+key).html();
if(es.indexOf('data--1') != -1) {
if(good >= parseFloat(Dd('fee_start_'+key+'_1').value)) {
$('#express_'+key).val('-1');
} else {
if(es.indexOf('data-0') != -1) {
$('#express_'+key).val('0');
} else if(es.indexOf('data-2') != -1) {
$('#express_'+key).val('2');
} else if(es.indexOf('data-3') != -1) {
$('#express_'+key).val('3');
}
}
} 
if(Dd('express_'+key).value > 0) {
var fee = parseFloat(Dd('fee_start_'+key+'_'+Dd('express_'+key).value).value) + parseFloat(Dd('fee_step_'+key+'_'+Dd('express_'+key).value).value)*(num-1);
Dd('fee_'+key).innerHTML = fee.toFixed(2);
Dd('total_'+key).innerHTML = (good+fee).toFixed(2);
_good += fee;
} else {
Dd('fee_'+key).innerHTML = '0.00';
Dd('total_'+key).innerHTML = good.toFixed(2);
}
Dd('price_'+key).innerHTML = price.toFixed(2);
_good += good;
});
var d_c = 0;
var t_a = _good;
$('[data-user]').each(function() {
var user = $(this).attr('data-user');
var t_t = 0;
$('[total-'+user+']').each(function() {
t_t += parseFloat($(this).html());
});
if($('#coupon-'+user).val() > 0) {
var c_c = parseFloat($('#coupon-'+user+' :selected').attr('coupon-cost'));
var c_p = parseFloat($('#coupon-'+user+' :selected').attr('coupon-price'));
if(c_c) {
if(c_c <= t_t) {
t_t = t_t - c_p;
t_a = t_a - c_p;
d_c += c_p;
} else {
$('#coupon-'+user).val('0');
}
} else {
t_t = t_t - c_p;
t_a = t_a - c_p;
d_c += c_p;
}
}
$(this).html(t_t.toFixed(2));
});
$('#total_price').html(_good.toFixed(2));
$('#total_discount').html(d_c > 0 ? '-'+d_c.toFixed(2) : '0.00');
$('#total_amount').html(t_a.toFixed(2));
}
<?php if($lists) { ?>
$(function(){calculate();});
<?php } ?>
</script>
<?php if($DT_PC) { ?>
<?php include template('footer');?>
<?php } else { ?>
<?php include template('footer', 'member');?>
<?php } ?>