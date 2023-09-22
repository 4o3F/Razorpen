import {atom} from "recoil";

const global_errors = atom({
    key: 'global_errors',
    default: {
        has_error: false,
        error_message: ""
    }
})
export default global_errors