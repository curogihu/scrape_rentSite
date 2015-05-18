<?php
  
  define("LIMIT_HOUSE_IMAGE_NUM", 3);
  date_default_timezone_set("Asia/Tokyo");

  //inctioのライブラリ呼び出し
  include_once('IXR_Library.php');

  require_once 'simplehtmldom/simple_html_dom.php';

  
  //インターネットから取り込み
  //$page_url = "URL";
  //$page_data = mb_convert_encoding(file_get_contents($page_url),'UTF-8','auto');
  //$html = str_get_html($page_data);

  //ローカルから取り込み
  $html = file_get_html('./Untitled_100.html');

  //example.comは投稿先アドレスに変える
  $client = new IXR_Client("http://xxxx/xmlrpc.php");
  $wp_username = "yyyy";
  $wp_password = "zzzz";

  $returnValue = -1;

  foreach($html->find('div[class=property-body js-cassetLink]') as $house){

 //   echo getPostHouseContents($house);

    //wordpressへの投稿
    $status = $client->query(
      "wp.newPost", //使うAPIを指定（wp.newPostは、新規投稿）
      1, // blog ID: 通常は１、マルチサイト時変更
      $wp_username, // ユーザー名
      $wp_password, // パスワード
      array(
        'post_author' => 1, // 投稿者ID 未設定の場合投稿者名なしになる。
        'post_status' => 'draft', // 投稿状態, draft, private, publish, pendingの４つ
        'post_title' => getHouseName($house), // タイトル
        'post_content' => getPostHouseContents($house), //　本文
        //'terms' => array('category' => array(1))　// カテゴリ追加
        //'terms' => array('category' => '東京23区')　// カテゴリ追加
      
        //最初は１からスタート。 未分類 = 1, 東京23区 = 2...
        'terms' => array('category' => array(2)), // カテゴリ追加

        //タグは事前登録不要
        //'terms_names' => array('post_tag' => array(getWardBasedOnAddress($house)))
      )
    );

    if(!$status){
      die('Something went wrong - '.$client->getErrorCode().' : '.$client->getErrorMessage());
      continue;

    }else{
      $post_id = $client->getResponse(); //返り値は投稿ID
      $returnValue = $post_id; 
    }
/*   
    $houseImages = $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu');
    $houseImageCnt = count($houseImages);
    
    // ここからは画像関連
    if(LIMIT_HOUSE_IMAGE_NUM > $houseImageCnt){
      $limitHouseImageNum = $houseImageCnt;

    }else{
      $limitHouseImageNum = LIMIT_HOUSE_IMAGE_NUM;
    }

    $i = 0;

    foreach($houseImages as $houseImage){
      $houseImagePath = $houseImage->rel;

      echo $houseImagePath . "<br>";

      //$foundIdx = strrpos($houseImagePath, "/");
      $houseImageFileName = substr($houseImagePath, strrpos($houseImagePath, "/") + 1);
      $reserveFilePath = "images/" . $houseImageFileName;

      $imageFile = file_get_contents($houseImagePath);
      file_put_contents($reserveFilePath, $imageFile);

      $imgInfo = getimagesize($reserveFilePath);
      $type = $imgInfo['mime'];
      
      //echo $type . "<br>";

      // 原因不明で画像パスないときがある
      if(!empty($type)){

        $bits = new IXR_Base64(file_get_contents($reserveFilePath));

        $status2 = $client->query(
          "wp.uploadFile",
          1,
          $wp_username,
          $wp_password,
          array(
            'name' => $houseImageName,
            'type' => $type,
            'bits' => $bits,
            'overwrite' => false,
            'post_id' => $post_id
          )
        );


      }

      $i++;

      if($i >= $limitHouseImageNum){
        break;
      }
    }
*/
  } 
      
  echo "finished";

  function getPostHouseContents($targetHouse){
    $homeNameAnchor = $targetHouse->find('h2.property-header-titlle a.js-cassetLinkHref', 0);
    $homeName = $homeNameAnchor->plaintext;
    $rentStr = trim($targetHouse->find('div.cassette_detail-point', 0)->plaintext);
    $comment = getCommentBasedOnRent($rentStr) . '<br /> '; 
    $homeType = $targetHouse->find('div.cassette_detail-desc', 0)->plaintext;
    $homeOtherFee = $targetHouse->find('td.cassette_detail-col2', 0)->plaintext;
    $homeSize = $targetHouse->find('td.cassette_detail-col3', 0)->plaintext;
    $homeCreatedYear = $targetHouse->find('td.cassette_detail-col4', 0)->plaintext;
    $homeAccess = $targetHouse->find('div.cassette_note-leftbox', 0)->plaintext;
    $homeAddress = $targetHouse->find('td', 4)->plaintext;

    //phpでMAPの書き方をぐぐる。　→ 関数化
    $postHouseContents = '詳細のリンク: ' . $homeNameAnchor . '<br>' . 
                    '家賃: ' . $rentStr . '   ' . $comment . '<br>' .
                    'タイプ: ' . $homeType . '<br>' .
                    'その他費用: ' . $homeOtherFee . '<br>' .
                    '広さ: ' . $homeSize . '<br>' .
                    '築年数: ' . $homeCreatedYear . '<br>' .
                    'アクセス: ' . $homeAccess . '<br>' . 
                    '住所: ' . $homeAddress . '<br>' .
                    '投稿日時: ' . date("H:i:s") . '<br><br>';

    return $postHouseContents;

  }

  function getHouseName($targetHouse){
    return $targetHouse->find('h2.property-header-titlle a.js-cassetLinkHref', 0)->plaintext;
  }

  function getCommentBasedOnRent($targetRentStr){
    $rentNum = (double)str_replace("万円", "", $targetRentStr);
    $returnMessage = '';

    switch (true){
        case ($rentNum <= 1):
          $returnMessage = '近年まれにみる安さ！！';
          break; 

        case ($rentNum <= 2):
          $returnMessage = '爆安！';
          break;

        case ($rentNum <= 3):
          $returnMessage = '手頃な安さ';
          break; 

        case ($rentNum <= 4):
          $returnMessage = 'そこそこの安さ';
          break; 

        case ($rentNum <= 5):
          $returnMessage = '人並みの値段';
          break;

        default:
          $returnMessage = 'なにこれ？高すぎ';
          break;

    }

    return $returnMessage;
  }

  function getWardBasedOnAddress($targetHouse){
    $targetAddress = $targetHouse->find('td', 4)->plaintext;
    
    $wardNameArr = Split(",", "港区,新宿区,品川区,目黒区,大田区,世田谷区," .
                          "渋谷区,中野区,杉並区,練馬区,台東区,墨田区," .
                          "江東区,荒川区,足立区,葛飾区,江戸川区," .
                          "千代田区,中央区,文京区,豊島区,北区,板橋区");

    foreach($wardNameArr as $wardName){
      if(strstr($targetAddress, $wardName)){
        return $wardName;
      }
    }

    return "Undifined";
  }
  
  //東京都福祉保健局による区分
/*
  function getAreaBasedOnAddress($targetAddress){
    $eastWardNameArr = Split(",", "港区,新宿区,品川区,目黒区,大田区,世田谷区," . 
                              "渋谷区,中野区,杉並区,練馬区", ",");
    
    $westWardNameeArr = Split(",", "台東区,墨田区,江東区,荒川区,足立区,葛飾区," . 
                              "江戸川区,千代田区,中央区,文京区,豊島区,北区," . 
                              "板橋区");

    //なぜか東部が機能しない。
    foreach($eastWardNameArr as $wardName){
      if(strstr($targetAddress, $wardName)){
        return "東京東部";
      }
    }

    foreach($westWardNameeArr as $wardName){
      if(strstr($targetAddress, $wardName)){
        return "東京南部";
      }
    }

    return "Undefined";
  }
  */