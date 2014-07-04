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

  // 前回の検索結果、メッセージを消す
  $('#message').empty();
  $('#result').empty();

  if (siteName.id === 'atnd') {

    // search URL
    var atndUrl = 'http://api.atnd.org/events/';
    var format = 'jsonp';

    var targetUrl = atndUrl + '?keyword=' + keyword + '&format=' + format;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#message').append('<p>Atnd イベント検索結果</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value) {
          // TODO 日付が古いイベントは画面に出力しないように
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開催日時: ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#message').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'zusaar') {

    // search URL
    var format = 'jsonp';
    var targetUrl = 'http://www.zusaar.com/api/event/' + '?keyword=' + keyword + '&format=' + format;
    console.log(targetUrl);

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#message').append('<p>Zusaar イベント検索結果</p>');

        var eventInfo = data.event;

        $.each(eventInfo, function(key, value) {

          // TODO 日付が古いイベントは画面に出力しないように
          $('#result').append('URL： ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('eventTitle： ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('place： ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('address： ' + eventInfo[key]['address'] + '<br>');
          $('#result').append('start： ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function(data) {
        console.log('error');
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#message').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'connpass') {

    // search URL
    var targetUrl = 'http://connpass.com/api/v1/event/' + '?keyword=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#message').append('<p>connpass イベント検索結果</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){
          // TODO 日付が古いイベントは画面に出力しないように
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開始日時: ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#message').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#message').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'doorkeeper') {

    // search URL
    var targetUrl = 'http://api.doorkeeper.jp/events/' + '?q=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#message').append('<p>doorkeeper イベント検索結果</p>');

        var eventInfo = data;

        $.each(eventInfo, function(key, value) {

          var eventTime = new Date(eventInfo[key]['event']['starts_at']);

          if (today > eventInfo[key]['event']['starts_at']) {
            // 既に終了したイベントは画面に出力しない
            return true;
          }

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
        $('#loading').empty();
        $('#message').append('検索が完了しました。');

        // 表示する内容が無かった場合の処理
        if ( $('#result *').length === 0 ){
          $('#message').append('該当項目はありませんでした。');
        } else {
          $('#message').append('該当項目は' + count + '件です。');
        }
      }
    });
  }
}
