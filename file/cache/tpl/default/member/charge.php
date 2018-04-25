<?php defined('IN_DESTOON') or exit('Access Denied');?><?php include template('header', 'member');?>
<div class="menu">
<table cellpadding="0" cellspacing="0">
<tr>
<?php if($MOD['pay_online']) { ?>
<td class="tab" id="action_pay"><a href="?action=pay"><span>在线支付</span></a></td>
<?php } ?>
<?php if($MOD['pay_card']) { ?>
<td class="tab" id="action_card"><a href="?action=card"><span>充值卡支付</span></a></td>
<?php } ?>
<?php if($MOD['pay_url']) { ?>
<td class="tab"><a href="<?php echo $MOD['pay_url'];?>"><span>银行汇款</span></a></td>
<?php } ?>
<td class="tab" id="action_record"><a href="?action=record"><span>支付记录</span></a></td>
</tr>
</table>
</div>
<?php if($action == 'record') { ?>
<form action="?">
<input type="hidden" name="action" value="<?php echo $action;?>"/>
<div class="tt">
金额：<input type="text" size="3" name="minamount" value="<?php echo $minamount;?>"/> ~ <input type="text" size="3" name="maxamount" value="<?php echo $maxamount;?>"/>&nbsp;
<?php echo dcalendar('fromdate', $fromdate);?> 至 <?php echo dcalendar('todate', $todate);?>
&nbsp;
<input type="submit" value=" 搜 索 " class="btn"/>&nbsp;
<input type="button" value=" 重 置 " class="btn" onclick="Go('?action=<?php echo $action;?>');"/>
</div>
</form>
<div class="bd">
<table cellpadding="10" cellspacing="0" class="tb">
<tr>
<th>流水号</th>
<th>支付金额</th>
<th>手续费</th>
<th>实收金额</th>
<th width="130">下单时间</th>
<th width="130">支付时间</th>
<th>支付平台</th>
<th>状态</th>
<?php if($repay) { ?><th width="40"></th><?php } ?>
</tr>
<?php if(is_array($lists)) { foreach($lists as $k => $v) { ?>
<tr align="center">
<td height="30"><?php echo $v['itemid'];?></td>
<td><?php echo $v['amount'];?></td>
<td><?php echo $v['fee'];?></td>
<td class="f_blue"><?php echo $v['money'];?></td>
<td class="f_gray"><?php echo $v['sendtime'];?></td>
<td class="f_gray"><?php echo $v['receivetime'];?></td>
<td><?php echo $PAY[$v['bank']]['name'];?></td>
<td><?php echo $v['dstatus'];?></td>
<?php if($repay) { ?><td><?php if($v['repay']) { ?><a href="?action=repay&itemid=<?php echo $v['itemid'];?>" class="t">支付</a><?php } ?>
</td><?php } ?>
</tr>
<?php } } ?>
<tr align="center">
<td height="35"><strong>小计</strong></td>
<td><?php echo $amount;?></td>
<td><?php echo $fee;?></td>
<td class="f_blue"><?php echo $money;?></td>
<td colspan="5">&nbsp;</td>
</tr>
</table>
</div>
<div class="pages"><?php echo $pages;?></div>
<script type="text/javascript">s('charge');m('action_record');</script>
<?php } else if($action == 'card') { ?>
<form method="post" action="?" onsubmit="return check_card();">
<input type="hidden" name="action" value="card"/>
<table cellpadding="10" cellspacing="1" class="tb">
<tr>
<td class="tl">卡号：</td>
<td class="tr"><input type="text" name="number" size="20" id="number"/> <span id="dnumber" class="f_red"></span></td>
</tr>
<tr>
<td class="tl">密码：</td>
<td class="tr"><input type="text" name="password" size="20" id="password"/> <span id="dpassword" class="f_red"></span>
</td>
</tr>
<tr>
<td class="tl"></td>
<td class="tr"><input type="submit" name="submit" value=" 充 值 " class="btn_g"/>
</td>
</tr>
</form>
</table>
<script type="text/javascript">
function check_card() {
if(Dd('number').value.length < 8) {
Dmsg('请填写正确的充值卡卡号', 'number');
return false;
}
if(Dd('password').value.length < 6) {
Dmsg('请填写正确的充值卡密码', 'password');
return false;
}
}
</script>
<script type="text/javascript">s('charge');m('action_card');</script>
<?php } else if($action == 'pay') { ?>
<?php if($MOD['pay_online']) { ?>
<form method="post" action="?" onsubmit="return check();" id="dform">
<input type="hidden" name="auto" value="<?php echo $auto;?>"/>
<input type="hidden" name="reason" value="<?php echo $reason;?>"/>
<input type="hidden" name="action" value="confirm"/>
<table cellpadding="10" cellspacing="1" class="tb">
<tr id="pay_amount">
<td class="tl"><span class="f_red">*</span> 支付金额</td>
<td class="tr">&nbsp;
<input type="text" name="amount" value="<?php echo $amount;?>" id="amount" maxlength="8" style="width:80px;"/> <?php echo $DT['money_unit'];?> <span id="damount" class="f_red"></span>
</td>
</tr>
<tr id="pay-type">
<td class="tl"><span class="f_red">*</span> 支付平台</td>
<td class="tr">
<table cellspacing="5" cellpadding="5">
<?php if($PAYLIST) { ?>
<?php if(is_array($PAYLIST)) { foreach($PAYLIST as $k => $v) { ?>
<tr>
<td><input type="radio" name="bank" value="<?php echo $v['bank'];?>" id="bank-<?php echo $v['bank'];?>"<?php if($v['bank']==$bank) { ?> checked<?php } ?>
/></td>
<td><label for="bank-<?php echo $v['bank'];?>" class="c_p"><img src="<?php echo DT_PATH;?>api/pay/<?php echo $v['bank'];?>/logo.gif" alt=""/></label></td>
<td><?php if($v['percent']>0) { ?>手续费 <?php echo $v['percent'];?>%<?php } ?>
</td>
</tr>
<?php } } ?>
<?php } else { ?>
<tr>
<td class="f_red"><br/>抱歉，系统未设置支付平台，暂时无法在线支付</td>
</tr>
<?php } ?>
</table><br/><span id="dbank" class="f_red"></span>
</td>
</tr>
<tr>
<td class="tl" height="50"> </td>
<td class="tr">&nbsp; <input type="submit" value=" 下一步 " class="btn_g"<?php if(!$PAY) { ?> disabled<?php } ?>
/></td>
</tr>
</table>
</form>
<?php } ?>
<script type="text/javascript">
<?php if($auto) { ?>$('body').hide();Dd('dform').submit();<?php } ?>
function check() {
if(!Dd('amount').value) {
Dmsg('请填写支付金额', 'amount');
return false;
}
<?php if($mincharge) { ?>
if(Dd('amount').value < <?php echo $mincharge;?>) {
Dmsg('金额最少<?php echo $mincharge;?>', 'amount');
return false;
}
<?php } ?>
return true;
}
</script>
<script type="text/javascript">s('charge');m('action_pay');</script>
<?php } else if($action == 'confirm') { ?>
<form method="post" action="?" id="dform">
<input type="hidden" name="goto" value="1"/>
<input type="hidden" name="action" value="confirm"/>
<input type="hidden" name="amount" value="<?php echo $amount;?>"/>
<input type="hidden" name="bank" value="<?php echo $bank;?>"/>
<input type="hidden" name="reason" value="<?php echo $reason;?>"/>
<table cellpadding="10" cellspacing="1" class="tb">
<tr>
<td class="tl">支付平台</td>
<td class="tr"><img src="<?php echo DT_PATH;?>api/pay/<?php echo $bank;?>/logo.gif" alt=""/></td>
</tr>
<tr>
<td class="tl">支付金额</td>
<td class="tr">&nbsp;<strong><?php echo $amount;?></strong> <?php echo $DT['money_unit'];?></td>
</tr>
<tr>
<td class="tl">手续费</td>
<td class="tr">&nbsp;<strong><?php echo $fee;?></strong> <?php echo $DT['money_unit'];?></td>
</tr>
<tr>
<td class="tl">实收金额</td>
<td class="tr">&nbsp;<strong class="f_red"><?php echo $charge;?></strong> <?php echo $DT['money_unit'];?></td>
</tr>
<tr>
<td class="tl">提示信息</td>
<td class="tr f_gray">
&nbsp;- 点击确认支付，系统将跳转至第三方支付平台，支付成功后系统将自动为您入账。<br/>
&nbsp;- 如果在支付过程中遇到任何问题，请及时与客服中心取得联系，以便及时处理。<br/>
</td>
</tr>
<tr>
<td class="tl"> </td>
<td height="50" class="tr">
<input type="submit" value=" 确认支付 " class="btn_g"/> &nbsp;
<input type="button" value=" 返回修改 " class="btn" onclick="history.back(-1);"/>
</td>
</tr>
</table>
</form>
<?php if($auto) { ?><script type="text/javascript">Dd('dform').submit();</script><?php } ?>
<script type="text/javascript">s('charge');m('action_pay');</script>
<?php } else { ?>
<table cellpadding="10" cellspacing="1" class="tb">
<?php if($charge_status == 2) { ?>
<tr>
<td class="tl">支付结果</td>
<td class="tr f_red f_b px14">×支付异常</td>
</tr>
<tr>
<td class="tl" height="50">相关说明</td>
<td class="tr lh18">
- 错误代码“<?php echo $charge_errcode;?>”，请与<a href="ask.php?action=add" class="b">客服联系</a>并告知错误代码。<br/>
- <a href="?action=pay" class="b">重新支付请点这里。</a><br/>
</td>
</tr>
<?php } else if($charge_status == 1) { ?>
<tr>
<td class="tl">支付结果</td>
<td class="tr f_green f_b px14"><img src="image/ok.gif" alt="" align="absmiddle"/> 支付成功，已经为您入账 <span class="f_red"><?php echo $charge_amount;?></span> <?php echo $DT['money_unit'];?></td>
</tr>
<tr>
<td class="tl" height="50">相关说明</td>
<td class="tr lh18">
- <a href="?action=record" class="b">查询记录请点这里</a><br/>
- <a href="?action=pay" class="b">继续支付请点这里</a><br/>
</td>
</tr>
<?php } else { ?>
<tr>
<td class="tl" height="50">支付结果</td>
<td class="tr f_red f_b px14">×支付失败</td>
</tr>
<tr>
<td class="tl" height="50">相关说明</td>
<td class="tr lh18">
- 如果您确认支付成功，请立即<a href="ask.php?action=add" class="b">联系客服</a>解决。<br/>
- <a href="?action=pay" class="b">重新支付请点这里。</a><br/>
</td>
</tr>
<?php } ?>
</table>
<?php if($charge_forward) { ?><script type="text/javascript">setTimeout(function(){Go('<?php echo $charge_forward;?>');}, 2000);</script><?php } ?>
<script type="text/javascript">s('charge');m('action_pay');</script>
<?php } ?>
<?php include template('footer', 'member');?>