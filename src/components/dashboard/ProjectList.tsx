import Project from "../../types/project.ts";
import {invoke} from "@tauri-apps/api";
import {plainToClass} from "class-transformer";
import {useEffect, useState} from "react";
import {Skeleton} from "@chakra-ui/react";
import consola from "consola";
import {useRecoilState} from "recoil";
import global_errors_store from "../../store/global_errors_store.ts";
import {useNavigate} from "react-router-dom";

export function ProjectList() {
    const [loading_status, set_loading_status] = useState(true)
    const [_, set_global_error] = useRecoilState(global_errors_store)
    const navigate = useNavigate()

    async function get_recent_projects(): Promise<Project[]> {
        let projects = Array<Project>();
        try {
            let json: string = await invoke("get_recent_projects")

            let result: Array<object> = JSON.parse(json)
            result.map((data: object) => {
                projects.push(plainToClass(Project, data));
            })
            set_loading_status(false)

            consola.info("Recent projects fetched successfully")
        } catch (error: unknown) {
            set_global_error({
                has_error: true,
                error_message: String(error)
            })
            consola.trace(error)
            navigate("/error")
        }
        return projects
    }

    useEffect(() => {
        get_recent_projects().then()
    }, [])
    return (
        <Skeleton
            isLoaded={!loading_status}
        >
            <p>project list</p>
        </Skeleton>
    );
}