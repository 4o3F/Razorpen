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
}