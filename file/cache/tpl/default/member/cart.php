<?php defined('IN_DESTOON') or exit('Access Denied');?><?php if($DT_PC) { ?>
<?php include template('header');?>
<?php } else { ?>
<?php include template('header', 'member');?>
<?php } ?>
<?php if($action == 'show') { ?>
<div class="m">
<div class="nav">
<a href="<?php echo $MODULE['1']['linkurl'];?>">首页</a> <i>&gt;</i> <a href="<?php echo $MOD['linkurl'];?>"><?php echo $MOD['name'];?></a> <i>&gt;</i> <a href="?mid=<?php echo $mid;?>">购物车</a>
</div>
<?php if($code > 0) { ?>
<div class="cart-msg"><img src="image/ok.gif" alt="" align="absmiddle"/>  商品已成功加入购物车！ 
&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php echo DT_PATH;?>api/redirect.php?mid=<?php echo $moduleid;?>&itemid=<?php echo $code;?>" class="b">返回商品</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="?mid=<?php echo $mid;?>" class="b">去购物车结算</a></div>
<?php } else { ?>
<div class="cart-msg">
<img src="image/ko.gif" alt="" align="absmiddle"/>
添加失败！
<?php if($code == -1) { ?>
商品已经下架
<?php } else if($code == -2) { ?>
商品由您自己发布
<?php } else { ?>
商品已经下架或由您自己发布
<?php } ?>
&nbsp;&nbsp;&nbsp;&nbsp;<a href="<?php if($code == -1) { ?><?php echo $MOD['linkurl'];?><?php } else { ?><?php echo DT_PATH;?>api/redirect.php?mid=<?php echo $moduleid;?>&itemid=<?php echo $id;?><?php } ?>
" class="b">重新挑选</a>
</div>
<?php } ?>
</div>
<?php } else { ?>
<script type="text/javascript">var errimg = '<?php echo DT_SKIN;?>image/nopic50.gif';</script>
<div class="m">
<div class="nav">
<?php if($lists) { ?><div><a href="?mid=<?php echo $mid;?>&action=clear" onclick="return confirm('确定要清空购物车吗？');" class="b">清空</a></div><?php } ?>
<a href="<?php echo $MODULE['1']['linkurl'];?>">首页</a> <i>&gt;</i> <a href="<?php echo $MOD['linkurl'];?>"><?php echo $MOD['name'];?></a> <i>&gt;</i> <a href="?mid=<?php echo $mid;?>">购物车</a>
</div>
<?php if($lists) { ?>
<form method="post" action="buy.php" onsubmit="return Mcheck();">
<input type="hidden" name="from" value="cart"/>
<input type="hidden" name="mid" value="<?php echo $mid;?>"/>
<table cellpadding="16" cellspacing="0" class="tb">
<tr>
<th width="20"><input type="checkbox" checked="checked" id="check-all" onclick="Ccheck();calculate();"/></th>
<th width="50">图片</th>
<th>商品</th>
<th width="60">库存</th>
<th width="60">单价</th>
<th width="100">数量</th>
<th width="100">小计</th>
<th width="60">删除</th>
</tr>
<?php if(is_array($lists)) { foreach($lists as $tags) { ?>
<?php if(is_array($tags)) { foreach($tags as $i => $t) { ?>
<?php if($i == 0) { ?>
<tr align="center" bgcolor="#FAFAFA">
<td><input type="checkbox" checked="checked" id="check-<?php echo $t['username'];?>" onclick="Ccheck('<?php echo $t['username'];?>');calculate();" data-check="<?php echo $t['username'];?>"/></td>
<td align="left" colspan="3">
<?php if($t['vip']) { ?><img src="<?php echo DT_SKIN;?>image/vip_<?php echo $t['vip'];?>.gif" alt="<?php echo VIP;?>" title="<?php echo VIP;?>:<?php echo $t['vip'];?>级" align="absmiddle"/> <?php } ?>
<a href="<?php echo userurl($t['username']);?>" target="_blank"><?php echo $t['company'];?></a>
<?php if($DT['im_web']) { ?><?php echo im_web($t['username'].'&mid='.$t['mid'].'&itemid='.$t['itemid']);?>&nbsp;<?php } ?>
<?php if($t['qq'] && $DT['im_qq']) { ?><?php echo im_qq($t['qq']);?>&nbsp;<?php } ?>
<?php if($t['wx'] && $DT['im_wx']) { ?><?php echo im_wx($t['wx'], $t['username']);?>&nbsp;<?php } ?>
<?php if($t['ali'] && $DT['im_ali']) { ?><?php echo im_ali($t['ali']);?>&nbsp;<?php } ?>
<?php if($t['skype'] && $DT['im_skype']) { ?><?php echo im_skype($t['skype']);?></a>&nbsp;<?php } ?>
</td>
<td>
<?php $promos = get_promos($t['username']);?>
<?php if($promos) { ?>
<a href="<?php echo $MODULE['2']['linkurl'];?>coupon.php?username=<?php echo $t['username'];?>" target="_blank"><div class="cart-promo">优惠券</div></a>
<?php } ?>
</td>
<td></td>
<td><span class="f_price px16" id="total-<?php echo $t['username'];?>" data-user="<?php echo $t['username'];?>">0.00</span></td>
<td></td>
</tr>
<?php } ?>
<tr align="center" id="tr_<?php echo $t['key'];?>">
<td>
<input type="checkbox" name="cart[]" value="<?php echo $t['key'];?>" checked="checked" onclick="calculate()" id="check_<?php echo $t['key'];?>" data-check="<?php echo $t['username'];?>"/>
<input type="hidden" id="a1_<?php echo $t['key'];?>" value="<?php echo $t['a1'];?>"/>
<input type="hidden" id="a2_<?php echo $t['key'];?>" value="<?php echo $t['a2'];?>"/>
<input type="hidden" id="a3_<?php echo $t['key'];?>" value="<?php echo $t['a3'];?>"/>
<input type="hidden" id="p1_<?php echo $t['key'];?>" value="<?php echo $t['p1'];?>"/>
<input type="hidden" id="p2_<?php echo $t['key'];?>" value="<?php echo $t['p2'];?>"/>
<input type="hidden" id="p3_<?php echo $t['key'];?>" value="<?php echo $t['p3'];?>"/>
<input type="hidden" id="amount_<?php echo $t['key'];?>" value="<?php echo $t['amount'];?>"/>
</td>
<td><a href="<?php echo $t['linkurl'];?>" target="_blank"><img src="<?php echo $t['thumb'];?>" width="50" alt="<?php echo $t['alt'];?>"  onerror="this.src=errimg;"/></a></td>
<td align="left" style="line-height:24px;color:#666666;"><a href="<?php echo $t['linkurl'];?>" target="_blank" class="b" title="<?php echo $t['alt'];?>"><?php echo $t['title'];?></a><br/>
品牌:<?php if($t['brand']) { ?><?php echo $t['brand'];?><?php } else { ?>未填写<?php } ?>
&nbsp;<?php if($t['m1']) { ?><?php echo $t['n1'];?>:<?php echo $t['m1'];?>&nbsp;<?php } ?>
<?php if($t['m2']) { ?><?php echo $t['n2'];?>:<?php echo $t['m2'];?>&nbsp;<?php } ?>
<?php if($t['m3']) { ?><?php echo $t['n3'];?>:<?php echo $t['m3'];?>&nbsp;<?php } ?>
</td>
<td><?php echo $t['amount'];?></td>
<td title="<?php if($t['a2']) { ?><?php echo $t['a1'];?>-<?php echo $t['a2'];?><?php echo $t['unit'];?> <?php echo $DT['money_sign'];?><?php echo $t['p1'];?>&#10;<?php if($t['a3']) { ?><?php echo $t['a2']+1;?>-<?php echo $t['a3'];?><?php echo $t['unit'];?> <?php echo $DT['money_sign'];?><?php echo $t['p2'];?>&#10;<?php echo $t['a3'];?><?php echo $t['unit'];?>以上 <?php echo $DT['money_sign'];?><?php echo $t['p3'];?><?php } else { ?><?php echo $t['a2']+1;?><?php echo $t['unit'];?>以上 <?php echo $DT['money_sign'];?><?php echo $t['p2'];?><?php } ?>
<?php } else { ?><?php echo $DT['money_sign'];?><?php echo $t['p1'];?><?php } ?>
"><span class="f_b" id="price_<?php echo $t['key'];?>"><?php echo $t['price'];?></span></td>
<td><img src="<?php echo DT_SKIN;?>image/arrow_l.gif" width="16" height="8" alt="减少" class="c_p" onclick="alter('<?php echo $t['key'];?>', '-');"/><input type="text" name="amounts[<?php echo $t['key'];?>]" value="<?php echo $t['a'];?>" id="number_<?php echo $t['key'];?>" size="3" onblur="calculate();" class="cc_inp"/> <img src="<?php echo DT_SKIN;?>image/arrow_r.gif" width="16" height="8" alt="增加" class="c_p" onclick="alter('<?php echo $t['key'];?>', '+');"/></td>
<td><span class="f_price" id="total_<?php echo $t['key'];?>" total-<?php echo $t['username'];?>="1"><?php echo $t['price'];?></span></td>
<td class="c_p" onclick="if(confirm('确定要删除此商品吗？')) move('<?php echo $t['key'];?>');">删除</a></td>
</tr>
<?php } } ?>
<?php } } ?>
</table>
<div class="cart-foot">
<table cellpadding="0" cellspacing="0" width="100%">
<tr>
<td><a href="javascript:;" onclick="move_muti();">删除选中商品</a></td>
<td><p>已选商品 <span class="f_red f_b px16" id="total_good"></span> 件&nbsp;&nbsp;&nbsp;&nbsp;合计(不含运费)： <span class="f_red f_b px16" id="total_amount"></span> 元</p></td>
<td width="96"><input type="submit" value="结算"/></td>
</tr>
</table>
</div>
</form>
<?php } else { ?>
<div class="cart-msg"><img src="<?php echo DT_SKIN;?>image/cart_empty.png" width="57" height="49" alt="" align="absmiddle"/> 您的 <span class="f_orange">购物车</span> 还是空的，赶快行动吧！马上去 <a href="<?php echo $MOD['linkurl'];?>" class="b">挑选商品</a></div>
<?php } ?>
</div>
<?php } ?>
<script type="text/javascript">
function Ccheck(key) {
$(key ? '[data-check="'+key+'"]' : '[data-check]').each(function(){
$(this).prop('checked', $('#check-'+(key ? key : 'all')).prop('checked') ? true : false);
});
}
function Mcheck() {
if(Dd('total_good').innerHTML == '0') {
alert('最少需要挑选1件商品');
window.scroll(0, 0);
return false;
}
    return true;
}
function move_muti() {
if(Dd('total_good').innerHTML == '0') {
alert('未选择商品');
return;
}
if(confirm('确定要删除选中商品吗？')) {
var par = 'action=delete&mid=<?php echo $mid;?>&ajax=1';
$(':checked').each(function(i) {
if($(this).attr('id').indexOf('check_') != -1) {
par += '&key[]='+$(this).val();
}
});
$.post('?', par, function(data) {
Go('?mid=<?php echo $mid;?>&rand=<?php echo $DT_TIME;?>');
});
}
}
function move(i) {
Dd('check_'+i).checked = false;
Dd('check_'+i).disabled = true;
Dh('tr_'+i);
calculate();
$.post('?', 'action=delete&mid=<?php echo $mid;?>&ajax=1&key='+i, function(data) {
var cart_num = get_cart();
$('#destoon_cart').html(cart_num > 0 ? '<strong>'+cart_num+'</strong>' : '0');
if(data == 1 && Dd('total_good').innerHTML == '0') Go('?mid=<?php echo $mid;?>&rand=<?php echo $DT_TIME;?>');
});
}
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
var _good = _amount = _total = 0;
$(':checked').each(function(i) {
if($(this).attr('id').indexOf('check_') != -1) {
var key = $(this).val();
var num, good, maxa, mina, price;
num = parseInt(Dd('number_'+key).value);
maxa = parseInt(Dd('amount_'+key).value);
mina = parseInt(Dd('a1_'+key).value);
if(num < mina) Dd('number_'+key).value = num = mina;
if(num > maxa) Dd('number_'+key).value = num = maxa;
if(isNaN(num) || num < 0) Dd('number_'+key).value = num = mina;
_good++;
price = parseFloat(get_price(key));
_total = price*num;
_amount += _total;
Dd('price_'+key).innerHTML = price.toFixed(2);
Dd('total_'+key).innerHTML = _total.toFixed(2);
}
});
Dd('total_good').innerHTML = _good;
Dd('total_amount').innerHTML = _amount.toFixed(2);
$('[data-user]').each(function() {
var user = $(this).attr('data-user');
var tt = 0;
$('[total-'+user+']').each(function() {
tt += parseFloat($(this).html());
});
$(this).html(tt.toFixed(2));
});
}
<?php if($lists) { ?>$(function(){calculate();});<?php } ?>
</script>
<?php if($DT_PC) { ?>
<?php include template('footer');?>
<?php } else { ?>
<?php include template('footer', 'member');?>
<?php } ?>