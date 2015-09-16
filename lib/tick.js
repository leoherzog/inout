function tickTock() {
  var rightnow = moment().format("dddd, MMMM Do, YYYY, h:mm a");
  document.getElementById('date').innerHTML = rightnow;
}
