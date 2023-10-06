import {useRecoilState} from "recoil";
import global_status_store from "../store/global_status_store.ts";
import {Initializer} from "../components/dashboard/Initializer.tsx";
import {DashboardBase} from "../components/dashboard/DashboardBase.tsx";

export default function Dashboard() {

    const [global_status, _] = useRecoilState(global_status_store)

    return (
        <div>
            {global_status.initialized ? <DashboardBase /> : <Initializer/>}
        </div>
    );

}