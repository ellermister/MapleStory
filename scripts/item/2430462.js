/* 
 * 2430462 - 国庆纪念版热气球(7天权) -  双击后可以在7天内使用骑乘技能[国庆纪念版热气球]。 
 */
var period = 7;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period,true);
    im.dispose();
}