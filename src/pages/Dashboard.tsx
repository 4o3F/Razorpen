import {useRecoilState} from "recoil";
import global_status from "../store/global_status.ts";
import {Initializer} from "../components/Initializer.tsx";
import {Projects} from "../components/Projects.tsx";

export default function Dashboard() {

    const [_global_status, _] = useRecoilState(global_status)

    return (
        <div>
            {_global_status.initialized ? <Projects /> : <Initializer/>}
        </div>
    );

}