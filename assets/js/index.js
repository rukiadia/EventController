/**
 * Created on 2014/07/03.
 */
function searchEvent(siteName){

  // 検索キーワード取得
  var keyword = $('#keyword').val();

  // 検索結果の該当件数
  var count = 0;

  // 現在時刻を取得(イベント日時との比較のため、ISO形式)
  var date = new Date();
  var today = date.toISOString();

  // ISO形式を日本時間にする際のオプション
  var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
  };

  // ローディング画像表示 通信処理終了時に消去
  $('#loading').html("<i class='fa fa-spinner fa-3x fa-spin'></i>");

  // 前回の画面表示を消す
  $('#message').empty();
  $('#result').empty();

  if (siteName.id === 'atnd') {

    var atndUrl = 'http://api.atnd.org/events/';
    var format = 'jsonp';

    var targetUrl = atndUrl + '?keyword=' + keyword + '&format=' + format;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#message').append('<p>ATND イベント検索</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value) {

          if (eventInfo[key]['started_at'] < today) {
            // 既に終了したイベントは画面に出力しない
            return true;
          }

          var eventTime = new Date(eventInfo[key]['started_at']);
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開催日時: ' + eventTime.toLocaleDateString('ja-JP', options) + '<br><br>');
        });
      },
      error: function() {
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        showComplete();
      }
    });

  } else if (siteName.id === 'connpass') {

    var targetUrl = 'http://connpass.com/api/v1/event/' + '?keyword=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#message').append('<p>connpass イベント検索</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){

          if (eventInfo[key]['started_at'] < today) {
            // 既に終了したイベントは画面に出力しない
            return true;
          }

          var eventTime = new Date(eventInfo[key]['started_at']);
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開始日時: ' + eventTime.toLocaleDateString('ja-JP', options) + '<br><br>');

          count += 1;
        });
      },
      error: function() {
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        showComplete();
      }
    });

  } else if (siteName.id === 'doorkeeper') {

    var targetUrl = 'http://api.doorkeeper.jp/events/' + '?q=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#message').append('<p>doorkeeper イベント検索</p>');

        var eventInfo = data;

        $.each(eventInfo, function(key) {

          if (eventInfo[key]['event']['starts_at'] < today) {
            // 既に終了したイベントは画面に出力しない
            return true;
          }

          var eventTime = new Date(eventInfo[key]['event']['starts_at']);
          $('#result').append('イベントタイトル: ' + eventInfo[key]['event']['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event']['public_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['event']['address'] + '<br>');
          $('#result').append('開催日時: ' + eventTime.toLocaleDateString('ja-JP', options) + '<br><br>');

          count += 1;
        });
      },
      error: function() {
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        showComplete();
      }
    });
  }
}

/*
 * 検索完了時の画面表示
 */
function showComplete() {

  $('#loading').empty();
  $('#message').append('検索が完了しました。');

  // 表示する内容が無かった場合の処理
  if ( $('#result *').length === 0 ){
    $('#message').append('該当項目はありませんでした。');
  } else {
    $('#message').append('該当項目は' + count + '件です。');
  }

}
