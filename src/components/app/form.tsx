import * as React from "react";
import * as translation from "../../translation";
import { useStateContext } from "./state";

export const Form: React.FC<{}> = () => {
    const state = useStateContext();

    return (
        <form action="/" method="get" className="m-0">
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <label htmlFor="queryInput" className="sr-only">
                        Query
                    </label>
                    <input type="text"
                           className="form-control"
                           id="queryInput"
                           aria-describedby="queryHelp"
                           placeholder="Query"
                           name="q"
                           defaultValue={state.query}
                    />
                    <small id="queryHelp" className="form-text text-muted">
                        Word, phrase or text
                    </small>
                </div>
                <div className="col-auto">
                    <select
                        className="form-control"
                        id="sourceLanguageInput"
                        name="s"
                        defaultValue={state.source}
                    >
                        {Object.entries(translation.Language).map(([ k, v ]) => (
                            <option key={k} value={k}>{v}</option>
                        ))}
                    </select>
                    <label htmlFor="sourceLanguageInput" className="form-text small m-0 text-muted">
                        Source Language
                    </label>
                </div>
                <div className="col-auto">
                    <select
                        className="form-control"
                        id="targetLanguageInput"
                        name="t"
                        defaultValue={state.target}
                    >
                        {Object.entries(translation.Language).map(([ k, v ]) => (
                            <option key={k} value={k}>{v}</option>
                        ))}
                    </select>
                    <label htmlFor="targetLanguageInput" className="form-text small m-0 text-muted">
                        Target Language
                    </label>
                </div>
                <div className="col-auto align-self-baseline">
                    <button id="btn-submit" type="submit" className="btn btn-light">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};
