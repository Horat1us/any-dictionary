import * as React from "react";

export const Footer: React.FC<{}> = () => {
    return (
        <footer className="footer mt-auto bg-light py-3 mb-light">
            <div className="container">
                <details className="copyright text-muted">
                    <summary>For personal use only. Content may be protected by copyright.</summary>
                    <p>
                        Icons made by
                        <a href="https://www.flaticon.com/authors/freepik" rel="noopener" title="Freepik"> Freepik</a> from
                        <a href="https://www.flaticon.com/" rel="noopener" title="Flaticon"> www.flaticon.com</a>
                    </p>
                    <p>
                        <strong>
                            <a href="https://getbootstrap.com/" rel="noopener">Bootstrap v4.4.1</a>
                            &nbsp;Copyright 2011-2019 The Bootstrap Authors, Copyright 2011-2019 Twitter, Inc.
                            &nbsp;<a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" rel="noopener">Licensed under MIT</a>
                        </strong>
                    </p>
                </details>
            </div>
        </footer>
    );
};
