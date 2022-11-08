import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    it('should add item foo', () => {
        const items: Item[] = [new Item('foo', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        expect(app.items[0].name).toEqual('foo');
    });
    
    it('should decrease sellIn and quality values of regular items by 1 every day', () => {
        const items: Item[] = [new Item('foo', 1, 1)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(0);
    });
     
    it('should decrease quality value of regular items by 2 every day after sellIn is below 0', () => {
        const items: Item[] = [new Item('foo', 0, 2)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(0);
    });

    it('should never decrease quality to less than 0', () => {
        const items: Item[] = [new Item('foo', 1, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(0);
    });

    it('should increase quality value of Good Wine by 1 every day', () => {
        const items: Item[] = [new Item('Good Wine', 1, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(1);
    });

    it('should increase quality value of Good Wine by 2 if sellIn is below 0', () => {
        const items: Item[] = [new Item('Good Wine', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(2);
    });

    it('should never increase quality to more than 50', () => {
        const items: Item[] = [new Item('Good Wine', 1, 50)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(50);
    });

    it('should never change sellIn and quality values of B-DAWG Keychain', () => {
        const items: Item[] = [new Item('B-DAWG Keychain', 10, 80)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(10);
        expect(app.items[0].quality).toEqual(80);
    });

    it('should increase quality value of Backstage passes by 1 if sellIn is above 10', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 11, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(10);
        expect(app.items[0].quality).toEqual(1);
    });

    /**
     * This test is failing on the initial code for Backstage passes for HAXX.
     * Not sure if oversight or irony, but I'm adding HAXX as a very interesting conference for now!
     */
    it('should increase quality value of Backstage passes by 2 if sellIn is above 5 and below 10', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 6, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(5);
        expect(app.items[0].quality).toEqual(2);
    });

    /**
     * This test is failing on the initial code for Backstage passes for HAXX.
     */    
    it('should increase quality value of Backstage passes by 3 if sellIn is above 0 and below 5', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 1, 0)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(3);
    });

    /**
     * This test is failing on the initial code because of an OR condition with two values without overlap.
     */     
    it('should set quality value of Backstage passes to 0 if sellIn is below 0', () => {
        const items: Item[] = [new Item('Backstage passes for Re:Factor', 0, 10)];
        const app: GildedTros = new GildedTros(items);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
        expect(app.items[0].quality).toEqual(0);
    });
})