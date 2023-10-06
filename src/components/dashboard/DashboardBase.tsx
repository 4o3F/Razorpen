import {motion} from "framer-motion";
import {SideMenu} from "./SideMenu.tsx";
import {ProjectList} from "./ProjectList.tsx";

export function DashboardBase() {
    return (
        <motion.div
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.5
            }}
        >
            <div className={"h-screen grid grid-cols-4 gap-3 p-3"}>
                <div className={"pr-2 border-r-2 col-span-1"}>
                    <SideMenu/>
                </div>
                <div className={"col-span-3"}>
                    <ProjectList />
                </div>
            </div>
        </motion.div>
    );
}