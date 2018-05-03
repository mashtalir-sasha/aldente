<?
	if(isset ($_POST['title'])) {$title=$_POST['title'];}
	if(isset ($_POST['place'])) {$place=$_POST['place'];}
	if(isset ($_POST['name'])) {$name=$_POST['name'];}
	if(isset ($_POST['phone'])) {$phonenum=$_POST['phone'];}
	if(isset ($_POST['email'])) {$email=$_POST['email'];}
	if(isset ($_POST['teeth'])) {$teeth=$_POST['teeth'];}
	if(isset ($_POST['time'])) {$time=$_POST['time'];}
	
	//$to = "mashtalir_sasha@ukr.net";
	if ($place == "ул. Анны Ахматовой, 7/15") {
		$to = "aldente.kiev@gmail.com, svetalatayko88@gmail.com";
		$manager = 2;
	} elseif ($place == "ул. Урловская, 9") {
		$to = "aldente2.kiev@gmail.com, svetalatayko88@gmail.com";
		$manager = 4;
	} else {
		$to = "aldente.kiev@gmail.com, svetalatayko88@gmail.com";
		$manager = 1;
	}

	$message = "Форма: $title <br><br>";
	if ( $name || $phonenum || $email || $teeth || $time || $place ) {
		$message .= ""
			. ( $name ?" Имя:  $name <br>" : "")
			. ( $phonenum ?" Телефон:  $phonenum <br>" : "")
			. ( $email  ? " E-mail: $email <br>" : "")
			. ( $time  ? " Удобное время визита: $time <br>" : "")
			. ( $place  ? " Клиника: $place <br>" : "")
			. ( $teeth  ? " Зубы: $teeth <br>" : "");
	}

	if ( $teeth || $time || $place ) {
		$comments .= ""
			. ( $time  ? " Удобное время визита: $time <br>" : "")
			. ( $place  ? " Клиника: $place <br>" : "")
			. ( $teeth  ? " Зубы: $teeth <br>" : "");
	}

	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=UTF-8\r\n";
	$headers .= "From: no-reply@aldente.in.ua"; // Заменить домен на домен клиента

	if (!$title && !$phonenum) {
	} else {
		mail($to,"New lead(aldente.in.ua)",$message,$headers); // Заменить домен на домен клиента

		define('CRM_HOST', 'aldente.bitrix24.ua');
		define('CRM_PORT', '443');
		define('CRM_PATH', '/crm/configs/import/lead.php');
		define('CRM_AUTH', '9cf1be337c00e7ffe59ad9dfbdba3747');
		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$postData = array(
				'TITLE' => $title,
				'NAME' => $name,
				'PHONE_WORK' => $phonenum,
				'EMAIL_WORK' => $email,
				'SOURCE_ID' => WEB,
				'COMMENTS' => $comments,
				'ASSIGNED_BY_ID' => $manager
			);
			if (defined('CRM_AUTH')) {
				$postData['AUTH'] = CRM_AUTH;
			} else {
				$postData['LOGIN'] = CRM_LOGIN;
				$postData['PASSWORD'] = CRM_PASSWORD;
			}
			$fp = fsockopen("ssl://".CRM_HOST, CRM_PORT, $errno, $errstr, 30);
			if ($fp) {
				$strPostData = '';
				foreach ($postData as $key => $value)
					$strPostData .= ($strPostData == '' ? '' : '&').$key.'='.urlencode($value);
				$str = "POST ".CRM_PATH." HTTP/1.0\r\n";
				$str .= "Host: ".CRM_HOST."\r\n";
				$str .= "Content-Type: application/x-www-form-urlencoded\r\n";
				$str .= "Content-Length: ".strlen($strPostData)."\r\n";
				$str .= "Connection: close\r\n\r\n";
				$str .= $strPostData;
				fwrite($fp, $str);
				$result = '';
				while (!feof($fp)) {
					$result .= fgets($fp, 128);
				}
				fclose($fp);
				$response = explode("\r\n\r\n", $result);
				$output = '<pre>'.print_r($response[1], 1).'</pre>';
			} else {
				echo 'Connection Failed! '.$errstr.' ('.$errno.')';
			}
		} else {$output = '';}
	}
?>