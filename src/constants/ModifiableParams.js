const ModifiableParams = [
  /**
   * 
    Misc Equipment <ModifiableParams>
	
    These work even if item is not equipped:
      suppressionRecoveryAdd 		- percentage increase of default suppression recovery (default to 0, so no change)
      meleeStunBonus				- see melee below
      meleeSpeedAdd				- see melee below

    These only work while item is equipped (i.e. held in hand):
      brightLight					- makes person visible in the dark, set it to 1 to enable. Works on Scopes only while aiming
      nightVision					- makes person see in the dark, set it to 1 to enable. Works on Scopes only while aiming
      flinchResistance			- less chance to flinch by reducing damage taken by this amount ( so 10 resistance means a 30dmg hit is considered a 20dmg hit for flinch chance)
      beingSpottedRate			- percent increase to speed at which enemies see through your disguise
      readyTimeAddBlocked			- modifies ready time when raising weapon from a "blocked" state (i.e. had an obstacle in front, like a wall or an ally)
      guardTimeAddBlocked			- ^ same, for guard time
      meleeDamageBonus			- see melee below
      meleeReach					- see melee below
      
    You can add fovDegrees="xx" to some items in the <ModifiableParams> list in order to modify the base FOV, and it will be used in the following order (higher on the list will override the values below)
      Any equipped item, with Firearm Scope settings while "aiming" (when shooting and during Look commands)
      Shields
      HelmetNVG
   */
  { label: 'suppressionRecoveryAdd', value: 0 },
  // meleeStunBonus				- see melee below
  // meleeSpeedAdd				- see melee below

  { label: 'brightLight', value: 1, readOnly: true },
  { label: 'nightVision', value: 1, readOnly: true },
  { label: 'flinchResistance', value: 0 },
  { label: 'beingSpottedRate', value: 0 },
  { label: 'readyTimeAddBlocked', value: 0 },
  { label: 'guardTimeAddBlocked', value: 0 },
  // meleeDamageBonus			- see melee below
  // meleeReach					- see melee below

  // fovDegrees
  // fovRadiusMeters
  // fovRangeMeters
];

export default ModifiableParams;
