import * as React from "react";

export const Phrase: React.FC<{ tuple: [ string, string ] }> = ({ tuple: [ source, translation ] }) => {
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-6" dangerouslySetInnerHTML={{ __html: source, }}/>
                <div className="col-6 text-right text-md-left"
                     dangerouslySetInnerHTML={{ __html: translation, }}
                />
            </div>
        </li>
    );
};
const ShowMoreButton = `<button class="btn btn-outline-primary" type="button" onclick="this.parentNode.nextElementSibling.removeAttribute('hidden');this.parentElement.hidden=true">Show More</button>`;

export const Phrases: React.FC<{ list: Array<[ string, string ]> }> = ({ list }) => {

    return (
        <div className="card border-0 shadow-sm mb-3 mb-md-5">
            <div className="card-body">
                <h5 className="card-title mb-0">
                    Example phrases
                </h5>
            </div>
            <ul className="list-group list-group-flush">
                {list.slice(0, 2).map((tuple, i) => (<Phrase tuple={tuple} key={i}/>))}
            </ul>
            <div className="card-body text-center" dangerouslySetInnerHTML={{__html: ShowMoreButton}}/>
            <ul className="list-group list-group-flush animate fadeInDown" hidden>
                {list.slice(2).map((tuple, i) => (<Phrase tuple={tuple} key={i}/>))}
            </ul>
        </div>
    )
};
