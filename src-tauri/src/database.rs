pub async fn init_database() -> Result<(), String> {
    // Check if database file exists

    let home_dir = std::path::Path::new(crate::HOME_DIR.as_str());
    let config_path = home_dir.join("razorpen.toml");
    let database_path = home_dir.join("razorpen.db");

    if !home_dir.exists() {
        // If home folder don't exist, create folder
        match std::fs::create_dir_all(home_dir) {
            Ok(_) => {
                log::info!("Successfully created Razorpen home folder")
            }
            Err(e) => {
                log::error!("Error creating Razorpen home folder, error: {}",e.raw_os_error().unwrap());
                return Err(String::from("Error creating Razorpen home folder"));
            }
        };
    } else {
        log::debug!("Razorpen home folder already exists")
    }

    if !std::path::Path::new(&config_path).exists() {
        // Razorpen config file don't exist, creating
        std::fs::OpenOptions::new().create_new(true).write(true).open(config_path).unwrap();
        log::info!("Successfully created Razorpen config file")
        // TODO: Write default config
    } else {
        log::debug!("Razorpen config file already exists")
    }

    if !std::path::Path::new(&database_path).exists() {
        // Razorpen database don't exist, creating
        std::fs::OpenOptions::new().create_new(true).write(true).open(database_path).unwrap();
        log::info!("Successfully created Razorpen database file")
        // TODO: Do SQL table creation
    } else {
        log::debug!("Razorpen database file already exists")
    }

    Ok(())
}