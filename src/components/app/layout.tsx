import * as React from "react";
import { Form } from "./form";
import { Word } from "./word";
import { useStateContext } from "./state";
import { NotFound } from "./not-found";
import { Phrases } from "./phrases";

export const Layout: React.FC<{}> = () => {
    const state = useStateContext();
    const isNotFound = state.query && (!state.result || state.result.words.length === 0);

    return (
        <main role="main" className="flex-shrink-0">
            <div className="container">
                <div className="card bg-light border-0 shadow mb-3 mb-md-5">
                    <div className="card-body">
                        <Form/>
                    </div>
                </div>
                {(state.result !== undefined) && state.result.phrases.length > 0 && (
                    <Phrases list={state.result.phrases}/>
                )}
                {(state.result !== undefined) && state.result.words.length > 0 &&
                <article className="words-list animated pulse">
                    {state.result.words.map((word, i) => <Word key={i} {...word}/>)}
                </article>}
                {isNotFound && <NotFound/>}
                <details className="mt-3 mt-md-5">
                    <summary>State</summary>
                    <pre>{JSON.stringify(state, undefined, 1)}</pre>
                </details>
            </div>
        </main>
    )
};
