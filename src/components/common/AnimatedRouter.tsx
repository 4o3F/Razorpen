import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Dashboard from "../../pages/Dashboard.tsx";
import Error from "../../pages/Error.tsx";
import Settings from "../../pages/Settings.tsx";
import Editor from "../../pages/Editor.tsx";
import {ProjectCreation} from "../../pages/ProjectCreation.tsx";

export function AnimatedRouter() {
    const location = useLocation()


    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/project/create" element={<ProjectCreation/>}/>
                <Route path="/project/:pid/editor" element={<Editor/>}/>
            </Routes>
        </AnimatePresence>
    );
}