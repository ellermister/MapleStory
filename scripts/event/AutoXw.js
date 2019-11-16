var setupTask;

function init() {
	scheduleNew();
}

function scheduleNew() {
	var cal = java.util.Calendar.getInstance();
	cal.set(java.util.Calendar.HOUR, 0);
	cal.set(java.util.Calendar.MINUTE, 3);
	cal.set(java.util.Calendar.SECOND, 0);
	var nextTime = cal.getTimeInMillis();
	while (nextTime <= java.lang.System.currentTimeMillis()) {
		nextTime += 1000 * 120;
	}
	setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
	setupTask.cancel(true);
}

function start() {
	scheduleNew();
	em.getChannelServer().AutoXw(1);
} 