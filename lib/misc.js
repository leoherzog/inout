/* ==========================================================
    FORMATING
 ========================================================== */

function fDateTime(dt) {
  var d = new Date(dt);
  var d_day = d.getDate();
  var d_month = d.getMonth() + 1; //Months are zero based
  var d_year = d.getFullYear();
  var d_hour = d.getHours();
  var d_minute = d.getMinutes();

  var typehour = 'am';
  if (d_hour >= 12) {
    d_hour = d_hour - 12;
    typehour = "pm";
  }
  if (d_hour == 0) d_hour = 12;

  if (d_day < 10) d_day = '0' + d_day;
  if (d_month < 10) d_month = '0' + d_month;
  if (d_minute < 10) d_minute = '0' + d_minute;

  return d_month + '/' + d_day + '/' + d_year + ' ' + d_hour + ':' + d_minute + typehour;
}

function fDate(dt) {
  var ret = fDateTime(dt);
  return ret.split(' ')[0];
}

function fTime(dt) {
  var ret = fDateTime(dt);
  return ret.split(' ')[1];
}

/* ==========================================================
    DATE MANIPULATION
 ========================================================== */

function getCurrentMomentTime(offset) {
  var now = new Date();
  now.setTime(now.getTime() + offset);
  //console.log(now.toISOString());
  return now.toISOString();
};

/* ==========================================================
    FX
 ========================================================== */

function fx_hide(objid) {
  document.getElementById(objid).style.display = 'none';
}

function fx_fade(objid, opfrom, opto, duration) {
  var tick = 0.05;
  var qty = Math.abs(opto - opfrom) / tick;
  var delay = duration / qty;
  fx_fade_step(objid, opfrom, opto, tick, delay);
}

function fx_fade_step(objid, opfrom, opto, tick, delay) {
  var obj = document.getElementById(objid);
  obj.style.opacity = opfrom;
  obj.style.display = 'block';
  var multi = (opto > opfrom) ? 1 : -1;
  var add = tick * multi;

  if (opfrom > 1) opfrom = 1;
  if (opfrom < 0) opfrom = 0;

  if (opto != opfrom) {
    setTimeout(function() {
      fx_fade_step(objid, opfrom + add, opto, tick, delay);
    }, delay);
  }
}


/* ==========================================================
    WINDOW
 ========================================================== */

function window_getsize() {
  var myWidth = 0,
    myHeight = 0;
  if (typeof(window.innerWidth) == 'number') {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return new Array(myWidth, myHeight);
}

function window_adjustHeight() {
  var mysize = window_getsize();
  var objlist = document.getElementsByClassName('allHeight');
  for (var i = 0; i < objlist.length; i++) {
    var obj = objlist[i];
    var style = window.getComputedStyle(obj, null);
    var padtop = parseInt(style.getPropertyValue('padding-top') || 0);
    var padbot = parseInt(style.getPropertyValue('padding-bottom') || 0);
    var newheight = mysize[1] - padtop - padbot;
    obj.style.height = newheight + 'px';
  }
}

window.onresize = window_adjustHeight;
