const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const cliProgress = require('cli-progress');
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const argv = yargs
    .option('source', {
        alias: 's',
        describe: 'Source Language',
        default: 'en'
    })
    .option('target', {
        alias: 't',
        describe: 'Target Language',
        default: 'de'
    })
    .option('key', {
        alias: 'k',
        describe: 'OpenAI API Key',
        default: ''
    })
    .argv;

if (!argv.key) {
    console.error('OpenAI API Key is required. Please use --key or -k parameter.');
    return;
}

const startKey = "translate_from_here";

const sourceLanguage = argv.source;
const targetLanguage = argv.target;
const OPENAI_API_KEY = argv.key;

const currentWorkingDirectory = process.cwd();

const sourceFile = path.join(currentWorkingDirectory, `${sourceLanguage}.json`);
const targetFile = path.join(currentWorkingDirectory, `${targetLanguage}.json`);

let targetData = {};
if (fs.existsSync(targetFile)) {
    targetData = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
}

const jsonData = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

const startIndex = Object.keys(jsonData).findIndex(key => key === startKey);
let dataToTranslate = {};
if (startIndex !== -1) {
    const keys = Object.keys(jsonData).slice(startIndex + 1);
    keys.forEach(key => {
        dataToTranslate[key] = jsonData[key];
    });
}

if (Object.keys(dataToTranslate).length === 0) {
    console.error(`${startKey} key is not specified in the source JSON file.`);
    return;
}

const translateObject = async (data) => {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: `You will convert json data according to ${targetFile} language. Don't touch the parameters and custom definitions in the value. The result must be just pure JSON Data.`,
            },
                {
                    role: "user",
                    content: "My Data: " + JSON.stringify(data, null, 2),
                },
            ],
        }),
    };

    const chatGPTResults = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
    ).then((res) => res.json());

    return chatGPTResults.choices[0].message.content;
};

bar.start(2, 0);
setTimeout(() => {
    bar.update(1);
}, 1000);

translateObject(dataToTranslate)
    .then((translatedObject) => {
        targetData = Object.assign(targetData, JSON.parse(translatedObject));
        fs.writeFileSync(targetFile, JSON.stringify(targetData, null, 2), 'utf-8');
        bar.update(2);
        bar.stop();
    })
    .catch((error) => {
        console.error('Error:', error);
    });