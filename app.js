var alarms = [];

/**
 * Add a timer to our array to tack
 * @param {Moment} momentTime
 */
function setAlarmFor(momentTime) {
	alarms.push(momentTime.startOf('second'));
	console.log( momentTime.fromNow() );
}

// Shorthand
function getEl(id) {
	return document.getElementById(id);
}

/**
 * Main Loop
 */
(function timerLoop() {
	// If we have alarms, perform updates, alarm if needed
	alarms.forEach( function(time, index) {
		var id = time.valueOf();
		var li = getEl( id );
		if (!li) {
			var li = document.createElement("li");
			li.id = id;
			getEl('alarms').appendChild(li);
		}
		li.textContent = time.countdown(undefined, undefined, 2, 0).toString();;

		// Has the time passed? If so alrt, remove alarm, update timer
		var msdiff = time.diff( moment() );
		if (msdiff <= 0) {
			window.alert('Yo, alarm for ' + time.format('LLLL'));
			alarms.splice(index, 1);
			li.textContent = 'Timer Done!'
		}
	});


	requestAnimationFrame(timerLoop);
})();


/**
 * Set timer via a destination time
 */

var time_buttonEl = getEl('time-set');
var time_hourEl = getEl('time-hour');
var time_minuteEl = getEl('time-minute');
var time_ampmEl = getEl('time-ampm');

// For convience set now as values
time_hourEl.value = moment().format('h');
time_minuteEl.value = moment().format('mm');
time_ampmEl.value = moment().format('a')

time_buttonEl.onclick = function() {
	var hour = Number(time_hourEl.value);
	var minute = Number(time_minuteEl.value);
	var ampm = time_ampmEl.value;

	if (ampm.toLowerCase() === 'pm') {
		hour += 12;
	}

	var time = moment().set({hour: hour, minute: minute, second: 0});
	setAlarmFor(time);
};

/**
 * Set timer via 'time from now'
 */

var countdown_buttonEl = getEl('countdown-set');
var countdown_hourEl = getEl('countdown-hour');
var countdown_minuteEl = getEl('countdown-minute');
var countdown_secondEl = getEl('countdown-second');

// Listener
countdown_buttonEl.onclick = function() {
	var hour = Number(countdown_hourEl.value);
	var minute = Number(countdown_minuteEl.value);
	var second = Number(countdown_secondEl.value);

	var time = moment().add(hour, 'hours').add(minute, 'minutes').add(second, 'seconds');
	
	setAlarmFor(time);
};

