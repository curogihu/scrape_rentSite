<?php
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

  $html = file_get_html('./Untitle.html');
  //$item = $html->find('p', 1);

  $houses = $html->find('div[class=property-body js-cassetLink]');


  //using rather jQuery than dom?
  foreach($houses as $house){

    echo "----- ----- ----- start ";
    //echo $house;

    // name
    echo $house->find('h2.property-header-titlle a.js-cassetLinkHref', 0);
    print "<br />";
    
    // image
    echo $house->find('div.cassette-body div.cassette_carrousel-thumblist img.js-noContextMenu', 0);
    print "<br />";

    //$houseDetail = $house->find('div.cassette_detail');
    echo 'Rent fee:' . $house->find('div.cassette_detail-point', 0);
    echo 'Type:' . $house->find('div.cassette_detail-desc', 0);
    echo 'Detail:' . $house->find('td.cassette_detail-col2', 0);

    // rent fee
    //echo "rent fee:" & $houseDetail->find('div.assette_detail-point', 0);

    echo "----- ----- ----- end";
    print "<br /><br />";
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
