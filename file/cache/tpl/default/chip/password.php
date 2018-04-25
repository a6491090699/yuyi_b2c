<?php defined('IN_DESTOON') or exit('Access Denied');?><input name="password" type="password" size="30" class="inp" id="password" autocomplete="new-password"<?php if(isset($password)) { ?> value="<?php echo $password;?>"<?php } ?>
/>&nbsp;
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/keyboard.js"></script>
<img src="<?php echo DT_STATIC;?>file/image/keyboard.gif" title="密码键盘" alt="" class="c_p" onclick="kb_s('password', 'kb');"/>
<div id="kb" style="display:none;"></div>
<?php if($DT['md5_pass'] && ($action != 'login' || ($action == 'login' && !$MOD['passport']))) { ?>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/md5.js"></script>
<script type="text/javascript">$(function(){init_md5();});</script>
<?php } ?>