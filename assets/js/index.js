/**
 * Created on 2014/07/03.
 */
function searchEvent(siteName){

  if (siteName.id === 'zusaar') {
    console.log('zusaar');

    // search URL
    var targetUrl = 'http://www.zusaar.com/api/event/?ymd=20140707&format=jsonp';

    $.ajax({
      url: targetUrl,
      type: 'GET',
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data, jsonp) {
        console.log('success');
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
        console.log('complete');
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
        console.log('success');
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
        console.log('complete');
      }
    });

  }

}
