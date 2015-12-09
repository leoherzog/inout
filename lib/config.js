listConfig = {

  // number of SECONDS between refreshs
  // leave it as NULL or 0 (zero) to disable the refreshs
  'refresh': 10,

  'timeMin': getCurrentMomentTime(0),
  'timeMax': getCurrentMomentTime(5 * 60 * 1000), // request events between now and 5 minutes from now
  'timeZone': 'UTC',

  // leave the list empty to fetch EVERY calendar that you normally have access to (your or shared with you)
  // this may cause strange results since custom-created calendars will have weird long names
  'calendarList': [
		{name:'Jeff Winger', id:'jeffwinger@gmail.com'},
		{name:'Abed Nadir', id:'abednadir@gmail.com'},
		{name:'Annie Edison', id:'annieedison@gmail.com'},
		{name:'Troy Barnes', id:'troybarnes@gmail.com'},
		{name:'Britta Perry', id:'brittaperry@gmail.com'},
		{name:'Shirley Bennett', id:'shirleybennett@gmail.com'},
		{name:'Pierce Hawthorne', id:'piercehawthorne@gmail.com'}
	]
}
