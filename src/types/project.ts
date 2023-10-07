import {Expose} from "class-transformer";

export default class Project {
    @Expose({name: "pid"})
    pid: bigint

    @Expose({name: "title"})
    title: string

    @Expose({name: "path"})
    path: string

    // In UNIX timestamp format
    @Expose({name: "last_edit"})
    last_edit: bigint

    constructor(pid: bigint, title: string, path: string, last_edit: bigint) {
        this.pid = pid;
        this.title = title;
        this.path = path;
        this.last_edit = last_edit;
    }

}