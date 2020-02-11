import axios, { AxiosInstance } from "axios";
import * as cheerio from "cheerio";
import * as translation from "./translation"

interface Params {
    s: string;
    l1: translation.Language;
    l2: translation.Language;
    a?: "3"; // search phrases;
    sc?: number;
}

export class Service {
    constructor(public readonly endpoint: AxiosInstance = axios.create({
        baseURL: "https://www.multitran.com",
        url: "/m.exe",
        method: "get",
        headers: {
            'Accept': 'text/html',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
            'Referer': `https://www.multitran.com/m.exe?a=1&SHL=1`,
        }
    })) {
    }

    /** returns table rows */
    private async request(params: Params): Promise<{ rows: Array<CheerioElement>, $: CheerioStatic }> {
        const { data } = await this.endpoint.request<string>({ params });

        const $ = cheerio.load(data, {
            normalizeWhitespace: true,
        });

        $('i:has(a[href*=UserName]), span[style*="color:rgb"]').remove();
        return {
            rows: $('form + table')
                .find('tr')
                .toArray(),
            $,
        };
    }

    public readonly translate = async (
        query: string,
        from: translation.Language = translation.Language.english,
        to: translation.Language = translation.Language.russian,
    ): Promise<translation.Result | undefined> => {
        const { rows, $ } = await this.request({ s: query, l1: from, l2: to, });
        const words = rows
            .map((element): translation.Subject | translation.Word | undefined => {
                if (element.firstChild.attribs.colspan === "2") {
                    return new translation.Word(
                        cheerio('em', element).text(),
                        cheerio('a', element).first().text(),
                        cheerio('a:first-child + span', element).text()
                            .replace(/^\[(.*)]$/, '$1') || undefined
                    );
                }
                const name = cheerio('.subj a', element).attr('title');
                const trans = cheerio('.trans > a', element);
                if ('string' !== typeof name || trans.length === 0) {
                    return undefined;
                }
                const items = trans.toArray()
                    .map((el) => cheerio(el))
                    .map((el, i, items) => {
                        const item = new translation.Item(el.text());
                        const text = el.nextUntil(items[i + 1]).text().replace(/[();]|or$/g, '').trim();
                        if (text) {
                            item.comment = text;
                        }
                        return item;
                    });
                return new translation.Subject(name, items);
            })
            .filter((e): e is translation.Subject | translation.Word => e !== undefined)
            .reduce<Array<translation.Word>>((categories, current) => {
                if ('subjects' in current) {
                    categories.push(current);
                } else {
                    categories[categories.length - 1].subjects.push(current);
                }
                return categories;
            }, []);

        const source = $('input[name=l1]').val() as any as translation.Language || from;
        const target = $('input[name=l2]').val() as any as translation.Language || to;

        return { words, source, target, phrases: [], };
    };
}
