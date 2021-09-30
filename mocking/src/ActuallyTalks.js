const AWS = require('aws-sdk');
const play = require('audio-play');
const load = require('audio-loader');

AWS.config.update({
    region: 'eu-west-1'
});

const translate = new AWS.Translate();
const polly = new AWS.Polly();

/////// user defined params
var textToTranslate = "Hello world, please translate this to another language.";
var primaryLang = "en";
var targetLang = "es";
///////

let params = {
        Text: textToTranslate,
        SourceLanguageCode: primaryLang,
        TargetLanguageCode: targetLang
    };

function doSynthesize(text, languageCode){
    if(languageCode === "es"){ //ideally have a switch statement here with all lang options
        voiceId = "Penelope";
    }
    else voiceId = "Brian" //I think Brian works with most langs, just sounds weird?

    var voiceParams = {
        OutputFormat: "mp3",
        SampleRate: "8000",
        Text: text,
        TextType: "text",
        VoiceId: voiceId
    }

    polly.synthesizeSpeech(voiceParams, function(err, polyData) {
        if(err){
            console.log(err, err.stack);
        }
        else{
            console.log(polyData);
            load(polyData.AudioStream).then(play);
        }
    })

}
    

async function goAndDoSomeTranslate() {
    try {
        let data = await translate.translateText(params).promise();
        console.log(data.TranslatedText);
        doSynthesize(data.TranslatedText, data.TargetLanguageCode)
    }
    catch(ex) {
        console.log("Translation didn't work" + ex);
    }
}

goAndDoSomeTranslate();

