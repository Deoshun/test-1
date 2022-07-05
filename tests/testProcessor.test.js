/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const TextProcessor = require('../lib/textProcessor').TextProcessor;
const values = require('../lib/values');

afterEach(function() {
    sinon.restore();
});

// quick tests due to time

describe('Tests TextProcessor', function() {
    const textProcessor = new TextProcessor(values.testData);
    describe('constructor', function() {
        it('throws error with no data', function() {
            expect(() => new TextProcessor()).to.throw();
        });
    });
    describe('getWordCount', function() {
        it('gives expected result with mock data', function() {
            const wc = textProcessor.getWordCount();
            expect(wc).to.equal(14);
        });
    });
    describe('getSentenceCount', function() {
        it('gives expected result with mock data', function() {
            const sc = textProcessor.getSentenceCount();
            expect(sc).to.equal(2);
        });
    });
    describe('mostFrequentNWords', function() {
        it('gives expected result with mock data', function() {
            const mf = textProcessor.mostFrequentNWords(3);
            expect(mf).to.deep.equal(['lorem', 'et', 'sep']);
        });
    });
    describe('longestWord', function() {
        it('gives expected result with mock data', function() {
            const lw = textProcessor.getLongestWord();
            expect(lw).to.equal('consectetur');
        });
    });
    describe('mostFrequentNWordPairs', function() {
        it('gives expected result with mock data', function() {
            const wp = textProcessor.mostFrequentNWordPairs(1);
            expect(wp).to.deep.equal(['lorem-lorem']);
        });
    });
    describe('getWordCountByOccurance', function() {
        it('gives expected result with mock data', function() {
            const wp = textProcessor.getWordCountByOccurance(1);
            expect(wp).to.equal(5);
        });
    });
    describe('getProminance', function() {
        it('gives expected result with mock data', function() {
            const wp = textProcessor.getProminance('lorem');
            const expectedAns = (14 - ((10 - 1) / 4)) * (100 / 14);
            expect(wp).to.equal(expectedAns);
        });
    });
});

