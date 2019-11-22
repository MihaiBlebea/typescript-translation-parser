import Translator from './'

let parser = new Translator()


parser.execute('./content.json').then((result)=> {
    console.log(JSON.stringify(result.META.MEDIUM))
}).catch((error)=> {
    console.log(error)
})