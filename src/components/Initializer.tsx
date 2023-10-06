import {useRecoilState} from "recoil";
import global_status from "../store/global_status.ts";
import global_errors from "../store/global_errors.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import consola from "consola";
import {Spinner} from "@chakra-ui/react";
import {motion} from "framer-motion";

export function Initializer() {
    const [_global_status, set_global_status] = useRecoilState(global_status)
    const [_, set_global_error] = useRecoilState(global_errors)
    const navigate = useNavigate()

    const [loading_text, set_loading_text] = useState("Loading...")

    async function init_database(): Promise<void> {
        return await invoke("init_database");
    }

    async function check_tectonic_existence(): Promise<boolean> {
        return await invoke("check_tectonic_existence");
    }

    async function download_tectonic(): Promise<void> {
        return await invoke("download_tectonic");
    }

    function handle_error(error: Error) {
        set_global_error({
            has_error: true,
            error_message: error.toString()
        })
        consola.trace(error)
        navigate("/error")
    }

    async function init_backend() {
        consola.info("Initializing database")
        set_loading_text("Initializing database")
        await init_database()
            .catch(handle_error)

        consola.info("Checking tectonic existence")
        set_loading_text("Checking tectonic existence")
        let tectonic_existence: boolean | void = await check_tectonic_existence()
            .catch(handle_error)

        if (!tectonic_existence) {
            consola.info("Tectonic not found, downloading")
            set_loading_text("Tectonic not found, downloading")
            await download_tectonic()
                .catch(handle_error)
        }
        consola.info("Initialization finished")
        set_loading_text("Initialization finished")

        await new Promise(resolve => setTimeout(resolve, 2000));

        set_global_status({
            initialized: true
        })
    }

    useEffect(() => {
        init_backend().then(() => {
            consola.info("Backend initialization finished")
        })
    }, [])


    return (
        <motion.div
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 1
            }}
        >
            <div className={"flex justify-center items-center h-screen"}>
                <div className={"flex w-3/5 place-content-around items-center"}>
                    <Spinner size={"xl"} thickness={"5px"} speed={"1s"} color={"blue.300"}/>
                    <p className={"text-2xl text-center"}>{loading_text}</p>
                </div>
            </div>
        </motion.div>
    );
}