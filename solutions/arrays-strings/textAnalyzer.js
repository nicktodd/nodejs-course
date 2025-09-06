// Text Analyzer Solution

class TextAnalyzer {
    constructor(text) {
        this.text = text;
        this.words = this.getWords();
    }

    getWords() {
        return this.text
            .toLowerCase()
            .replace(/[.,!?]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0);
    }

    getCharacterCount() {
        return this.text.length;
    }

    getWordCount() {
        return this.words.length;
    }

    getSentenceCount() {
        return this.text
            .split(/[.!?]+/)
            .filter(sentence => sentence.trim().length > 0)
            .length;
    }

    getMostCommonWord() {
        const frequency = this.getWordFrequency();
        let maxCount = 0;
        let mostCommon = '';

        for (const [word, count] of Object.entries(frequency)) {
            if (count > maxCount) {
                maxCount = count;
                mostCommon = word;
            }
        }

        return {
            word: mostCommon,
            count: maxCount
        };
    }

    getLongestWord() {
        return this.words.reduce((longest, current) => 
            current.length > longest.length ? current : longest
        );
    }

    getAverageWordLength() {
        const totalLength = this.words.reduce((sum, word) => sum + word.length, 0);
        return (totalLength / this.words.length).toFixed(2);
    }

    getWordFrequency() {
        return this.words.reduce((freq, word) => {
            freq[word] = (freq[word] || 0) + 1;
            return freq;
        }, {});
    }

    findPalindromes() {
        return this.words.filter(word => {
            if (word.length <= 1) return false;
            const reversed = word.split('').reverse().join('');
            return word === reversed;
        });
    }

    isPalindrome(word) {
        const cleaned = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = cleaned.split('').reverse().join('');
        return cleaned === reversed;
    }
}

// Test the text analyzer
const text = "The quick brown fox jumps over the lazy dog. The dog sleeps.";
const analyzer = new TextAnalyzer(text);

console.log('Text Analysis Results');
console.log('--------------------');
console.log('Text:', text);
console.log('\nStatistics:');
console.log('- Characters:', analyzer.getCharacterCount());
console.log('- Words:', analyzer.getWordCount());
console.log('- Sentences:', analyzer.getSentenceCount());

const mostCommon = analyzer.getMostCommonWord();
console.log(`- Most common word: "${mostCommon.word}" (${mostCommon.count} times)`);
console.log('- Longest word:', analyzer.getLongestWord());
console.log('- Average word length:', analyzer.getAverageWordLength());
console.log('- Palindromes found:', analyzer.findPalindromes().length);

console.log('\nWord Frequency:');
const frequency = analyzer.getWordFrequency();
Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .forEach(([word, count]) => console.log(`- ${word}: ${count}`))
