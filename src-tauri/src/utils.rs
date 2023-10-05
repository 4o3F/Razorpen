pub fn handle_error(error_message: String) -> Result<(), String> {
    log::error!("{}", error_message);
    Err(error_message)
}