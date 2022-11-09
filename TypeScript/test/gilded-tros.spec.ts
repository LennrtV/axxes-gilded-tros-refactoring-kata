import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('Regular items', () => {
    it('should add item foo', () => {
        const items: Item[] = [new Item('foo', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        expect(app.items[0].name).toEqual('foo');
    });
    
    it('should decrease sellIn and quality values of regular items by 1 every day', () => {
        itemQualityTest('foo', 1, 1, 0, 0);
    });
     
    it('should decrease quality value of regular items by 2 every day after sellIn is below 0', () => {
        itemQualityTest('foo', 0, 2, -1, 0);
    });

});

describe('Item quality cap', () => {
    it('should never decrease quality to less than 0', () => {
        itemQualityTest('foo', 1, 0, 0, 0);
    });

    it('should never increase quality to more than 50', () => {
        itemQualityTest('Backstage passes for Re:Factor', 1, 49, 0, 50);
        itemQualityTest('Good Wine', 1, 50, 0, 50);
    });
});


describe('Good wine', () => {
    it('should increase quality value of Good Wine by 1 every day', () => {
        itemQualityTest( 'Good Wine', 1, 0, 0, 1);
    });

    it('should increase quality value of Good Wine by 2 if sellIn is below 0', () => {
        itemQualityTest('Good Wine', 0, 0, -1, 2);
    });
});

describe('Legendary items', () => {
    it('should never change sellIn and quality values of B-DAWG Keychain', () => {
        itemQualityTest('B-DAWG Keychain', 10, 80, 10, 80);
    });
});

describe('Backstage passes to very interesting conferences', () => {
    it('should increase quality value of Backstage passes by 1 if sellIn is above 10', () => {
        itemQualityTest('Backstage passes for Re:Factor', 11, 0, 10, 1);
        itemQualityTest('Backstage passes for HAXX', 11, 0, 10, 1);
    });

    /**
     * This test is failing on the initial code for Backstage passes for HAXX.
     * Not sure if oversight or irony, but I'm adding HAXX as a very interesting conference for now!
     */
    it('should increase quality value of Backstage passes by 2 if sellIn is above 5 and below 10', () => {
        itemQualityTest('Backstage passes for Re:Factor', 6, 0, 5, 2);
        itemQualityTest('Backstage passes for HAXX', 6, 0, 5, 2);
    });

    /**
     * This test is failing on the initial code for Backstage passes for HAXX.
     */    
    it('should increase quality value of Backstage passes by 3 if sellIn is above 0 and below 5', () => {
        itemQualityTest('Backstage passes for Re:Factor', 1, 0, 0, 3);
        itemQualityTest('Backstage passes for HAXX', 1, 0, 0, 3);
    });

    /**
     * This test is failing on the initial code because of an OR condition with two values without overlap.
     */     
    it('should set quality value of Backstage passes to 0 if sellIn is below 0', () => {
        itemQualityTest('Backstage passes for Re:Factor', 0, 10, -1, 0);
        itemQualityTest('Backstage passes for HAXX', 0, 10, -1, 0);
    });
});
     
describe('Smelly items', () => {
    it('should decrease quality value of smelly items twice as fast as regular items', () => {
        itemQualityTest('Duplicate Code', 1, 2, 0, 0);
        itemQualityTest('Long Methods', 1, 2, 0, 0);
        itemQualityTest('Ugly Variable Names', 1, 2, 0, 0);
        itemQualityTest('Duplicate Code', 0, 4, -1, 0);
        itemQualityTest('Long Methods', 0, 4, -1, 0);
        itemQualityTest('Ugly Variable Names', 0, 4, -1, 0);
    });
});

/**
 * Test if items are updated correctly
 * @param itemName name of the item
 * @param receivedSellIn starting sellIn value
 * @param receivedQuality starting quality value
 * @param expectedSellIn expected sellIn value after update
 * @param expectedQuality expected quality value after update
 */
    function itemQualityTest(itemName: string, receivedSellIn:number, receivedQuality:number, expectedSellIn:number, expectedQuality:number) {
    const items: Item[] = [new Item(itemName, receivedSellIn, receivedQuality)];
    const app: GildedTros = new GildedTros(items);
    app.updateQuality();
    expect(app.items[0].sellIn).toEqual(expectedSellIn);
    expect(app.items[0].quality).toEqual(expectedQuality);
}