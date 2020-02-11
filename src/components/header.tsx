import * as React from "react";

export const Header: React.FC<{}> = () => {
    return (
        <header className="mb-3 mb-md-5 shadow-sm p-3 container">
            <h1 className="font-weight-lighter">
                <a href="/" title="Home Page">
                    <img className="logo mr-1" style={{ height: "1em" }}
                         src="/static/big-dictionary.svg" alt="AnyDictionary"
                    />
                </a>
                AnyDictionary
            </h1>
            <h2 className="lead font-weight-light">
                Translate words and phrases using external dictionaries pool.
            </h2>
        </header>
    );
};
