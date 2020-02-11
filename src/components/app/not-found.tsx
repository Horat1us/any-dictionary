import * as React from "react";

export const NotFound: React.FC<{}> = () => {
    return (
        <div className="alert alert-warning alert-dismissible border-0 shadow animated flash" role="alert">
            <strong>Not found!</strong> Unable to translate your request.
        </div>
    );
};
