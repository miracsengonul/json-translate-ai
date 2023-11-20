# AI JSON Language Translator <img src="https://raw.githubusercontent.com/miracsengonul/json-translate-ai/main/logo.png">

Quickly translate your JSON Language files into the languages you want with AI.

[![NPM Version](https://img.shields.io/npm/v/json-translate-ai.svg?style=flat)](https://www.npmjs.com/package/json-translate-ai)
[![NPM Downloads](https://img.shields.io/npm/dm/json-translate-ai.svg?style=flat)](https://www.npmjs.com/package/json-translate-ai)
[![NPM Downloads](https://img.shields.io/npm/dt/json-translate-ai.svg?style=flat)](https://www.npmjs.com/package/json-translate-ai)
[![NPM License](https://img.shields.io/npm/l/json-translate-ai.svg?style=flat)](https://www.npmjs.com/package/json-translate-ai)

## Installation

#### Globally via npm

```sh
  $ npm install -g json-translate-ai
```

## Getting Started
> If you want to start the translation in the source JSON file, add a new key ```"translate_from_here"``` just above the key from which you want to start.

For example:
```json
"translate_from_here": "",
"footer": {
  "message": "This is a footer message"
}
```
Above, the translation will start from the ```"footer"``` key.

## CLI Usage

```sh
$ json-translate-ai -s en -t de -k OPENAI_API_KEY
```
or
```sh
$ json-translate-ai --source en --target de --key OPENAI_API_KEY
```


## Parameters
| Parameter             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| -s |  --source: Source language (default: 'en') |
| -t |  --target: Target language (default: 'de') |
| -k |  --key: OpenAI API Key (required) |

## Contributing

If you find any issues or have suggestions for improvement, please open an issue or create a pull request.

## Author

- [@miracsengonul](https://www.x.com/miracsengonul)


## License

[MIT](https://choosealicense.com/licenses/mit/)

