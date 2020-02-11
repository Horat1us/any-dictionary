export enum Language {
    english = 1,
    russian = 2,
    ukrainian = 33,
    german = 3,
    french = 4,
    spanish = 5,
    croatian = 8,
    arabic = 10,
    portuguese = 11,
    lithuanian = 12,
    romanian = 13,
    polish = 14,
    bulgarian = 15,
    czech = 16,
    chinese = 17,
    danish = 22,
    italian = 23,
    estonian = 26,
    latvian = 27,
    japanese = 28,
    swedish = 29,
    norwegian = 30,
    turkish = 32,
    finnish = 36,
    latin = 37,
    greek = 38,
    korean = 39,
    hungarian = 42,
    irish = 49,
    catalan = 53,
    slovak = 60,
    slovenian = 67,
    basque = 68,
    maltese = 78,
    chineseSimplified = 97,
    chineseTaiwan = 98
}

export interface Item {
    value: string;
    comment?: string;
}

export class Item implements Item {
    constructor(public value: string, public comment?: string) {
    }
}

export class Phrase {
    constructor(public source: string, public translated: string) {
    }
}

export interface Subject {
    id: number;
    name: string;
    items: Array<Item>;
}

export class Subject implements Subject {
    constructor(public name: string, public items: Array<Item>) {
    }
}

export class Word {
    static transformTypeAcronym(type: string): string {
        switch (type) {
            case "n":
                return "noun";
            case "v":
                return "verb";
            case "adj.":
                return "adjective";
        }
        return type;
    }

    constructor(
        public type: string,
        public value: string,
        public spelling?: string,
        public subjects: Array<Subject> = []
    ) {
        this.type = Word.transformTypeAcronym(type);
    }
}


export type Result = {
    words: Array<Word>;
    phrases: Array<[string, string]>;
    source: Language;
    target: Language;
};
