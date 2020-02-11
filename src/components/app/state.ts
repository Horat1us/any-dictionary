import * as React from "react";
import * as translation from "../../translation";

export class State {
    constructor(
        public source: translation.Language = translation.Language.english,
        public target: translation.Language = translation.Language.russian,
        public query?: string,
        public result?: translation.Result,
    ) {
    }
}

export const StateContext = React.createContext<State>(new State);
StateContext.displayName = "StateContext";
export const useStateContext = () => React.useContext(StateContext);
