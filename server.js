let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let request = require('request');
var pos = require('pos');
var asyncLoop = require('node-async-loop');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/*
Get raw text from POST
Send raw text to get parsed
Send chunks to get image
Send images to client
Display images
 */

app.post('/rawText', function(req,res){
    let parsedText = getParsedText(req.body);
    if(parsedText.length == 0){
        res.send(null)
    }
    else{
        getImagesFromTextAndSend(parsedText, res);
    }
});

function getImagesFromTextAndSend(texts, res){

    let allImageUrls = [];
    asyncLoop(texts, getUrls, sendUrls);

    function getUrls(text, next){
        request(getUrlFromText(text), function (error, response, body) {
            if (!error && response.statusCode == 200) {
                allImageUrls.push({identifier: text, imgUrl: getImgUrlFromBody(body)});
                next();
            }
        });
    }

    function sendUrls(){
        console.log('\nSending images: ', allImageUrls);
        res.send(allImageUrls);
    }
}

function getUrlFromText(text){
    let searchTerms = text.trim().split(' ');
    searchTerms.push('png');
    searchTerms = searchTerms.join("%20");
    console.log("\nSearch parameters:", searchTerms);

    let urlBase = 'https://www.bing.com/images/search?q=';
    let url = urlBase + searchTerms + "&qs=n&form=QBIR&pq=" + searchTerms + "&sc=8-14&sp=-1&sk=";
    console.log('Searching for image in:', url);

    return url;
}

function getImgUrlFromBody(body){
    let indexOfHref = body.indexOf('href="http');
    let possibleEnd = body.indexOf('"', indexOfHref + 6);
    let possibleSubstring = body.substring(indexOfHref, possibleEnd);
    possibleSubstring = validateImgURL(possibleSubstring);
    let substring = possibleSubstring.split('href="')[1];

    if(substring.length > 0){return substring }
    return null;
}

//make sure ends with .png
function validateImgURL(possibleURL){
    console.log('possibleurl', possibleURL);
    return possibleURL;
}


function getParsedText(body){

    let words = new pos.Lexer().lex(body.relativeContext);
    words = cleanAndLower(words);
    console.log('words are', words);

    return nlpMagic(words);
}

function cleanAndLower(words){
    let cleanWords = [];
    for(let word of words){
        cleanWords.push(word.replace(/\W/g, '').toLocaleLowerCase())
    }
    return cleanWords;
}

function nlpMagic(words){
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);

    var listOfTags = [];
    var listOfWords = [];

    for (let taggedWord of taggedWords) {

        var word = taggedWord[0];
        var tag = taggedWord[1];
        listOfTags.push(tag.substring(0,2));
        listOfWords.push(word);
    }

    let chunckCandidates = getChunkCandidates(listOfWords, listOfTags);

    var lengthOfCandidatesList = chunckCandidates.length;
    var finalChunks = [];

    // make sure most right range in in
    if (lengthOfCandidatesList > 1)
        finalChunks.push(chunckCandidates[lengthOfCandidatesList - 1]);

    // go over the others
    for (let i = 0; i < lengthOfCandidatesList; i++) {
        var candidate = chunckCandidates[i];
        var currentLeft = candidate.left;
        var currentRight = candidate.right;

        if (overlap(currentLeft, currentRight, finalChunks))
            continue;

        finalChunks.push(candidate);

    }


  //  console.log(finalChunks);

// show in words
    var relevantTexts = [];
    for (let range of finalChunks) {
        var text = "";
        for (let i = range.left; i <= range.right; i++) {
            text += listOfWords[i] + " ";
        }
        //console.log(text)
        relevantTexts.push(text);
    }
    console.log('returning relevant texts', relevantTexts);
    return relevantTexts

    function getChunkCandidates(listOfWords, listOfTags) {

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

            if (isBadSequence(listOfTags, listOfWords, left, right))
                continue;

            returnedValues.push({left: left, right: right});
        }

        return returnedValues;
    }

    function isBadSequence(listOfTags, listOfWords, left, right) {

        // rule 1: CC (conjunction can't come between noun and verb)
        for (let i = left; i <= right - 2; i++) {
            if (listOfTags[i] == 'NN' && listOfTags[i+1] == 'CC' && listOfTags[i+2] == 'VB')
                return true;
        }

        if (listOfWords[right] == 'is')
            return true;

        return false;
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
}

//nlpMagic(new pos.Lexer().lex('the man cut trees with his girlfriend'));


// function getImagesFromTextAndSend(texts, res){
//
//     let allImageUrls = [];
//     asyncLoop(texts, getUrls, sendUrls);
//
//     function getUrls(text, next){
//         request(getUrlFromText(text), function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 allImageUrls.push({identifier: text, imgUrl: getImgUrlFromBody(body)});
//                 next();
//             }
//         });
//     }
//
//     function sendUrls(){
//         console.log('\nSending images: ', allImageUrls);
//         res.send(allImageUrls);
//     }
// }


app.listen(8000);

//
// theurls = [];
//
// function go(word){
//     let searchTerms = word;
//     searchTerms.push('png');
//     console.log(searchTerms);
//     let urlBase = 'https://www.bing.com/images/search?q=';
//     let url = urlBase + searchTerms + "&qs=n&form=QBIR&pq=" + searchTerms + "&sc=8-14&sp=-1&sk=";
//
//
//     request(url, function (error, response, body) {
//         console.log('searching', url);
//         if (!error && response.statusCode == 200) {
//             findImageUrl(body)
//         }
//     });
//
//     function findImageUrl(body) {
//         let indexOfHref = body.indexOf('href="http:');
//         let possibleEnd = body.indexOf('"', indexOfHref + 6);
//
//         let possibleSubstring = body.substring(indexOfHref, possibleEnd);
//
//         theurls.push(possibleSubstring.split('"http://')[1]);
//     }
// }
//
// mywords = ["hammer", "mouse", "bread", "mountain", "dragon", "shoe", "house", "dog", "ball", "hat", "sword", "lava",
//     "mermaid", "china", "clock", "bat", "truck", "forest", "lion", "hole"];
//
// for(word of mywords){
//     go([word]);
// }
//
// function pr(){
//     console.log(theurls);
// }
//
// setTimeout(pr, 5000);
