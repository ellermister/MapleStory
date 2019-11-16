var setupTask;
var nextTime;

function init() {
    if (em.getChannel() == 10) { //lol
        var cal = java.util.Calendar.getInstance();
        cal.set(java.util.Calendar.HOUR, 2);
        cal.set(java.util.Calendar.MINUTE, 22); //5 mins = time to register
        cal.set(java.util.Calendar.SECOND, 22);
        nextTime = cal.getTimeInMillis();
        while (nextTime <= java.lang.System.currentTimeMillis()) {
            nextTime += 1000 * 60 * 142; // 2:22
        }
        scheduleNew();
    }
}

function scheduleNew() {
    setupTask = em.scheduleAtTimestamp("setup", nextTime);
    em.setWorldEvent();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}

function setup() {
    em.scheduleRandomEvent();
    setupTask = em.schedule("scheduleNew", 120000);
    nextTime += 1000 * 60 * 142; // 2:22
}