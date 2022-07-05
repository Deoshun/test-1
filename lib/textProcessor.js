class TextProcessor {
    constructor(data) {
        if (!data) {
            throw new Error('Please pass a string into the contructor');
        }
        this.rawData = data;
        this.wordCount = 0;
        this.wordList = [];
        this.wordMap = {};
        this._loadRawData();
    }

    getWordCount() {
        return this.wordCount;
    }

    getSentenceCount() {
        return this._countOccurancesInRawData('\\.');
    }

    getLongestWord() {
        return this.wordList.reduce((a, b) => {
            return a.length > b.length ? a : b;
        });
    }

    mostFrequentNWords(n, sourceMap = this.wordMap) {
        const words = Object.keys(sourceMap);
        const frequencyArray = words.map((word) => {
            return { word,
                count: sourceMap[word] };
        });
        frequencyArray.sort((a, b) => b.count - a.count);
        return frequencyArray.slice(0, n).map(element => element.word);
    }

    mostFrequentNWordPairs(n) {
        const wordPairMap = {};

        for (let i = 0; i + 1 < this.wordCount; i++) {
            const pairName = this.wordList[i] + '-' + this.wordList[i + 1];
            if (Object.prototype.hasOwnProperty.call(wordPairMap, pairName)) {
                wordPairMap[pairName]++;
            } else {
                wordPairMap[pairName] = 1;
            }
        }
        return this.mostFrequentNWords(n, wordPairMap);
    }

    getWordCountByOccurance(number) {
        const words = Object.keys(this.wordMap);
        const wordsWithCount = words.filter((word) => this.wordMap[word] === number);
        return wordsWithCount.length;
    }

    getProminance(word) {
        const occurances = this._getIndexsOfWord(word);
        const occurancesCount = occurances.length;
        const sumOfIndexs = occurances.reduce((a, b) => a + b, 0);
        const positionSum = sumOfIndexs + occurancesCount;

        return (this.wordCount - ((positionSum - 1) / occurancesCount)) * (100 / this.wordCount);
    }

    _getIndexsOfWord(value) {
        const indexs = [];
        this.wordList.forEach((word, index) => {
            if (word === value) {
                indexs.push(index);
            }
        });
        return indexs;
    }

    _countOccurancesInRawData(substring) {
        const regExp = new RegExp(substring, 'g');
        const count = (this.rawData.match(regExp) || []).length;
        return count;
    }

    _loadRawData() {
        const dataWithoutFullstops = this._replaceInData('.', ' ');
        this.wordList = dataWithoutFullstops.split(' ').filter((word) => word !== '');

        this.wordCount = this.wordList.length;
        this.wordMap = {};

        this.wordList.forEach((word) => {
            if (Object.prototype.hasOwnProperty.call(this.wordMap, word)) {
                this.wordMap[word]++;
            } else {
                this.wordMap[word] = 1;
            }
        });
    }

    _replaceInData(target, replacement) {
        return this.rawData.replaceAll(target, replacement);
    }
}

module.exports = {
    TextProcessor
};
