<?php
  
  define("LIMIT_HOUSE_IMAGE_NUM", 3);

  //inctioのライブラリ呼び出し
  include_once('IXR_Library.php');

  require_once 'simplehtmldom/simple_html_dom.php';

  date_default_timezone_set("JST");

  //インターネットから取り込み
  //$page_url = "http://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ta=13&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&sc=13106&sc=13107&sc=13108&sc=13118&sc=13121&sc=13122&sc=13123&sc=13109&sc=13110&sc=13111&sc=13112&sc=13114&sc=13115&sc=13120&sc=13116&sc=13117&sc=13119&cb=0.0&ct=3.0&mb=0&mt=9999999&et=9999999&cn=9999999&shkr1=03&shkr2=03&shkr3=03&shkr4=03&sngz=&po1=09&";
  //$page_data = mb_convert_encoding(file_get_contents($page_url),'UTF-8','auto');
  //$html = str_get_html($page_data);

  
/*
  $imgInfo = getimagesize('tmp.jpg');
  $type = $imgInfo['mime'];
  $bits = new IXR_Base64(file_get_contents('tmp.jpg'));
*/

  //ローカルから取り込み
  $html = file_get_html('./Untitled_100.html');

  //example.comは投稿先アドレスに変える
  $client = new IXR_Client("http://xxxx/xmlrpc.php");
  $wp_username = "yyyy";
  $wp_password = "zzzz";
  //$cnt = 0;

  $returnValue = -1;

  foreach($html->find('div[class=property-body js-cassetLink]') as $house){
/*
    if($cnt > 5){
      break;
    }

    $cnt++;
*/
    $homeNameAnchor = $house->find('h2.property-header-titlle a.js-cassetLinkHref', 0);
    $homeName = $homeNameAnchor->plaintext;
    $rentStr = trim($house->find('div.cassette_detail-point', 0)->plaintext);
    $comment = getCommentBasedOnRent($rentStr) . '<br /> '; 
    $homeType = $house->find('div.cassette_detail-desc', 0)->plaintext;
    $homeOtherFee = $house->find('td.cassette_detail-col2', 0)->plaintext;
    $homeSize = $house->find('td.cassette_detail-col3', 0)->plaintext;
    $homeCreatedYear = $house->find('td.cassette_detail-col4', 0)->plaintext;
    $homeAccess = $house->find('div.cassette_note-leftbox', 0)->plaintext;
    $homeAddress = $house->find('td', 4)->plaintext;

//      echo '名称: ' . $homeNameAnchor . '\n' . 'test';

    $homeContents = '詳細のリンク: ' . $homeNameAnchor . '<br>' . 
                    '家賃: ' . $rentStr . '   ' . $comment . '<br>' .
                    'タイプ: ' . $homeType . '<br>' .
                    'その他費用: ' . $homeOtherFee . '<br>' .
                    '広さ: ' . $homeSize . '<br>' .
                    '築年数: ' . $homeCreatedYear . '<br>' .
                    'アクセス: ' . $homeAccess . '<br>' . 
                    '住所: ' . $homeAddress . '<br>';
    echo date("H:i:s");
    echo "<br><br>";
    echo $homeContents;

    $houseImageCnt = count($house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu'));

    echo $houseImageCnt . "<br>";

    if(LIMIT_HOUSE_IMAGE_NUM > $houseImageNum){
      $limitHouseImageNum = $houseImageNum;

    }else{
      $limitHouseImageNum = LIMIT_HOUSE_IMAGE_NUM;
    }

    $houseI = $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu');

    //rel取得ok
    foreach($houseI as $tst){
      echo $tst->rel . "<br>";
    }

  //  for($i = 0; $i < $limitHouseImageNum; $i++){
      //echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', 0);
 //   }
/*
    $homeImages = $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu');

    $cnt = 0;
    foreach($homeImages as $homeImage){
      echo ($cnt + 1) . " " . $homeImage . "<br>";
      //echo $cnt;
      $cnt++;
    }
*/

/*
    $status = $client->query(
      "wp.newPost", //使うAPIを指定（wp.newPostは、新規投稿）
      1, // blog ID: 通常は１、マルチサイト時変更
      $wp_username, // ユーザー名
      $wp_password, // パスワード
      array(
        'post_author' => 1, // 投稿者ID 未設定の場合投稿者名なしになる。
        'post_status' => 'draft', // 投稿状態, draft, private, publish, pendingの４つ
        'post_title' => $homeName, // タイトル
        'post_content' => $homeContents, //　本文
        //'terms' => array('category' => array(1))　// カテゴリ追加
        //'terms' => array('category' => '東京23区')　// カテゴリ追加
      
        //最初は１からスタート。 未分類 = 1, 東京23区 = 2...
        'terms' => array('category' => array(2)), // カテゴリ追加

        //タグは事前登録不要
        'terms_names' => array('post_tag' => array(getWardBasedOnAddress($homeAddress)))
      )
    );

    if(!$status){
      die('Something went wrong - '.$client->getErrorCode().' : '.$client->getErrorMessage());

    } else {
      $post_id = $client->getResponse(); //返り値は投稿ID
      $returnValue = $post_id; 
    }
*/
  }

  echo "finished";

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

  function getWardBasedOnAddress($targetAddress){
    
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