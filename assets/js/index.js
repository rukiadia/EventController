/**
 * Created on 2014/07/03.
 */
function searchEvent(){

  // search zusaar
  var targetUrl = 'http://www.zusaar.com/api/event/?ymd=20140707&format=jsonp';

  $.ajax({
    url: targetUrl,
    type: 'GET',
    dataType: 'jsonp',
    timeout: 10000,
    success: function(data, jsonp) {

      var events = data.event;
      console.log(events);

      $.each(events, function(key, value){
        console.log(key + ':' + events[key]['title']);
      });

      $('#result').append('eventURL： ' + events[0]['event_url'] + '<br>');
      $('#result').append('eventTitle： ' + events[0]['title']);

    },
    error: function(data) {
      console.log('error');
    },
    complete: function() {
      console.log('complete');
    }
  });
}
