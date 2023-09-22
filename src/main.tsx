import React from "react";
import ReactDOM from "react-dom/client";
import {RecoilRoot} from "recoil";
import 'reflect-metadata'
import {
    createHashRouter,
    RouterProvider
} from "react-router-dom";

import './index.css'
import {ChakraProvider} from "@chakra-ui/react";

import Editor from "./pages/editor.tsx";
import Settings from "./pages/settings.tsx";
import Dashboard from "./pages/dashboard.tsx";
import Error from "./pages/error.tsx";

console.log("Reloaded at " + new Date())

const router = createHashRouter([
    {
        path: '/',
        element: <Dashboard/>
    },
    {
        path: '/editor',
        element: <Editor/>,
    },
    {
        path: '/settings',
        element: <Settings/>
    },
    {
        path: '/error',
        element: <Error/>
    }
], {})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <RecoilRoot>
                <RouterProvider router={router}/>
            </RecoilRoot>
        </ChakraProvider>
    </React.StrictMode>,
);
