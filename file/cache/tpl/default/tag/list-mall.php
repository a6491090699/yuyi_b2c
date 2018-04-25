<?php defined('IN_DESTOON') or exit('Access Denied');?><?php if(is_array($tags)) { foreach($tags as $k => $t) { ?>
<div class="list" id="item_<?php echo $t['itemid'];?>">
<table>
<tr align="center">
<td width="25">&nbsp;<input type="checkbox" id="check_<?php echo $t['itemid'];?>" name="itemid[]" value="<?php echo $t['itemid'];?>" onclick="sell_tip(this, <?php echo $t['itemid'];?>);"/> </td>
<td width="90"><div><a href="<?php echo $t['linkurl'];?>" target="_blank"><img src="<?php echo $t['thumb'];?>" width="80" height="80" alt="<?php echo $t['alt'];?>" onmouseover="img_tip(this, this.src);" onmouseout="img_tip(this, '');"/></a></div></td>
<td width="10"> </td>
<td align="left">
<ul>
<li><a href="<?php echo $t['linkurl'];?>" target="_blank"><strong class="px14"><?php echo $t['title'];?></strong></a></li>
<li>
<span class="f_r f_gray">
<?php if($t['username'] && $DT['im_web']) { ?><?php echo im_web($t['username'].'&mid='.$moduleid.'&itemid='.$t['itemid']);?>&nbsp;<?php } ?>
<?php if($t['qq'] && $DT['im_qq']) { ?><?php echo im_qq($t['qq']);?>&nbsp;<?php } ?>
<?php if($t['wx'] && $DT['im_wx']) { ?><?php echo im_wx($t['wx'], $t['username']);?>&nbsp;<?php } ?>
<?php if($t['ali'] && $DT['im_ali']) { ?><?php echo im_ali($t['ali']);?>&nbsp;<?php } ?>
<?php if($t['skype'] && $DT['im_skype']) { ?><?php echo im_skype($t['skype']);?>&nbsp;<?php } ?>
</span><?php echo area_pos($t['areaid'], ' ');?></li>
<li>
<?php if($t['vip']) { ?><img src="<?php echo DT_SKIN;?>image/vip_<?php echo $t['vip'];?>.gif" alt="<?php echo VIP;?>" title="<?php echo VIP;?>:<?php echo $t['vip'];?>级" align="absmiddle"/> <?php } ?>
<a href="<?php echo userurl($t['username']);?>" target="_blank"><?php echo $t['company'];?></a>
</li>
</ul>
</td>
<td class="list_price"><?php echo $DT['money_sign'];?><strong><?php echo $t['price'];?></strong></td>
<td class="list_count">总共成交<?php echo $t['orders'];?>笔
<br/><a href="<?php echo $t['linkurl'];?>#comment" target="_blank"><span><?php echo $t['comments'];?>条评价</span></a></td>
</tr>
</table>
</div>
<?php } } ?>
<?php if($showpage && $pages) { ?><div class="pages"><?php echo $pages;?></div><?php } ?>