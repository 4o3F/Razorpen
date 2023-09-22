import {useRecoilValue} from "recoil";
import global_errors from "../store/global_errors.ts";
import {Button, Card, CardBody, CardFooter, CardHeader, Code} from "@chakra-ui/react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowBackIcon, WarningTwoIcon} from "@chakra-ui/icons";

export default function Error() {
    const navigate = useNavigate()
    const global_error = useRecoilValue(global_errors)

    useEffect(() => {
        if (!global_error.has_error) {
            navigate("/")
        }
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="flex w-2/3">
                <CardHeader className="text-2xl font-bold">
                    <div className="flex flex-row gap-3 items-center">
                        <WarningTwoIcon className="flex fill-orange-400" color="red.500"/>
                        <p className="flex">An error has occurred</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="font-bold">
                        If you believe this shouldn't happen,
                        please copy the following error message and create a issue at
                    </p>
                    <a
                        href="https://github.com/4o3F/Razorpen"
                        className="text-blue-400">
                        https://github.com/4o3F/Razorpen
                    </a>
                    <br/>
                    <Code display="block">
                        {global_error.error_message}
                    </Code>
                </CardBody>
                <CardFooter>
                    <Button leftIcon={<ArrowBackIcon/>} colorScheme="teal" variant="outline" onClick={
                        () => navigate("/")
                    }>
                        Go back to dashboard
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}