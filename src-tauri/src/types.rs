use serde::Serialize;

#[derive(Serialize)]
pub struct Project {
    pid: i32,
    title: String,
    path: String,
    last_edit: i32,
}