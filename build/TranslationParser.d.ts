declare type Payload = {
    [key: string]: any;
};
export default class TranslationParser {
    execute(path: string): Promise<Payload>;
    private getContent;
    private assign;
    private groupToArray;
    private isArray;
    private extractStringFromKey;
}
export {};
