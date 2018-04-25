<?php
/*
	[DESTOON B2B System] Copyright (c) 2008-2018 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
defined('IN_DESTOON') or exit('Access Denied');
function mobile_pages($total, $page = 1, $perpage = 20, $demo = '') {
	global $DT_URL, $DT, $CFG, $L;
	if($total <= $perpage) return '';
	$total = ceil($total/$perpage);
	$page = intval($page);
	if($page < 1 || $page > $total) $page = 1;
	if($demo) {
		$demo_url = str_replace(array('%7B', '%7D'), array('{', '}'), $demo);
	} else {
		if(substr($DT_URL, -5) == '.html') {
			$demo_url = preg_replace("/[0-9]{1,}\.html/", "{destoon_page}.html", $DT_URL);
		} else {
			$demo_url = preg_replace("/(.*)([&?]page=[0-9]*)(.*)/i", "\\1\\3", $DT_URL);
			$s = strpos($demo_url, '?') === false ? '?' : '&';
			$demo_url = $demo_url.$s.'page={destoon_page}';
			$demo_url = urldecode($demo_url);
		}
	}
	$pages = '<a href="javascript:GoPage('.$total.', \''.$demo_url.'\');"><b>'.$page.'</b>/'.$total.'</a> ';
	$_page = $page >= $total ? 1 : $page + 1;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-next">'.$L['next_page'].'</a> ';

	$_page = $page <= 1 ? $total : ($page - 1);
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-prev">'.$L['prev_page'].'</a> ';

	$_page = 1;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-home">'.$L['home_page'].'</a> ';

	$_page = $total;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-last">'.$L['last_page'].'</a> ';
	return $pages;
}

function m301($moduleid, $catid = 0, $itemid = 0, $page = 1) {
	global $MODULE;
	$url = '';
	if($itemid) {
		if($moduleid > 4) {
			$item = DB::get_one("SELECT * FROM ".get_table($moduleid)." WHERE itemid=$itemid");
			if($item && $item['status'] > 2) {
				$url = $MODULE[$moduleid]['mobile'].itemurl($item, $page);
			}
		}
	} else if($catid) {
		$CAT = get_cat($catid);
		$url = $MODULE[$moduleid]['mobile'].listurl($CAT, $page);
	} else {
		$url = $MODULE[$moduleid]['mobile'];
	}
	if($url) d301($url);
}

function input_trim($wd) {
	return trim(urldecode(str_replace('%E2%80%86', '', urlencode($wd))));
}

function video5($content) {
	if(strpos($content, '<embed') !== false) {
		if(!preg_match_all("/<embed[^>]*>(.*?)<\/embed>/i", $content, $matches)) return $content;
		foreach($matches[0] as $m) {
			$content = str_replace($m, video5_player(video5_url($m)), $content);
		}
	}
	return $content;
}

function video5_url($content) {
	$url = '';
	if(strpos($content, 'vcastr3.swf') !== false) {
		$url = cutstr($content, 'source&gt;', '&lt;/');
	} else if(strpos($content, 'src="') !== false) {
		$url = cutstr($content, 'src="', '"');
	}
	return $url;
}

function video5_frame($url, $w, $h) {
	return '<iframe src="'.$url.'" width="'.$w.'" height="'.$h.'" frameborder="0" scrolling="no" allowfullscreen="true" allowtransparency="true"></iframe>';
}

function video5_play($url) {
	return '<a href="'.$url.'" target="_blank" rel="external"><div style="width:100%;height:200px;background:#000000 url('.DT_PATH.'/file/image/play.png) no-repeat center center;background-size:48px 48px;"></div></a>';
}

function video5_player($url, $w = 280, $h = 210, $a = 0) {
	$ext = file_ext($url);
	$url = url2video($url);
	$dom = cutstr($url, '://', '/');
	$u5 = '';
	if(in_array($dom, array('player.youku.com', 'v.qq.com', 'm.iqiyi.com'))) {//, 'liveshare.huya.com'
		return video5_frame($url, $w, $h);
	} else if(in_array($dom, array('www.youtube.com'))) {
		return video5_frame(url2video5($url), $w, $h);
	} else if($ext == 'mp4') {
		$u5 = $url;
	}
	return $u5 ? '<video src="'.$u5.'" width="'.$w.'" height="'.$h.'"'.($a ? ' autoplay="autoplay"' : '').' controls="controls">'.video5_play($u5).'</video>' : video5_play(url2video5($url));
}

function is_pc() {
	if(DT_DEBUG || is_robot()) return false;
	$UA = strtoupper($_SERVER['HTTP_USER_AGENT']);
	if(strpos($UA, 'WINDOWS NT') !== false) {
		if(strpos($GLOBALS['DT_URL'], 'plg_') !== false) return false;//QQ
		return true;
	}
	return false;
}

function share_icon($thumb, $content) {
	if(strpos($thumb, '.thumb.') !== false) return substr($thumb, 0, strpos($thumb, '.thumb.'));
	if($thumb) return $thumb;
	if(strpos($content, '<img') !== false) return 'auto';
	return DT_PATH.'apple-touch-icon-precomposed.png';
}
?>