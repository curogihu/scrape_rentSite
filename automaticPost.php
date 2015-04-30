<?php
  
  //inctioのライブラリ呼び出し
  include_once('IXR_Library.php');

  //$bits = new IXR_Base64(file_get_contents("tmp.jpg"))
/*
  $imgInfo = getimagesize('tmp.jpg');
  $type = $imgInfo['mime'];
  $bits = new IXR_Base64(file_get_contents('tmp.jpg'));
*/
  //example.comは投稿先アドレスに変える
  $client = new IXR_Client("http://??????????????/xmlrpc.php");
  $wp_username = "??????????";
  $wp_password = "??????????";

  $returnValue = -1;

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

  $imgInfo = getimagesize('tmp.jpg');
  $type = $imgInfo['mime'];
  $bits = new IXR_Base64(file_get_contents('tmp.jpg'));

  $status2 = $client->query(
    "wp.uploadFile",
    1,
    $wp_username,
    $wp_password,
    array(
    'name' => 'test.jpg',
    'type' => $type,
    'bits' => $bits,
    'overwrite' => false,
    'post_id' => $post_id
    )
  );

  $img = $client->getResponse();

/*
<a href="http://city-cheap-rent.xyz/wp-content/uploads/2015/04/test.jpg">
  <img class="alignnone size-full wp-image-62" 
        src="http://city-cheap-rent.xyz/wp-content/uploads/2015/04/test.jpg" 
        alt="test.jpg" 
        width="280" 
        height="210" />
</a>
*/

  $status3 = $client->query(
    "wp.editPost",
    1,
    $wp_username, 
    $wp_password, 
    $post_id,
    array("post_thumbnail" => $img['id'])
  );

  $thumb = $client->getResponse();

  echo $returnValue

?>