import {Item} from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    public updateQuality(): void {
        this.items.forEach(item => {
            switch(item.name) {
                case 'Good Wine':
                    if (item.sellIn > 0) {
                        item.quality = capQuality(item.quality + 1);
                    } else {
                        item.quality = capQuality(item.quality + 2);
                    }
                    item.sellIn = item.sellIn - 1;
                    break;
                    
                case 'B-DAWG Keychain':
                    break;

                case 'Backstage passes for Re:Factor':
                case 'Backstage passes for HAXX':
                    if (item.sellIn >= 11) {
                        item.quality = capQuality(item.quality + 1);
                    } else if (item.sellIn >=6 && item.sellIn < 11) {
                        item.quality = capQuality(item.quality + 2);
                    } else if (item.sellIn > 0 && item.sellIn < 6) {
                        item.quality = capQuality(item.quality + 3);
                    } else {
                        item.quality = 0;
                    }
                    item.sellIn = item.sellIn - 1;
                    break;

                default:
                    if (item.sellIn > 0) {
                        item.quality = capQuality(item.quality - 1);
                    } else {
                        item.quality = capQuality(item.quality - 2);
                    }
                    item.sellIn = item.sellIn - 1;
                    break;
            }
        });
    }

}

export function capQuality(quality: number): number {
    return Math.min(Math.max(quality, 0), 50);
}
