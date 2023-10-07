pub fn handle_void_error(error_message: String) -> Result<(), String> {
    log::error!("{}", error_message);
    Err(error_message)
}

pub fn handle_string_error(error_message: String) -> Result<String, String> {
    log::error!("{}", error_message);
    Err(error_message)
}