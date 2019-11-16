/* 
 * 2430464 - 国庆纪念版热气球永久权 -  双击后可以使用骑乘技能[国庆纪念版热气球]。
 */
var period = -1;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}