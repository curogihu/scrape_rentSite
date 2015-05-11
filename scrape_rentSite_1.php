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

  $html = file_get_html('./Untitled_100.html');
  //$html = file_get_html('./Untitle.html');

  //$item = $html->find('p', 1);

  //$houses = $html->find('div[class=property-body js-cassetLink]');

  //using rather jQuery than dom?
  // 表示形式が１０、２０、３０件だと上手くいく, ５０件だと失敗、１００件でも失敗
  foreach($html->find('div[class=property-body js-cassetLink]') as $house){

    //echo "----- ----- ----- start ";
    //echo $house;

    // name
    echo $house->find('h2.property-header-titlle a.js-cassetLinkHref', 0) . '<br />';
    //print "<br />";

    $rentStr = trim($house->find('div.cassette_detail-point', 0)->plaintext);
  
    // image
    echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', 0);
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

    echo getCommentBasedOnRent($rentStr) . '<br /> '; 
    echo 'Rent fee:' . $rentStr . "<br />";
    echo 'Type:' . $house->find('div.cassette_detail-desc', 0)->plaintext . "<br />";
    echo 'Detail1:' . $house->find('td.cassette_detail-col2', 0)->plaintext . "<br />";
    echo 'Detail2:' . $house->find('td.cassette_detail-col3', 0)->plaintext . '<br />';
    echo 'Detail3:' . $house->find('td.cassette_detail-col4', 0)->plaintext . '<br />';
    echo 'Access:' . $house->find('div.cassette_note-leftbox', 0)->plaintext . "<br /><br />";

    //echo 'CompanyInformation:' . trim($house->find('div.cassette_note-desc', 0)->plaintext) . "<br />";

/*
    //問題になりそうなのでコメントアウト
    $companyInfoArr = explode(' ', trim($house->find('div.cassette_note-desc', 0)->plaintext));

    echo 'Company:' . $companyInfoArr[0] . "<br />";
    echo 'PhoneNumber' . $companyInfoArr[2] . "<br />";
*/
    //echo "----- ----- ----- end<br />";
    //print "<br /><br />";
/*
    $houses = $item->find('div');

    $iCheck = $iCheck + 1;

    $jCheck = 0;

    foreach($houses as $house){

      $jCheck = $jCheck + 1;
      echo '-----------------';
      
      $placeNameArr = $house->find('h2.property-header-titlle');
      //$thumbNailArr - $house->find('div.cassette_carrousel-thumblist');

      if(count($placeNameArr) > 0){
        echo $placeNameArr[0];
      }

      //if(count($thumbNailArr) > 0){
      //  echo $thumbNailArr[0];
      //}
    }

    echo "iCheck = " & $iCheck & ":JCheck = " & $jCheck;
*/  

    //echo '<p>' + count($houses) + '</p><br>';
/*
      foreach($houses as $house){
        $placeName = $house->find('h2.property-header-titlle a')

        echo $placeName;
      }
      */
      //echo $item->innertext."<br />";
/*
      echo '敷金'
      echo '礼金'
      echo '保証金'
      echo '敷引・償却'
      echo '間取りの種類'
      echo '面積'
      echo '向き'
      echo '建物の種類'
      echo '築年数'
      echo '住所'
      echo '電車'
*/

/*
      タイトル　<h2 class="property-header-titlle">

*/

      //echo '------------------------------------';
      //echo $item;

      //$placeNames = $item->find('h2.property-header-titlle a');

      //foreach($placeNames as $placeName){
      //  echo $placeName;
      //}
      
      //echo $placeName;
  }

  function getCommentBasedOnRent($targetRentStr){
    $rentNum = (double)str_replace("万円", "", $targetRentStr);
    $returnMessage = '';

    //echo "test = " . $targetRentStr;
    //echo "value = " . $rentNum;

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
