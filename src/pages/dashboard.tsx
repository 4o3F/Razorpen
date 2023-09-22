import {invoke} from "@tauri-apps/api";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import global_errors from "../store/global_errors.ts";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {

    const [loading, set_loading] = useState(true)
    const [_, set_global_error] = useRecoilState(global_errors)
    const navigate = useNavigate()

    async function init_backend() {
        return await invoke("init_backend");
    }

    useEffect(() => {
        init_backend().then(() => {
                set_loading(false)
            }
        ).catch((error) => {
            set_global_error({
                has_error: true,
                error_message: error.toString()
            })
            console.log(error)
            navigate("/error")
        })
    }, [])

    return (
        <div>
            {
                loading
            }
        </div>
    )
}