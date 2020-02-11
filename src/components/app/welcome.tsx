import * as React from "react";

export const Welcome: React.FC<{}> = () => {
    return (
        <div className="jumbotron mt-3">
            <h1>Welcome to Cross-Service Dictionary</h1>
            <p className="lead">
                Just type your query into search input. We will care about translations.
            </p>
            <a className="btn btn-lg btn-primary" href="/?q=victory" role="button">
                Click & Start
            </a>
        </div>
    );
};
