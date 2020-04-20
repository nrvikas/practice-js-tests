/*global global*/

import {urlCheckerWithCaching, fetchAndCache} from './urlCheckerWithCaching'


describe('urlCheckerWithCaching', () => {
    let storageSetItemSpy, consoleSpy;

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 200}));

        storageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
        consoleSpy = jest.spyOn(console, 'log');
    })

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;

        consoleSpy.mockRestore();
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    it('will fetch href', () => {
        const strHTML = `<div id="content">
                <a href="http://www.google.com.au">Google</a>
                <span>Some other HTML element</span>
                <a href="http://www.yahoo.com.au">Yahoo</a>
            </div>`

        urlCheckerWithCaching(strHTML)
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch.mock.calls[0][0]).toEqual('http://www.google.com.au/')  // First call argument
        expect(global.fetch.mock.calls[1][0]).toEqual('http://www.yahoo.com.au/')  // Second call argument
    });

    it('will set cache for successful a HTTP requests', () => {
        const strHTML = `<div id="content">
                <a href="http://www.google.com.au">Google</a>
                <span>Some other HTML element</span>
                <a href="http://www.yahoo.com.au">Yahoo</a>
            </div>`

        urlCheckerWithCaching(strHTML)
        expect(storageSetItemSpy).toHaveBeenCalledTimes(2);
        expect(storageSetItemSpy.mock.calls[0]).toEqual([['http://www.google.com.au/'], true])  // First time cached
        expect(storageSetItemSpy.mock.calls[1]).toEqual([['http://www.yahoo.com.au/'], true])  // First time cached
    });

    it('will not repeat HTTP requests if cached', () => {
        const strRepeatedLinkHTML = `<div id="content">
                <a href="http://www.abc.com.au">ABC</a>
                <span>Some other HTML element</span>
                <a href="http://www.abc.com.au">REPEATED ABC</a>
            </div>`

        urlCheckerWithCaching(strRepeatedLinkHTML)
        expect(global.fetch).toHaveBeenCalledTimes(1);  // No repeats of http://www.abc.com.au - just one fetch
        expect(global.fetch.mock.calls[0][0]).toEqual('http://www.abc.com.au/')
    });

    describe('fetchAndCache', () => {
        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'log');
        })

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('fetchAndCache will log succes msg on console', (done) => {
            fetchAndCache('https://github.com/').then(() => {
                expect(consoleSpy).toHaveBeenCalledWith('SUCCESS Response 200: https://github.com/');
                done();
            })
        });

        it('fetchAndCache will log error msg on console', (done) => {
            global.fetch = jest.fn().mockImplementation(() => Promise.reject({status: 404}));
            fetchAndCache('really-bad-url').then(() => {
                expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch URL: really-bad-url');
                done();
            })
        });
    });
})
