/* 
 * 2430709 - 好朋友坐骑90天使用券 - 好朋友坐骑90天使用券.\r\n#c双击后可以在90天内使用好朋友坐骑技能.#
 */
var period = 90;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}