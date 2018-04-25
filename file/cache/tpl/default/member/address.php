<?php defined('IN_DESTOON') or exit('Access Denied');?><?php include template('header', 'member');?>
<div class="menu">
<table cellpadding="0" cellspacing="0">
<tr>
<td class="tab" id="add"><a href="?action=add"><span>添加地址</span></a></td>
<td class="tab" id="s3"><a href="?action=index"><span>收货地址</span></a></td>
</tr>
</table>
</div>
<?php if($action=='add' || $action=='edit') { ?>
<form method="post" action="?" id="dform" onsubmit="return check();">
<input type="hidden" name="action" value="<?php echo $action;?>"/>
<input type="hidden" name="itemid" value="<?php echo $itemid;?>"/>
<input type="hidden" name="forward" value="<?php echo $forward;?>"/>
<table cellpadding="10" cellspacing="1" class="tb">
<tr>
<td class="tl"><span class="f_red">*</span> 详细地址</td>
<td class="tr"><?php echo ajax_area_select('post[areaid]', '请选择', $areaid);?><input name="post[address]" type="text" id="title" size="60" value="<?php echo $address;?>"/> <span id="dareaid" class="f_red"></span><span id="dtitle" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 邮政编码</td>
<td class="tr"><input name="post[postcode]" type="text" id="postcode" size="10" value="<?php echo $postcode;?>" /> <span id="dpostcode" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 真实姓名</td>
<td class="tr"><input name="post[truename]" type="text" id="truename" size="10" value="<?php echo $truename;?>"/> <span id="dtruename" class="f_red"></span></td>
</tr>
<tr>
<td class="tl"><span class="f_red">*</span> 手机号码</td>
<td class="tr"><input name="post[mobile]" type="text" id="mobile" size="20" value="<?php echo $mobile;?>"/> <span id="dmobile" class="f_red"></span></td>
</tr>
<tr>
<td class="tl">电话号码</td>
<td class="tr"><input name="post[telephone]" type="text" id="telephone" size="20" value="<?php echo $telephone;?>"/> <span id="dtelephone" class="f_red"></span></td>
</tr>
<tr>
<td class="tl">显示顺序</td>
<td class="tr f_gray"><input name="post[listorder]" type="text" id="listorder" size="4" value="<?php echo $listorder;?>"/> 数字越小越靠前<span id="dlistorder" class="f_red"></span></td>
</tr>
<tr>
<td class="tl">备注信息</td>
<td class="tr"><input name="post[note]" type="text" id="note" size="60" value="<?php echo $note;?>"/> <span id="dnote" class="f_red"></span></td>
</tr>
<tr>
<td class="tl">&nbsp;</td>
<td class="tr" height="50"><input type="submit" name="submit" value="<?php if($action=='add') { ?>添 加<?php } else { ?>修 改<?php } ?>
" class="btn_g"/></td>
</tr>
</table>
</form>
<script type="text/javascript">s('addr');m(<?php if($action=='add') { ?>'add'<?php } else { ?>'s3'<?php } ?>
);</script>
<?php } else { ?>
<form method="post">
<div class="ls">
<table cellpadding="10" cellspacing="0" class="tb">
<tr>
<th width="20"><input type="checkbox" onclick="checkall(this.form);"/></th>
<th>地址</th>
<th>姓名</th>
<th>手机</th>
<th>添加时间</th>
<th>排序</th>
<th width="40">修改</th>
<th width="40">删除</th>
</tr>
<?php if(is_array($lists)) { foreach($lists as $k => $v) { ?>
<tr align="center">
<td><input type="checkbox" name="itemid[]" value="<?php echo $v['itemid'];?>"/></td>
<td height="30" align="left"<?php if($v['note']) { ?> title="备注:<?php echo $v['note'];?>"<?php } ?>
>&nbsp;&nbsp<?php echo $v['address'];?></td>
<td><?php echo $v['truename'];?></td>
<td><?php echo $v['mobile'];?></td>
<td class="f_gray" title="更新时间 <?php echo $v['editdate'];?>"><?php echo $v['adddate'];?></td>
<td class="f_gray"><?php echo $v['listorder'];?></td>
<td><a href="?action=edit&itemid=<?php echo $v['itemid'];?>"><img width="16" height="16" src="image/edit.png" title="修改" alt=""/></a></td>
<td><a href="?action=delete&itemid=<?php echo $v['itemid'];?>" onclick="return confirm('确定要删除吗？此操作将不可撤销');"><img width="16" height="16" src="image/delete.png" title="删除" alt=""/></a></td>
</tr>
<?php } } ?>
</table>
</div>
<div class="btns">
<input type="submit" value=" 删除选中 " class="btn" onclick="if(confirm('确定要删除选中地址吗？')){this.form.action='?action=delete'}else{return false;}"/>
</div>
</form>
<?php if($MG['address_limit']) { ?>
<div class="limit">总共可加 <span class="f_b f_red"><?php echo $MG['address_limit'];?></span> 条&nbsp;&nbsp;&nbsp;当前已加 <span class="f_b"><?php echo $limit_used;?></span> 条&nbsp;&nbsp;&nbsp;还可以加 <span class="f_b f_blue"><?php echo $limit_free;?></span> 条</div>
<?php } ?>
<div class="pages"><?php echo $pages;?></div>
<script type="text/javascript">s('addr');m('s3');</script>
<?php } ?>
<?php if($action=='add' || $action=='edit') { ?>
<script type="text/javascript">
function check() {
var l;
var f;
f = 'areaid_1';
if(Dd(f).value == 0) {
Dmsg('请选择所在地区', 'areaid', 1);
return false;
}
f = 'title';
l = Dd(f).value.length;
if(l < 5) {
Dmsg('请填写详细地址', f);
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
</script>
<?php } ?>
<?php include template('footer', 'member');?>