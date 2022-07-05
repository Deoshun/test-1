const TextProcessor = require('./lib/textProcessor').TextProcessor;
const values = require('./lib/values');

run();

function run() {
    const textProcessor = new TextProcessor(values.data);

    const wordCount = textProcessor.getWordCount();
    const sentenceCount = textProcessor.getSentenceCount();
    const longestWord = textProcessor.getLongestWord();

    const mostFrequentSixWords = textProcessor.mostFrequentNWords(6);

    const countOfSingleWords = textProcessor.getWordCountByOccurance(1);

    const percentOfSingleWords = (countOfSingleWords / wordCount) * 100;
    const avgWordPerSentance = wordCount / sentenceCount;

    const mostFrequentWordPairs = textProcessor.mostFrequentNWordPairs(3);
    const prominanceScores = mostFrequentSixWords.map((w) => {
        return { word: w,
            score: textProcessor.getProminance(w) };
    });

    console.log('word count - ', wordCount);
    console.log('sentence count - ', sentenceCount);
    console.log('longest word - ', longestWord);
    console.log('longest word length - ', longestWord.length);
    console.log('most frequent 6 words - ', mostFrequentSixWords);
    console.log('number of single words - ', countOfSingleWords);
    console.log('% of single words - ', percentOfSingleWords);
    console.log('average words per sentance - ', avgWordPerSentance);
    console.log('most frequent word pairs - ', mostFrequentWordPairs);
    console.log('prominance scores - ', prominanceScores);
}

