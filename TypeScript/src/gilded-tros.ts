import {Item} from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    /**
     * Updates the quality of all items in the inventory by name.
     */
    public updateQuality(): void {
        this.items.forEach(item => {
            switch(item.name) {
                case 'Good Wine':
                    if (item.sellIn > 0) {
                        item.quality = this.capQuality(item.quality + 1);
                    } else {
                        item.quality = this.capQuality(item.quality + 2);
                    }
                    item.sellIn = item.sellIn - 1;
                    break;
                    
                case 'B-DAWG Keychain':
                    item.quality = 80;
                    break;

                case 'Backstage passes for Re:Factor':
                case 'Backstage passes for HAXX':
                    if (item.sellIn >= 11) {
                        item.quality = this.capQuality(item.quality + 1);
                    } else if (item.sellIn >=6 && item.sellIn < 11) {
                        item.quality = this.capQuality(item.quality + 2);
                    } else if (item.sellIn > 0 && item.sellIn < 6) {
                        item.quality = this.capQuality(item.quality + 3);
                    } else {
                        item.quality = 0;
                    }
                    item.sellIn = item.sellIn - 1;
                    break;

                case 'Duplicate Code' :
                case 'Long Methods' :
                case 'Ugly Variable Names':
                    if (item.sellIn > 0) {
                        item.quality = this.capQuality(item.quality - 2);
                    } else {
                        item.quality = this.capQuality(item.quality - 4);
                    }
                    item.sellIn = item.sellIn - 1;
                    break;

                default:
                    if (item.sellIn > 0) {
                        item.quality = this.capQuality(item.quality - 1);
                    } else {
                        item.quality = this.capQuality(item.quality - 2);
                    }
                    item.sellIn = item.sellIn - 1;
                    break;
            }
        });
    }

    /**
     * Check and cap an item quality value to be at least 0 and at most 50.
     * @param quality the number to cap
     * @returns quality capped between 0 and 50
     */
    private capQuality(quality: number): number {
        return Math.min(Math.max(quality, 0), 50);
    }
}
