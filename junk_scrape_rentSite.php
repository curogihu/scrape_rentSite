<?php

  define("LIMIT_HOUSE_IMAGE_NUM", 3);

  // ランキングページの1ページ目のURL(1位~20位)
  //$page_url = "http://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ta=13&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&sc=13106&sc=13107&sc=13108&sc=13118&sc=13121&sc=13122&sc=13123&sc=13109&sc=13110&sc=13111&sc=13112&sc=13114&sc=13115&sc=13120&sc=13116&sc=13117&sc=13119&cb=0.0&ct=3.0&et=9999999&mb=0&mt=9999999&cn=9999999&shkr1=03&shkr2=03&shkr3=03&shkr4=03&fw2=";

  // ランキングページのHTMLを取得
  //$page_data = mb_convert_encoding(file_get_contents($page_url),'UTF-8','auto');
  //$page_data = "./Untitle.html"

  // simple_html_dom.phpを読み込む
  require_once 'simplehtmldom/simple_html_dom.php';
  
  // 取得したhtmlのsimple_html_domオブジェクトを作成
  //$shd_obj = str_get_html($page_data);

  //var_dump($shd_obj);

  //property-body js-cassetLink

  //$html = file_get_html('./Untitled2.html');
  $html = file_get_html('./Untitle.html');
  //$houses = $html->find('div');

  $houses = $html->find('div.property');
  echo 'test';


  for($i = 0; $i < 10 ; $i++){
    echo $i;
  }
  //属性による抽出対象の指定
  //foreach($html->find(‘a[title=top]’) as $element){
/*
  foreach($html->find(‘a’) as $element){
    echo $element->plaintext.’<br>’;
  }
*/

  //using rather jQuery than dom?
  foreach($houses as $house){

    echo "----- ----- ----- start ";
    echo $house;

    // name
    //echo $house->find('h2.property-header-titlle a.js-cassetLinkHref', 0) . '<br />';

    //$rentStr = trim($house->find('div.cassette_detail-point', 0)->plaintext);
  
    // image
    //echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', 0);
/*
    foreach($house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu') as $houseImages){
      echo $houseImages->src. '<br>';
    }
/*
    foreach($house->find(‘img’) as $element){
      echo $element->src. ’<br>’;
    }
*/
    //echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', 1);
/*    
    $houseImageNum = count($house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu'));

    //checking input ok
    //echo $houseImageNum;
    
    if(LIMIT_HOUSE_IMAGE_NUM > $houseImageNum){
      $limitHouseImageNum = $houseImageNum;

    }else{
      $limitHouseImageNum = LIMIT_HOUSE_IMAGE_NUM;
    }

    echo $houseImageNum . "   " . $limitHouseImageNum;


    for($i = 0; $i < $limitHouseImageNum; $i++){
      echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', $i);
    }

    print "<br />";
*/
    //$houseDetail = $house->find('div.cassette_detail');
    //$rentStr = trim($house->find('div.cassette_detail-point', 0)->plaintext);

//    echo getCommentBasedOnRent($rentStr) . '<br /> '; 
//    echo 'Rent fee:' . $rentStr . "<br />";
//    echo 'Type:' . $house->find('div.cassette_detail-desc', 0)->plaintext . "<br />";
//    echo 'Detail1:' . $house->find('td.cassette_detail-col2', 0)->plaintext . "<br />";
//    echo 'Detail2:' . $house->find('td.cassette_detail-col3', 0)->plaintext . '<br />';
//    echo 'Detail3:' . $house->find('td.cassette_detail-col4', 0)->plaintext . '<br />';
//    echo 'Access:' . $house->find('div.cassette_note-leftbox', 0)->plaintext . "<br /><br />";

    //echo 'CompanyInformation:' . trim($house->find('div.cassette_note-desc', 0)->plaintext) . "<br />";

/*
    //問題になりそうなのでコメントアウト
    $companyInfoArr = explode(' ', trim($house->find('div.cassette_note-desc', 0)->plaintext));

    echo 'Company:' . $companyInfoArr[0] . "<br />";
    echo 'PhoneNumber' . $companyInfoArr[2] . "<br />";
*/
    //echo "----- ----- ----- end<br />";
    //print "<br /><br />";

//  }

  function getCommentBasedOnRent($targetRentStr){
    $rentNum = (double)str_replace("万円", "", $targetRentStr);
    $returnMessage = '';

    switch (true){
        case ($rentNum <= 1):
          $returnMessage = '近年まれにみる安さ！！';
          break; 

        case ($rentNum <= 1.5):
          $returnMessage = '爆安！';
          break;

        case ($rentNum <= 2):
          $returnMessage = '手頃な安さ';
          break; 

        case ($rentNum <= 2.5):
          $returnMessage = 'そこそこの安さ';
          break; 

        case ($rentNum <= 3):
          $returnMessage = '人並みの値段';
          break;

        default:
          $returnMessage = 'なにこれ？高すぎ';
          break;

    }

    return $returnMessage;
  }
