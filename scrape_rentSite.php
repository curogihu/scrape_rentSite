<?php
  //後々、実装
  //define("LIMIT_HOUSE_IMAGE_NUM", 3);

  //inctioのライブラリ呼び出し

// 自動更新
  include_once('IXR_Library.php');

  //example.comは投稿先アドレスに変える
  $client = new IXR_Client("http://??????????????/xmlrpc.php");
  $wp_username = "??????????";
  $wp_password = "??????????";
  $returnValue = -1;

  // 
  require_once 'simplehtmldom/simple_html_dom.php';

  // ランキングページの1ページ目のURL(1位~20位)
  $page_url = "http://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ta=13&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&sc=13106&sc=13107&sc=13108&sc=13118&sc=13121&sc=13122&sc=13123&sc=13109&sc=13110&sc=13111&sc=13112&sc=13114&sc=13115&sc=13120&sc=13116&sc=13117&sc=13119&cb=0.0&ct=3.0&mb=0&mt=9999999&et=9999999&cn=9999999&shkr1=03&shkr2=03&shkr3=03&shkr4=03&sngz=&po1=09&";

  // ランキングページのHTMLを取得
  $page_data = mb_convert_encoding(file_get_contents($page_url),'UTF-8','auto');
  
  // simple_html_dom.phpを読み込む
  require_once 'simplehtmldom/simple_html_dom.php';
  
  // 取得したhtmlのsimple_html_domオブジェクトを作成
  $shd_obj = str_get_html($page_data);

  // 表示形式が１０、２０、３０件だと上手くいく, ５０件だと失敗、１００件でも失敗
  foreach($shd_obj->find('div[class=property-body js-cassetLink]') as $house){

//
    //明日、以下の文をループするように編集する
    $status = $client->query(
    "wp.newPost", //使うAPIを指定（wp.newPostは、新規投稿）
    1, // blog ID: 通常は１、マルチサイト時変更
    $wp_username, // ユーザー名
    $wp_password, // パスワード
    array(
      'post_author' => 1, // 投稿者ID 未設定の場合投稿者名なしになる。
      'post_status' => 'publish', // 投稿状態
      'post_title' => 'テスト投稿です。', // タイトル
      'post_content' => 'テスト投稿本文です。', //　本文
      //'terms' => array('category' => array(1))　// カテゴリ追加
      //'terms' => array('category' => '東京23区')　// カテゴリ追加
    
      //最初は１からスタート。 未分類 = 1, 東京23区 = 2...
      'terms' => array('category' => array(2)), // カテゴリ追加

      //タグは事前登録不要
      'terms_names' => array('post_tag' => array('タグ１','タグ２'))
    )
  );

  if(!$status){
    die('Something went wrong - '.$client->getErrorCode().' : '.$client->getErrorMessage());

  } else {
    $post_id = $client->getResponse(); //返り値は投稿ID
    $returnValue = $post_id; 
  }

//    

    // name
    echo $house->find('h2.property-header-titlle a.js-cassetLinkHref', 0) . '<br />';
    //print "<br />";

    $rentStr = trim($house->find('div.cassette_detail-point', 0)->plaintext);

    echo getCommentBasedOnRent($rentStr) . '<br /> '; 
    echo '家賃:' . $rentStr . "<br />";
    echo 'その他の費用:' . $house->find('td.cassette_detail-col2', 0)->plaintext . "<br />";
    echo '部屋の種類, 広さ:' . $house->find('td.cassette_detail-col3', 0)->plaintext . '<br />';
    echo '築年数:' . $house->find('td.cassette_detail-col4', 0)->plaintext . '<br />';

    // class指定がなぜか無いため、tdの位置を決め打ち
    echo '住所:' . $house->find('td', 4)->plaintext . '<br />';
    echo 'アクセス:' . $house->find('div.cassette_note-leftbox', 0)->plaintext . "<br /><br />";
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
    
    $wardNameArr = Split("港区,新宿区,品川区,目黒区,大田区,世田谷区," &
                          "渋谷区,中野区,杉並区,練馬区,台東区,墨田区," &
                          "江東区,荒川区,足立区,葛飾区,江戸川区," &
                          "千代田区,中央区,文京区,豊島区,北区,板橋区", ",");

    foreach($wardNameArr as $wardName){
      if(strpos($targetAddress, $wardName)){
        return $wardName;
      }
    }

    return "Undifined";
  }
  
  //東京都福祉保健局による区分
  function getAreaBasedOnWard($targetWardName){
    $eastWardNameArr = Split("港区,新宿区,品川区,目黒区,大田区,世田谷区," & 
                              "渋谷区,中野区,杉並区,練馬区", ",");
    
    $westWardNameeArr = Split("台東区,墨田区,江東区,荒川区,足立区,葛飾区," & 
                              "江戸川区,千代田区,中央区,文京区,豊島区,北区," & 
                              "板橋区", ",");

    foreach($eastWardNameArr as $eastWardName){
      if($targetWardName === $wardName){
        return "東京東部";
      }
    }

    foreach($westWardNameeArr as $wastWardName){
      if($targetWardName === $wardName){
        return "東京西部";
      }
    }

    return "Undefined";
  }

?>