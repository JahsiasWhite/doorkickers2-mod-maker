/**
 * These only apply to firearms
 */
const ModifiableParamsFirearms = [
  /**
    Firearm <ModifiableParams>
        These define base weapon accuracy, can be modified by AttackType/Abilities/Doctrine/etc.
          the accuracy value is linearly interpolated in the given range, between start/end values
          Accuracy defines the size of the shooting cone towards the enemey. 
                accuracy=100 means a cone the size of the enemy (all bullets will hit)
                accuracy=50 means a cone twice the size of the enemy (half the bullets will hit)
                accuracy=200 means a cone half the size of the enemy (more bullets will hit the enemy's center)
  
        accuracyStart="70"
        accuracyEnd="30"
        accuracyStartDist="0"
        accuracyEndDist="100"
   */
  { label: 'accuracyStart' },
  { label: 'accuracyEnd' },
  { label: 'accuracyStartDist' },
  { label: 'accuracyEndDist' },
  /**
   * Random firearm stuff
   * ! I should try to see if these are listed in the docs somewhere
   */
  { label: 'numPellets' },
  { label: 'roundsPerMagazine' },
  { label: 'closedBolt' },
  { label: 'cyclicReload' },
  { label: 'reloadTime' },
  { label: 'reloadEmptyTime' },
  { label: 'changeInTime' },
  { label: 'changeOutTime' },
  { label: 'readyTime' },
  { label: 'guardTime' },
  { label: 'suppressionScale' },
];

export default ModifiableParamsFirearms;
