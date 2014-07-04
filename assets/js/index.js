/**
 * Created on 2014/07/03.
 */
function searchEvent(siteName){

  // ローディング画像表示 通信処理終了時に消去
  $('#loading').html("<i class='fa fa-spinner fa-3x fa-spin'></i>");

  if (siteName.id === 'atnd') {
    console.log('atnd');

    // search URL
    var atndUrl = 'http://api.atnd.org/events/';
    var keyword = 'html5';
    var format = 'jsonp';

    var targetUrl = atndUrl + '?keyword=' + keyword + '&format=' + format;

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#result').append('<p>Atnd 検索成功</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){
          $('#result').append('イベントタイトル: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('イベントURL: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('開催日: ' + eventInfo[key]['started_at'] + '<br>');
          $('#result').append('開催場所: ' + eventInfo[key]['place'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
        $('#result').append('検索エラーが発生しました。もう一度お試しください。');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索完了');
      }
    });

  } else if (siteName.id === 'zusaar') {
    console.log('zusaar');

    // search URL
    var targetUrl = 'http://www.zusaar.com/api/event/?ymd=20140707&format=jsonp';

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        $('#result').append('<p>Zusaar 検索成功</p>');

        var eventInfo = data.event;

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
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索完了');
      }
    });

  } else if (siteName.id === 'connpass') {
    console.log('connpass');

    // search URL
    var targetUrl = 'http://connpass.com/api/v1/event/?keyword=html5';

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#result').append('<p>connpass 検索成功</p>');

        var eventInfo = data.events;

        $.each(eventInfo, function(key, value){
          $('#result').append('title: ' + eventInfo[key]['title'] + '<br>');
          $('#result').append('event_url: ' + eventInfo[key]['event_url'] + '<br>');
          $('#result').append('place: ' + eventInfo[key]['place'] + '<br>');
          $('#result').append('start: ' + eventInfo[key]['started_at'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索完了');
      }
    });

  } else if (siteName.id === 'doorkeeper') {
    console.log('doorkeeper');

    // search URL
    var targetUrl = 'http://api.doorkeeper.jp/events/?q=html5';

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, json) {
        $('#result').append('<p>doorkeeper 検索成功</p>');

        var eventInfo = data;

        $.each(eventInfo, function(key, value){
          $('#result').append('title: ' + eventInfo[key]['event']['title'] + '<br><br>');
        });
      },
      error: function() {
        console.log('error');
      },
      complete: function() {
        $('#loading').empty();
        $('#loading').append('検索完了');
      }
    });
  }

}
