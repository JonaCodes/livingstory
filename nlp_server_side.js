var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/test', function (req, res) {
    res.json({hello: 'world'});
});

app.post('/rawText', function(req,res){
    console.log(req.body);
    res.send('thanks');
});

var pos = require('pos');
var words = new pos.Lexer().lex('There was a quiet village by the edge of a sleeping volcano. one day a rumor spread. ' +
    'The emperor of Japan is preparing for war. The people were very afraid. “who is going to help us?”, ' +
    'they asked? The old man of the village said: “we will go to the mountain and seek an answer!”. ' +
    'They climbed to the top of the mountain.');
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);

var listOfTags = [];
var listOfWords = [];

for (let taggedWord of taggedWords) {

    var word = taggedWord[0];
    var tag = taggedWord[1];
    listOfTags.push(tag.substring(0,2));
    listOfWords.push(word);
    console.log(word + " / " + tag);
}

console.log(listOfTags);

chunckCandidates = getChunks(listOfTags);

console.log("XXXXXXXXXXXXXXXXXXX");
for (let x of chunckCandidates) {

    var left = x.left;
    var right = x.right;
    console.log(left + " / " + right);
}

var lengthOfCandidatesList = chunckCandidates.length;
finalChunks = [];


console.log("XXXXXXXXXXXXXXXXXXX");


// make sure most right range in in
if (lengthOfCandidatesList > 1)
    finalChunks.push(chunckCandidates[lengthOfCandidatesList - 1]);

// go over the others
for (let i = 0; i < lengthOfCandidatesList - 1; i++) {
    var candidate = chunckCandidates[i];
    var currentLeft = candidate.left;
    var currentRight = candidate.right;

    if (overlap(currentLeft, currentRight, finalChunks))
        continue;

    finalChunks.push(candidate);

}


console.log(finalChunks);

// show in words
for (let range of finalChunks) {
    var text = "";
    for (let i = range.left; i <= range.right; i++) {
        text += listOfWords[i] + " ";
    }
    console.log(text)

}


function getChunks(listOfTags) {

    var length = listOfTags.length;
    var returnedValues = [];
    for (let i = 0; i < length; i++) {
        var tag = listOfTags[i];
        if (tag != 'NN')
            continue;

        var left = i;
        var right = i;

        // expand to the right
        for (let j = 1; j <= 2; j++) {
            if (isGoodExpansion(listOfTags, i + j, length))
                right = i + j;
        }

        // expand to the left
        for (let j = 1; j <= 2; j++) {
            if (isGoodExpansion(listOfTags, i - j, length))
                left = i - j;
        }

        // jump
        i = right;

        returnedValues.push({left: left, right: right});
    }

    return returnedValues;
}


function isGoodExpansion(listOfTags, index, length) {

    if (index >= length || index < 0)
        return false;

    var tag = listOfTags[index];

    switch (tag) {
        case 'JJ':  // adjective
        case 'NN':
        case 'RB':  // adverbs
        case 'VB':
            return true;
    }

    return false;
}


function overlap(left, right, setOfRanges) {

    if (setOfRanges.length == 0)
        return false;

    for (let range of setOfRanges) {
        if (left >= range.left && right <= range.right) // contained
            return true;
        if (left >= range.left && left <= range.right) // overlap1
            return true;
        if (right >= range.left && right <= range.right) // overlap2
            return true;

    }

    return false;
}