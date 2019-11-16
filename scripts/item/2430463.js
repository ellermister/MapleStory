/* 
 * 2430463 - 国庆纪念版热气球(30天权) - 双击后可以在30天内使用骑乘技能[国庆纪念版热气球]。 
 */
var period = 30;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}