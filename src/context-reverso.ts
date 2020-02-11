import axios, { AxiosInstance } from "axios";
import * as translation from "./translation";
import * as cheerio from "cheerio";

export class Service {
    constructor(public readonly endpoint: AxiosInstance = axios.create({
        baseURL: "https://context.reverso.net/translation/",
        method: "get",
        headers: {
            'Accept': 'text/html',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'Referer': `https://www.multitran.com/m.exe?a=1&SHL=1`,
        }
    })) {
    }

    public readonly translate = async (
        query: string,
        from: translation.Language = translation.Language.english,
        to: translation.Language = translation.Language.russian,
    ): Promise<Array<[ string, string ]>> => {
        const { data } = await this.endpoint.request<string>({
            url: `/${translation.Language[from]}-${translation.Language[to]}/${encodeURIComponent(query)}`,
        });
        const $ = cheerio.load(data, {
            normalizeWhitespace: true,
        });
        return $('.example')
            .toArray()
            .map((el) => cheerio(el))
            .map((e): [ string, string ] => {
                const source = query.split(' ').reduce(
                    (source, item) => source.replace(item, `<mark>${item}</mark>`),
                    e.find('.src').first().text().trim()
                );
                const translation = e.find('.trg em')
                    .toArray()
                    .map((e) => e.firstChild.nodeValue)
                    .reduce(
                        (translation, item) => translation.replace(item, `<mark>${item}</mark>`),
                        e.find('.trg').first().text().trim()
                    );
                return [ source, translation ];
            });
    };
}
