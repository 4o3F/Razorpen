import React from "react";
import ReactDOM from "react-dom/client";
import {RecoilRoot} from "recoil";
import 'reflect-metadata'
import {
    HashRouter
} from "react-router-dom";

import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import {AnimatedRouter} from "./components/common/AnimatedRouter.tsx";


console.log("Reloaded at " + new Date())

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <RecoilRoot>
                <HashRouter>
                    <AnimatedRouter/>
                </HashRouter>
            </RecoilRoot>
        </ChakraProvider>
    </React.StrictMode>,
);
