import _Batman from "./hero_classes/Batman.js";
import _Superman from "./hero_classes/Superman.js";
var HeroClassList;
(function (HeroClassList) {
    HeroClassList.Superman = _Superman;
    HeroClassList.Batman = _Batman;
})(HeroClassList || (HeroClassList = {}));
export default HeroClassList;
