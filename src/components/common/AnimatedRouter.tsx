import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";

import Dashboard from "../../pages/Dashboard.tsx";
import Error from "../../pages/Error.tsx";
import Settings from "../../pages/Settings.tsx";
import Editor from "../../pages/Editor.tsx";
import ProjectCreation from "../../pages/ProjectCreation.tsx";
import Transitions from "./Transition.tsx";
import Initialize from "../../pages/Initialize.tsx";


export function AnimatedRouter() {
    const location = useLocation()


    return (
        <AnimatePresence mode={"wait"}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Transitions><Initialize/></Transitions>}/>
                <Route path="/dashboard" element={<Transitions><Dashboard/></Transitions>}/>
                <Route path="/error" element={<Transitions><Error/></Transitions>}/>
                <Route path="/settings" element={<Transitions><Settings/></Transitions>}/>
                <Route path="/project/create" element={<Transitions><ProjectCreation/></Transitions>}/>
                <Route path="/project/:pid/editor" element={<Transitions><Editor/></Transitions>}/>
            </Routes>
        </AnimatePresence>
    );
}