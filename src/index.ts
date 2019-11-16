import TranslationParser from './TranslationParser'

// export default TranslationParser

let parser = new TranslationParser()

parser.execute('./content.json').then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})