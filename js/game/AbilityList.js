import _ShieldAbility from "./abilities/ShieldAbility.js";
import _InvisibilityAbility from "./abilities/InvisibilityAbility.js";
import _TeleportAbility from "./abilities/TeleportAbility.js";
import _SuperSpeedAbility from "./abilities/SuperSpeedAbility.js";
var AbilityList;
(function (AbilityList) {
    AbilityList.ShieldAbility = _ShieldAbility;
    AbilityList.InvisibilityAbility = _InvisibilityAbility;
    AbilityList.TeleportAbility = _TeleportAbility;
    AbilityList.SuperSpeedAbility = _SuperSpeedAbility;
})(AbilityList || (AbilityList = {}));
export default AbilityList;
