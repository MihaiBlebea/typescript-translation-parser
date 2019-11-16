import fs from 'fs'

type Payload = { [key : string] : any}


export default class TranslationParser
{

    async execute(path : string)
    {
        try {
            let payload = await this.getContent(path)

            // Init empty object
            let result : Payload = {}

            // Parse to a pure object
            Object.keys(payload).forEach((key : string)=> {
                let keyParts = key.split('_')
                this.assign(result, keyParts, payload[key])
            })

            // Group similar keys together
            result = this.groupToArray(result)

            return result
        } catch(error) {
            throw error
        }
    }

    private async getContent(path : string) : Promise<Payload>
    {
        return new Promise((resolve, reject)=> {
            fs.readFile(path, 'utf8', (error, content)=> {
                if(error)
                {
                    reject(error)
                }
                resolve(JSON.parse(content))
            })
        })
    }

    private assign(payload : Payload, keys : string[], value : string) 
    {
        keys = keys.map((key)=> key.toUpperCase())

        let lastKeyIndex = keys.length-1;
        for (var i = 0; i < lastKeyIndex; ++ i) 
        {
            let key = keys[i]
            if(!(key in payload))
            {
                payload[key] = {}
            }
            payload = payload[key]
        }
        payload[keys[lastKeyIndex]] = value
    }

    private groupToArray(payload : Payload)
    {
        return Object.keys(payload).reduce((result, key)=> {
            if(this.isArray(key))
            {
                let stringKey = this.extractStringFromKey(key)!
                if(stringKey in result)
                {
                    result[stringKey].push(payload[key])
                } else {
                    result[stringKey] = []
                }
            } else {
                result[key] = this.groupToArray(payload[key])
            }
            return result

        }, Object.create(null))
    }

    private isArray(key : string)
    {
        const regex = /[a-zA-Z]+\d/gm
        let result = regex.exec(key)
        return result !== null
    }

    private extractStringFromKey(key : string)
    {
        const regex = /[a-zA-Z]+/gm
        let result = regex.exec(key)
        return result !== null ? result[0] : null
    }
}



