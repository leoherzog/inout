> This project is deprecated and is no longer receiving updates.  
[Check out v2](https://github.com/leoherzog/inout2), rewritten in Google Apps Script (and still open source, of course)!

JS In/Out
===========

A simple HTML table generator. You log in via Google, and it displays a hard-coded list of Google Calendar user's statuses.

For each user, you get **Name**, **Free/Busy**, **Event**, **Location**, and **Duration**. If the person has shared their calendar with you, you will see if they are free or busy, and if busy, event information available to you. When you create a new event in Google Calendar, "Available" vs. "Busy" events determine your status on the board, and "Public" vs. "Private" events determine if the details of the event are visible on the board. If you have more than one event going on at the same time, the board looks at the event that was most recently updated on your calendar.

This only uses vanilla Javascript. Only a static web server is required; No Ruby, PHP, etc.

Feel free to take a look at the source and adapt as you please. I would love to see some pull requests for improvements to the Javascript (coding n00b here).

This source is licensed as follows:

- - -

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

<span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Javascript In/Out</span> is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

- - -

If you want to say thanks, [buy me a coffee via PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YUFMYKLRW4A96)

- - -

Screenshot:

![In/Out Board](http://i.imgur.com/zclaAX6.png)
