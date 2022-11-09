# Gilded Tros Refactoring Kata

This Kata is based on the Gilded Rose Kata, originally created by Terry Hughes (http://twitter.com/TerryHughes). It is already on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/) and [this version with multiple languages](https://github.com/emilybache/GildedRose-Refactoring-Kata).
It was slightly rebranded by Axxes IT Consultancy, and renamed to Gilded Tros (with a wink to a local bar near the Axxes HQ ;)).

## Implementation of the Kata

I removed all but the Typescript version of the Gilded Tros Kata and added my implementation in that folder.

- Ts-jest was setup and unit tests have been added for every item category.
- The updateQuality method in the GildedTros class was refactored for readability.
- The GildedTros class was expended to include the cheap off-shore consultancy firm's smelly items.
- The text-test-fixture now works with a console table for easier axxes to your inventory.
