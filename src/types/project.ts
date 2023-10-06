import {Expose} from "class-transformer";

export default class Project {
    @Expose({name: "pid"})
    id: bigint

    @Expose({name: "title"})
    title: string

    @Expose({name: "path"})
    path: string

    // In UNIX timestamp format
    @Expose({name: "last_edit_date"})
    last_edit_date: bigint

    constructor(id: bigint, title: string, path: string, last_edit_date: bigint) {
        this.id = id;
        this.title = title;
        this.path = path;
        this.last_edit_date = last_edit_date;
    }

}