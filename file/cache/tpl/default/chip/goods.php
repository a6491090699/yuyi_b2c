<?php defined('IN_DESTOON') or exit('Access Denied');?><div class="bd">
<table cellpadding="10" cellspacing="0" class="tb">
<tr>
<th width="80"></th>
<th>商品信息</th>
<th width="120">单价</th>
<th width="100">数量</th>
<th width="160">买家留言</th>
</tr>
<?php if(is_array($lists)) { foreach($lists as $k => $v) { ?>
<tr align="center">
<td><a href="javascript:_preview('<?php echo $v['thumb'];?>');"><img src="<?php if($v['thumb']) { ?><?php echo $v['thumb'];?><?php } else { ?><?php echo DT_SKIN;?>image/nopic60.gif<?php } ?>
" width="60" height="60" onerror="this.src=errimg;"/></a></td>
<td align="left" valign="top" class="f_gray lh18"><a href="<?php echo $v['linkurl'];?>" target="_blank" class="t"><?php echo $v['title'];?></a><br/><?php echo $v['par'];?></td>
<td><?php echo $v['price'];?></td>
<td><?php echo $v['number'];?></td>
<td><textarea style="width:160px;height:40px;color:#666666;"><?php echo $v['note'];?></textarea></td>
</tr>
<?php } } ?>
<tr>
<td colspan="4" align="right">订单编号：</td>
<td><?php echo $td['itemid'];?></td>
</tr>
<?php if(isset($td['money'])) { ?>
<tr>
<td colspan="4" align="right">订单总额：</td>
<td><?php echo $td['money'];?></td>
</tr>
<?php } ?>
<?php if($td['fee_name'] && $td['fee']) { ?>
<tr>
<td colspan="4" align="right"><?php echo $td['fee_name'];?>：</td>
<td><?php echo $td['fee'];?></td>
</tr>
<?php } ?>
<?php if(isset($td['discount'])) { ?>
<tr>
<td colspan="4" align="right">优惠金额：</td>
<td><a href="<?php echo $MOD['linkurl'];?><?php if($td['seller']==$_username) { ?>promo.php?action=coupon&itemid=<?php echo $td['cid'];?><?php } else { ?>coupon.php?action=my&itemid=<?php echo $td['cid'];?><?php } ?>
" target="_blank">-<?php echo $td['discount'];?></a></td>
</tr>
<?php } ?>
<tr>
<td colspan="4" align="right">实付金额：</td>
<td class="f_red px14"><?php echo $td['total'];?></td>
</tr>
</table>
</div>
<div class="b10"></div>