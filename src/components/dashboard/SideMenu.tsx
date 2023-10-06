import {Button, Icon} from "@chakra-ui/react";
import {BiEditAlt, BiExit, BiFolderOpen} from "react-icons/bi";
import {IoSettingsOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {exit} from "@tauri-apps/api/process";

export function SideMenu() {
    const navigate = useNavigate()

    async function exit_app() {
        await exit(1);
    }

    return (

        <div className={"flex flex-col gap-4 h-full slide-to-left-component"}>
            <Button leftIcon={<Icon as={BiEditAlt}/>} colorScheme={"blue"} variant={"outline"}
                    onClick={() => {
                        navigate('/project/creation')
                    }}>
                <p>Create new project</p>
            </Button>
            <Button leftIcon={<Icon as={BiFolderOpen}/>} colorScheme={"blue"} variant={"outline"}>
                <p>Open project</p>
            </Button>
            <Button leftIcon={<Icon as={IoSettingsOutline}/>} colorScheme={"blue"} variant={"outline"}
                    onClick={() => {
                        navigate('/settings')
                    }}>
                <p>Settings</p>
            </Button>
            <Button leftIcon={<Icon as={BiExit}/>} colorScheme={"blue"} variant={"outline"}
                    onClick={exit_app}>
                <p>Exit</p>
            </Button>
        </div>
    );
}