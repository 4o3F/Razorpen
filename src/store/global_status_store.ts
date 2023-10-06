import {atom} from "recoil";

const global_status_store = atom({
    key:'global_status',
    default: {
        initialized: false
    }
})

export default global_status_store