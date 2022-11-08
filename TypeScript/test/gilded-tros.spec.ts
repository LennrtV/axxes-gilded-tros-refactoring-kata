import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    it('should add item foo', () => {
        const items: Item[] = [new Item('foo', 0, 0)];
        const app: GildedTros = new GildedTros(items);
        expect(app.items[0].name).toEqual('foo');
        expect(app.items[0].sellIn).toEqual(0);
        expect(app.items[0].quality).toEqual(0);
        app.updateQuality();
        expect(app.items[0].sellIn).toEqual(-1);
    });
});
