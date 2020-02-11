import * as React from "react";
import * as App from "./app";
import { Footer } from "./footer";
import { Header } from "./header";

export const Template: React.FC<{}> = () => {
    return (
        <html lang="en">
        <head>
            <title>AnyDictionary - Перевод фраз, слов, текста</title>
            <link rel="manifest" href="/static/manifest.json"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" type="image/webp" href="/static/big-dictionary.webp" sizes="96x96"/>
            <link rel="icon" type="image/png" href="/static/big-dictionary.png" sizes="96x96"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
                  integrity="sha256-PHcOkPmOshsMBC+vtJdVr5Mwb7r0LkSVJPlPrp/IMpU=" crossOrigin="anonymous"/>
            <link rel="stylesheet" integrity="sha256-L/W5Wfqfa0sdBNIKN9cG6QA5F2qx4qICmU2VgLruv9Y="
                  crossOrigin="anonymous"
                  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css"/>
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap"
                  rel="stylesheet"/>
            <link rel="stylesheet" href="/static/main.css"/>
        </head>
        <body className="d-flex flex-column h-100">
        <Header/>
        <App.Layout/>
        <Footer/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.4/clipboard.min.js"/>
        <script src="/static/main.js"/>
        </body>
        </html>
    );
};
