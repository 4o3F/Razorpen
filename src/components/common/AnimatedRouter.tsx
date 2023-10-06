import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Dashboard from "../../pages/Dashboard.tsx";
import Error from "../../pages/Error.tsx";

export function AnimatedRouter() {
    const location = useLocation()


    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/error" element={<Error/>}/>
            </Routes>
        </AnimatePresence>
    );
}