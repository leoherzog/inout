/* =======================================================
    LOGIN
======================================================= */

function glogin_callback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('gLogin: We are signed. Welcome!');
    fx_hide('divLogin');
    fx_fade('divMainList', 0, 1, 300);
    window_adjustHeight();
    mycalendar_loadIt();
  } else {
    console.log('gLogin: We are NOT signed.');
    fx_fade('divLogin', 0, 1, 300);
  }
}

/* =======================================================
    TIME FORMATTING
======================================================= */

function tickTock() {
  var rightnow = moment().format("dddd, MMMM Do, YYYY, h:mm a");
  document.getElementById('date').innerHTML = rightnow;
}

/* =======================================================
    CALENDAR
======================================================= */

function mycalendar_loadIt() {

  // loading the v3 calendar API
  gapi.client.load('calendar', 'v3', function() {
    // when the load is done
    mycalendar_getList();
  });

}

tRows = {};

function mycalendar_getList() {

  // requesting your calendar list
  var reqCals = gapi.client.calendar.calendarList.list();

  if (listConfig.calendarList.length > 0) {
    // if the config-list isnt empty, we'll load it
    for (var i = 0; i < listConfig.calendarList.length; i++) {
      var cal = listConfig.calendarList[i];
      mycalendar_checkBusy(cal);
    }
  } else {
    // however, if you left the list empty, we'll try to load your current list
    reqCals.execute(function(feed1) {
      if (!feed1.items || feed1.items.length == 0) {
        alert('There are no calendars to show.');
        return;
      }
      for (var i = 0; i < feed1.items.length; i++) {
        var cal = feed1.items[i];
        mycalendar_checkBusy(cal);
      }
    });
  }

  setTimeout(mycalendar_getList, listConfig.refresh * 1000);
}

function mycalendar_checkBusy(cal) {
  var tbodyList = document.getElementById('tbodyList');

  var reqEvents = gapi.client.calendar.events.list({
    'calendarId': cal.id,
    'timeMin': listConfig.timeMin,
    'timeMax': listConfig.timeMax,
    'timeZone': listConfig.timeZone,
    'singleEvents': true
  });

  if (!tRows[cal.id]) {
    var mytr = document.createElement('tr');
    //mytr.className = 'lead';
    tbodyList.appendChild(mytr);

    var tdId = document.createElement('td');
    tdId.innerHTML = cal.name;
    // tdId.className = 'divId';
    mytr.appendChild(tdId);

    var tdStatus = document.createElement('td');
    //tdStatus.className = 'divStatus';
    mytr.appendChild(tdStatus);

    var tdEvent = document.createElement('td');
    // tdEvent.className = 'divEvent';
    mytr.appendChild(tdEvent);

    var tdLocation = document.createElement('td');
    // tdLocation.className = 'divLocation';
    mytr.appendChild(tdLocation);

    var tdDuration = document.createElement('td');
    // tdDuration.className = 'divDuration';
    mytr.appendChild(tdDuration);

    tRows[cal.id] = {
      'tr': mytr,
      'tdId': tdId,
      'tdStatus': tdStatus,
      'tdEvent': tdEvent,
      'tdLocation': tdLocation,
      'tdDuration': tdDuration
    };
  }

  var this_row = tRows[cal.id];

  reqEvents.execute(function(feed) {

    var state;

    if (feed.code && feed.code == 404) {
      state = 0;
    } else {
      state = (!feed.items || feed.items.length == 0) ? 1 : 2;
    }

    var txtState = ['Not found or not shared', 'Free', 'Busy'];
    var clrState = ['text-muted', 'text-success', 'text-danger'];

    this_row.tdStatus.innerHTML = txtState[state];
    this_row.tdStatus.className = clrState[state];

    if (state == 2) { // busy

      var htmlStatus = txtState[state];

      // getting first (and probably only) event
      var ev = feed.items[0];

      var evstart = (ev.start.dateTime) ? ev.start.dateTime : ev.start.date;
      var evend = (ev.end.dateTime) ? ev.end.dateTime : ev.end.date;

      var daystart = fDate(evstart);
      var dayend = fDate(evend);

      var htmlDuration = (daystart == dayend) ? fTime(evstart) + ' - ' + fTime(evend) : fDateTime(evstart) + ' - ' + fDateTime(evend);
      this_row.tdDuration.innerHTML = htmlDuration;

      var htmlEvent = (ev.summary) ? ev.summary : '';
      this_row.tdEvent.innerHTML = htmlEvent;

      var htmlLocation = (ev.location) ? ev.location : '';
      this_row.tdLocation.innerHTML = htmlLocation;

    } else {
      this_row.tdDuration.innerHTML = '';
      this_row.tdEvent.innerHTML = '';
      this_row.tdLocation.innerHTML = '';
    }

  });
}
