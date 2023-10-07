import {SideMenu} from "../components/dashboard/SideMenu.tsx";
import {ProjectList} from "../components/dashboard/ProjectList.tsx";

export default function Dashboard() {
    return (
        <div className={"h-screen grid grid-cols-4 gap-3 p-3"}>
            <div className={"pr-2 border-r-2 col-span-1"}>
                <SideMenu/>
            </div>
            <div className={"col-span-3"}>
                <ProjectList/>
            </div>
        </div>
    );

}