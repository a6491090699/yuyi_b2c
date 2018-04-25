<?php defined('IN_DESTOON') or exit('Access Denied');?><table cellpadding="0" cellspacing="0" width="700" align="center">
<tr>
<td><a href="<?php echo DT_PATH;?>" target="_blank"><img src="<?php if($DT['logo']) { ?><?php echo $DT['logo'];?><?php } else { ?><?php echo DT_SKIN;?>image/logo.gif<?php } ?>
" style="margin:10px 0;border:none;" alt="<?php echo $DT['sitename'];?> LOGO" title="<?php echo $DT['sitename'];?>"/></a></td>
</tr>
<tr>
<td style="border-top:solid 1px #DDDDDD;border-bottom:solid 1px #DDDDDD;padding:10px 0;line-height:200%;font-family:'Microsoft YaHei',Verdana,Arial;font-size:14px;color:#333333;">
Hi, <?php echo $touser;?>：<br/>
<?php echo $content;?>
</td>
</tr>
<tr>
<td style="line-height:22px;padding:10px 0;font-family:'Microsoft YaHei',Verdana,Arial;font-size:12px;color:#666666;">
请注意：此信件系<a href="<?php echo DT_PATH;?>" target="_blank" style="color:#005590;"><?php echo $DT['sitename'];?></a>系统信使自动发送，请勿直接回复
</td>
</tr>
</table>