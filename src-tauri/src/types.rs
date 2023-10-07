use serde::Serialize;

#[derive(Serialize)]
pub struct Project {
    pid: i64,
    title: String,
    path: String,
    last_edit: i64,
}

impl Project {
    pub fn new(pid: i64, title: String, path: String, last_edit: i64) -> Self {
        Self { pid, title, path, last_edit }
    }
}