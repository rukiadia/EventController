/**
 * Created on 2014/07/03.
 */
function searchEvent(siteName){

  // 検索キーワード取得
  var keyword = $('#keyword').val();
  console.log(keyword);

  // ローディング画像表示 通信処理終了時に消去
  $('#loading').html("<i class='fa fa-spinner fa-3x fa-spin'></i>");

  // 前回の検索結果を消す
  $('#result').empty();

  if (siteName.id === 'atnd') {
    console.log('atnd');

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
        $('#result').append('<p>Atnd イベント検索結果</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開催日時: ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#result').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'zusaar') {
    console.log('zusaar');

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
        $('#result').append('<p>Zusaar イベント検索結果</p>');

        var eventInfo = data.event;
        console.log(eventInfo);

        $.each(eventInfo, function(key, value){
          $('#result').append('URL： ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('eventTitle： ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('place： ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('address： ' + eventInfo[key]['address'] + '<br>');
          $('#result').append('start： ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function(data) {
        console.log('error');
        $('#result').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'connpass') {
    console.log('connpass');

    // search URL
    var targetUrl = 'http://connpass.com/api/v1/event/' + '?keyword=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#result').append('<p>connpass イベント検索結果</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('開始日時: ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#result').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索が完了しました。');
      }
    });

  } else if (siteName.id === 'doorkeeper') {
    console.log('doorkeeper');

    // search URL
    var targetUrl = 'http://api.doorkeeper.jp/events/' + '?q=' + keyword;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#result').append('<p>doorkeeper イベント検索結果</p>');

        var eventInfo = data;
        console.log(eventInfo);

        $.each(eventInfo, function(key, value){
          $('#result').append('イベントタイトル: ' + eventInfo[key]['event']['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event']['public_url'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['event']['address'] + '<br>');
          $('#result').append('開催日時: ' + eventInfo[key]['event']['starts_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#result').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索が完了しました。');
      }
    });
  }

}
