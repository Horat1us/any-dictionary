import * as React from "react";
import * as translation from "../../translation";
import { useStateContext } from "./state";

const Item: React.FC<translation.Item> = ({ value, comment }) => {
    const state = useStateContext();
    const params = new URLSearchParams({
        q: value,
        s: state.source.toString(),
        t: state.target.toString(),
    });
    return <li className="input-group m-1" aria-valuetext={value}>
        <div className="input-group-prepend">
            <button type="button" className="btn btn-light btn-copy" title="Copy">
                <img src="/static/copy.svg" alt="Copy"/>
            </button>
            <a href={`/?${params.toString()}`} className="btn btn-light word-link" title="Open">
                <img src="/static/link.svg" alt="Open"/>
            </a>
        </div>
        <input type="text" size={value.length + 4} className="form-control bg-light border-0 translated-word" value={value} readOnly/>
        {comment && <div className="input-group-append">
            <span className="input-group-text small bg-light">{comment}</span>
        </div>}
    </li>;
};
const Subject: React.FC<translation.Subject> = ({ name, items }) => {
    return (
        <li className="list-group-item">
            <h6 className="highlight d-inline">{name}: </h6>
            <ul className="list-inline list-bull d-inline">
                {items.map((item, i) => <Item key={i} {...item} />)}
            </ul>
        </li>
    );
};

const BadgeColors: { [k: string]: string } = {
    'noun': 'primary', 'verb': 'info', 'adjective': 'secondary', 'abbreviation': 'warning',
};
const Badge: React.FC<{ value: string }> = ({ value }) => {
    const color = BadgeColors[value] || 'default';
    return <span className={`badge badge-${color}`}>{value}</span>;
};

export const Word: React.FC<translation.Word> = (
    { type, value, spelling, subjects }
) => {
    return (
        <article className="card mb-3 border-0 shadow-sm">
            <div className="card-header pb-0">
                <h4 className="card-title">{value} <Badge value={type}/></h4>
                {spelling && <h5 className="card-subtitle mb-2 text-muted">[{spelling}]</h5>}
            </div>
            <ul className="list-group list-group-flush">
                {subjects.map((subject, i) => <Subject key={i} {...subject} />)}
            </ul>
        </article>
    )
};
