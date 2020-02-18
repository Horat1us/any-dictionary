import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as express from "express";

import * as Multitran from "./multitran";
import * as ContextReverso from "./context-reverso";
import * as translation from "./translation";
import {Template} from "./components/template";
import * as App from "./components/app";

import * as Database from "./database-handler";

export const Handler = (
    multitran: Multitran.Service = new Multitran.Service,
    contextReverso: ContextReverso.Service = new ContextReverso.Service,
): express.RequestHandler => {
    return async (req, res, next) => {
        try {
            const searchParams = Object.fromEntries(new URLSearchParams(req.query).entries());
            const state = new App.State(
                searchParams.s ? parseInt(searchParams.s, 10) as translation.Language : undefined,
                searchParams.t ? parseInt(searchParams.t, 10) as translation.Language : undefined,
                searchParams.q,
            );
            if (state.query !== undefined) {
                await Database.createTable();
                const store = await Database.findTranslation(state);

                if (!store) {
                    state.result = await multitran.translate(state.query, state.source, state.target);
                    await Database.storeTranslation(state);
                } else {
                    state.result = store;
                }

                if (state.result === undefined) {
                    res.writeHead(404);
                } else {
                    state.source = state.result.source;
                    state.target = state.result.target;
                    state.result.phrases = await contextReverso.translate(state.query, state.source, state.target);
                }
            }
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            ReactDOMServer.renderToNodeStream(
                <App.StateContext.Provider value={state}>
                    <Template/>
                </App.StateContext.Provider>
            ).pipe(res);
        } catch (error) {
            next(error);
        }
    };
};
