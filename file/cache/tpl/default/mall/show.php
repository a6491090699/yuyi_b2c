<?php defined('IN_DESTOON') or exit('Access Denied');?><?php include template('header');?>
<script type="text/javascript">var module_id= <?php echo $moduleid;?>,item_id=<?php echo $itemid;?>,content_id='content',img_max_width=<?php echo $MOD['max_width'];?>;</script>
<div class="m">
<div class="nav"><div><img src="<?php echo DT_SKIN;?>image/ico-share.png" class="share" title="分享好友" onclick="Dshare(<?php echo $moduleid;?>, <?php echo $itemid;?>);"/></div><a href="<?php echo $MODULE['1']['linkurl'];?>">首页</a> <i>&gt;</i> <a href="<?php echo $MOD['linkurl'];?>"><?php echo $MOD['name'];?></a> <i>&gt;</i> <?php echo cat_pos($CAT, ' <i>&gt;</i> ');?></div>
<div class="b20 bd-t"></div>
</div>
<div class="m">
<table width="100%">
<tr>
<td valign="top">
<table width="100%">
<tr>
<td colspan="3"><h1 class="title_trade" id="title"><?php echo $title;?></h1></td>
</tr>
<tr>
<td width="330" valign="top">
<div id="mid_pos"></div>
<div id="mid_div" onmouseover="SAlbum();" onmouseout="HAlbum();" onclick="PAlbum(Dd('mid_pic'));">
<img src="<?php echo $albums['0'];?>" width="320" height="240" id="mid_pic"/><span id="zoomer"></span>
</div>
<div class="b10"></div>
<div>
<?php if(is_array($thumbs)) { foreach($thumbs as $k => $v) { ?><img src="<?php echo $v;?>" width="60" height="60" onmouseover="if(this.src.indexOf('nopic60.gif')==-1)Album(<?php echo $k;?>, '<?php echo $albums[$k];?>');" class="<?php if($k) { ?>ab_im<?php } else { ?>ab_on<?php } ?>
" id="t_<?php echo $k;?>"/><?php } } ?>
</div>
<div class="b10"></div>
<div onclick="PAlbum(Dd('mid_pic'));" class="c_b t_c c_p"><img src="<?php echo DT_SKIN;?>image/ico_zoom.gif" width="16" height="16" align="absmiddle"/> 点击图片查看原图</div>
<div class="b10"></div>
<div class="t_c"><a href="javascript:;" onclick="SendFav(<?php echo $moduleid;?>, <?php echo $itemid;?>);" class="b">收藏商品</a></div>
</td>
<td width="16">&nbsp;</td>
<td valign="top">
<div id="big_div" style="display:none;"><img src="" id="big_pic"/></div>
<?php if($a2) { ?>
<div class="step_price">
<table width="100%" cellpadding="6" cellspacing="0">
<tr>
<td>起批</td>
<td><?php echo $a1;?>-<?php echo $a2;?><?php echo $unit;?></td>
<?php if($a3) { ?>
<td><?php echo $a2+1;?>-<?php echo $a3;?><?php echo $unit;?></td>
<td><?php echo $a3;?><?php echo $unit;?>以上</td>
<?php } else { ?>
<td><?php echo $a2+1;?><?php echo $unit;?>以上</td>
<?php } ?>
</tr>
<tr>
<td>价格</td>
<td class="f_price"><?php echo $DT['money_sign'];?><span class="px14"><?php echo $p1;?></span></td>
<?php if($a3) { ?>
<td class="f_price"><?php echo $DT['money_sign'];?><span class="px14"><?php echo $p2;?></span></td>
<td class="f_price"><?php echo $DT['money_sign'];?><span class="px14"><?php echo $p3;?></span></td>
<?php } else { ?>
<td class="f_price"><?php echo $DT['money_sign'];?><span class="px14"><?php echo $p2;?></span></td>
<?php } ?>
</tr>
</table>
</div>
<?php } ?>
<table width="100%" cellpadding="5" cellspacing="5">
<?php if(!$a2) { ?>
<tr>
<td>单价：</td>
<td class="f_price"><?php echo $DT['money_sign'];?><span class="px16"><?php echo $price;?></span></td>
</tr>
<?php } ?>
<?php if($promos) { ?>
<tr>
<td>优惠：</td>
<td class="promos">
<a href="<?php echo $MODULE['2']['linkurl'];?>coupon.php?username=<?php echo $username;?>" target="_blank">
<?php if(is_array($promos)) { foreach($promos as $v) { ?>
<?php if($v['cost']) { ?>
<span>满<?php echo $v['cost'];?>减<?php echo $v['price'];?></span>
<?php } else { ?>
<span><?php echo $v['price'];?><?php echo $DT['money_unit'];?>优惠</span>
<?php } ?>
<?php } } ?>
</a>
</td>
</tr>
<?php } ?>
<?php if($express_name_1 == '包邮') { ?>
<tr>
<td>物流：</td>
<td>
<?php if($fee_start_1>0) { ?>
<?php if($fee_start_2>0) { ?> <?php echo $express_name_2;?>:<?php echo $fee_start_2;?>&nbsp;&nbsp;<?php } ?>
<?php if($fee_start_3>0) { ?> <?php echo $express_name_3;?>:<?php echo $fee_start_3;?>&nbsp;&nbsp;<?php } ?>
满<?php echo $fee_start_1;?>包邮
<?php } else { ?>
包邮
<?php } ?>
</td>
</tr>
<?php } else if($fee_start_1>0 || $fee_start_2>0 || $fee_start_3>0) { ?>
<tr>
<td>物流：</td>
<td class="f_gray">
<?php if($fee_start_1>0) { ?> <?php echo $express_name_1;?>:<?php echo $fee_start_1;?>&nbsp;&nbsp;<?php } ?>
<?php if($fee_start_2>0) { ?> <?php echo $express_name_2;?>:<?php echo $fee_start_2;?>&nbsp;&nbsp;<?php } ?>
<?php if($fee_start_3>0) { ?> <?php echo $express_name_3;?>:<?php echo $fee_start_3;?>&nbsp;&nbsp;<?php } ?>
</td>
</tr>
<?php } ?>
<?php if($cod) { ?>
<tr>
<td>到付：</td>
<td>支持货到付款</td>
</tr>
<?php } ?>
<tr>
<td>品牌：</td>
<td><?php if($brand) { ?><a href="<?php echo $MOD['linkurl'];?><?php echo rewrite('search.php?fields=4&kw='.urlencode($brand));?>" target="_blank" class="b"><?php echo $brand;?></a><?php } else { ?>未填写<?php } ?>
</td>
</tr>
<tr>
<td>销量：</td>
<td><a href="#order" onclick="Mshow('order');" class="b">累计出售 <span class="f_orange"><?php echo $sales;?></span> <?php echo $unit;?></a></td>
</tr>
<tr>
<td>评价：</td>
<td><a href="#comment" onclick="Mshow('comment');" class="b">已有 <span class="f_orange"><?php echo $comments;?></span> 条评价</a></td>
</tr>
<?php if($MOD['hits']) { ?>
<tr>
<td>人气：</td>
<td>已有 <span class="f_orange"><span id="hits"><?php echo $hits;?></span></span> 人关注</td>
</tr>
<?php } ?>
<tr>
<td width="50">更新：</td>
<td><?php echo $editdate;?></td>
</tr>
<?php if($RL) { ?>
<tr>
<td><?php echo $relate_name;?>：</td>
<td>
<?php if(is_array($RL)) { foreach($RL as $v) { ?>
<div class="relate_<?php if($itemid==$v['itemid']) { ?>2<?php } else { ?>1<?php } ?>
"><?php if($itemid==$v['itemid']) { ?><em></em><?php } ?>
<a href="<?php echo $MOD['linkurl'];?><?php echo $v['linkurl'];?>"><img src="<?php echo $v['thumb'];?>" alt="" title="<?php echo $v['relate_title'];?>"/></a></div>
<?php } } ?>
</td>
</tr>
<?php } ?>
<?php if($P1) { ?>
<tr>
<td><?php echo $n1;?>：</td>
<td id="p1">
<ul>
<?php if(is_array($P1)) { foreach($P1 as $i => $v) { ?>
<li class="nv_<?php if($i==0) { ?>2<?php } else { ?>1<?php } ?>
"><?php echo $v;?></li>
<?php } } ?>
</ul>
</td>
</tr>
<?php } ?>
<?php if($P2) { ?>
<tr>
<td><?php echo $n2;?>：</td>
<td id="p2">
<ul>
<?php if(is_array($P2)) { foreach($P2 as $i => $v) { ?>
<li class="nv_<?php if($i==0) { ?>2<?php } else { ?>1<?php } ?>
"><?php echo $v;?></li>
<?php } } ?>
</ul>
</td>
</tr>
<?php } ?>
<?php if($P3) { ?>
<tr>
<td><?php echo $n3;?>：</td>
<td id="p3">
<ul>
<?php if(is_array($P3)) { foreach($P3 as $i => $v) { ?>
<li class="nv_<?php if($i==0) { ?>2<?php } else { ?>1<?php } ?>
"><?php echo $v;?></li>
<?php } } ?>
</ul>
</td>
</tr>
<?php } ?>
<?php if($amount) { ?>
<?php if($status == 3) { ?>
<tr>
<td>数量：</td>
<td class="f_gray"><img src="<?php echo DT_SKIN;?>image/arrow_l.gif" width="16" height="8" alt="减少" class="c_p" onclick="Malter('-', <?php echo $a1;?>, <?php echo $amount;?>);"/> <input type="text" value="<?php echo $a1;?>" size="4" class="cc_inp" id="amount" onkeyup="Malter('', <?php echo $a1;?>, <?php echo $amount;?>);"/> <img src="<?php echo DT_SKIN;?>image/arrow_r.gif" width="16" height="8" alt="增加" class="c_p" onclick="Malter('+', <?php echo $a1;?>, <?php echo $amount;?>);"/><?php echo $unit;?> 库存<?php echo $amount;?><?php echo $unit;?></td>
</tr>
<tr>
<td colspan="2">
<img src="<?php echo DT_SKIN;?>image/btn_tobuy.gif" alt="立即购买" class="c_p" onclick="BuyNow();"/>
&nbsp;
<img src="<?php echo DT_SKIN;?>image/btn_addcart.gif" alt="加入购物车" class="c_p" onclick="AddCart();"/>
</td>
</tr>
<?php } else { ?>
<tr>
<td></td>
<td><strong class="f_red px14">该商品已下架</strong></td>
</tr>
<?php } ?>
<?php } else { ?>
<tr>
<td></td>
<td><strong class="f_red px14">该商品库存不足</strong></td>
</tr>
<?php } ?>
</table>
</td>
</tr>
</table>
</td>
<td width="16">&nbsp;</td>
<td width="300" valign="top">
<div class="contact_head">公司基本资料信息</div>
<div class="contact_body" id="contact"><?php include template('contact', 'chip');?></div>
<?php if(!$username) { ?>
<br/>
&nbsp;<strong class="f_red">注意</strong>:发布人未在本站注册，建议优先选择<a href="<?php echo $MODULE['2']['linkurl'];?>grade.php"><strong><?php echo VIP;?>会员</strong></a>
<?php } ?>
</div>
</td>
</tr>
</table>
</div>
<div class="m">
<div class="b10">&nbsp;</div>
<div class="mall_tab">
<ul>
<li class="mall_tab_2" id="t_detail"><a href="#detail" onclick="Mshow('detail');">商品详情</a></li>
<li class="mall_tab_1" id="t_comment"><a href="#comment" onclick="Mshow('comment');">评价详情(<?php echo $comments;?>)</a></li>
<li class="mall_tab_1" id="t_order"><a href="#order" onclick="Mshow('order');">交易记录(<?php echo $orders;?>)</a></li>
</ul>
</div>
<div class="mall_c" style="display:;" id="c_detail">
<?php if($CP) { ?><?php include template('property_show', 'chip');?><?php } ?>
<div class="content c_b" id="content"><?php echo $content;?></div>
<?php if($MOD['fee_award']) { ?>
<div class="award"><div onclick="Go('<?php echo $MODULE['2']['linkurl'];?>award.php?mid=<?php echo $moduleid;?>&itemid=<?php echo $itemid;?>');">打赏</div></div>
<?php } ?>
</div>
<div class="mall_c" style="display:none;" id="c_comment">
<center>正在载入评论详细...</center>
</div>
<div class="mall_c" style="display:none;" id="c_order">
<center>正在载入交易记录...</center>
</div>
</div>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/album.js"></script>
<?php if($content) { ?><script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/content.js"></script><?php } ?>
<script type="text/javascript">
var mallurl = '<?php echo $MOD['linkurl'];?>';
var mallmid = <?php echo $moduleid;?>;
var mallid = <?php echo $itemid;?>;
var n_c = <?php echo $comments;?>;
var n_o = <?php echo $orders;?>;
var c_c = Dd('c_comment').innerHTML;
var c_o = Dd('c_order').innerHTML;
var s_s = {'1':0,'2':0,'3':0};
var m_l = {
no_comment:'暂无评论',
no_order:'暂无交易',
no_goods:'商品不存在或已下架',
no_self:'不能添加自己的商品',
lastone:''
};
</script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/mall.js"></script>
<script type="text/javascript">
<?php if($P1) { ?>addE(1);<?php } ?>
<?php if($P2) { ?>addE(2);<?php } ?>
<?php if($P3) { ?>addE(3);<?php } ?>
if(window.location.href.indexOf('#') != -1) {
var t = window.location.href.split('#');
try {Mshow(t[1]);} catch(e) {}
}
</script>
<?php include template('footer');?>