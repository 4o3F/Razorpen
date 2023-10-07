use std::path::PathBuf;
use crate::{types, utils};

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
        std::fs::OpenOptions::new().create_new(true).write(true).open(&database_path).unwrap();
        log::info!("Successfully created Razorpen database file");
        // Do SQL table creation
        let result = create_tables(&database_path);
        if result.is_err() {
            // Error already handled in create_tables
            return result;
        }
        log::info!("Successfully created Razorpen database tables")
    } else {
        log::debug!("Razorpen database file already exists")
    }

    let mut connection = crate::DATABASE_CONNECTION.lock().unwrap();
    if connection.is_none() {
        let result = sqlite::open(&database_path);
        if result.is_err() {
            return utils::handle_void_error(String::from("Error opening database connection") + result.err().unwrap().message.unwrap().as_str());
        }
        *connection = Some(result.unwrap());
    }

    log::info!("Successfully opened Razorpen database");

    Ok(())
}

fn create_tables(database_path: &PathBuf) -> Result<(), String> {
    let connection = sqlite::open(database_path);
    if connection.is_err() {
        return utils::handle_void_error(String::from("Error opening database connection") + connection.err().unwrap().message.unwrap().as_str());
    }
    let connection = connection.unwrap();
    let result = connection.execute(
        "
        create table projects
        (
            pid       INTEGER not null
                constraint projects_pk
                    primary key autoincrement,
            title     TEXT    not null,
            path      TEXT    not null,
            last_edit INTEGER not null
        );
        ",
    );
    if result.is_err() {
        return utils::handle_void_error(String::from("Error creating projects table") + result.err().unwrap().message.unwrap().as_str());
    }
    Ok(())
}

// Will return error message or success result in json format
pub fn get_recent_projects() -> Result<String, String> {
    let connection = crate::DATABASE_CONNECTION.lock().unwrap();
    if connection.is_none() {
        return utils::handle_string_error(String::from("Database connection is not initialized"));
    }
    let connection = connection.as_ref().unwrap();

    let mut projects: Vec<types::Project> = vec![];

    let query = "SELECT * FROM projects ORDER BY last_edit DESC LIMIT 10";

    let statement = connection.prepare(query);
    if statement.is_err() {
        return utils::handle_string_error(String::from("Error preparing query statement"));
    }
    let statement = statement.unwrap();
    for row in statement
        .into_iter()
        .map(|row| row)
    {
        if row.is_err() {
            return utils::handle_string_error(String::from("Error reading row"));
        }
        let row = row.unwrap();
        let pid: i64 = row.read::<i64, _>("pid");
        let title: String = row.read::<&str, _>("title").to_string();
        let path: String = row.read::<&str, _>("path").to_string();
        let last_edit: i64 = row.read::<i64, _>("last_edit");
        let project = types::Project::new(pid, title, path, last_edit);
        projects.push(project);
    }
    let json = serde_json::to_string(&projects);
    if json.is_err() {
        return utils::handle_string_error(String::from("Error converting project data to json"));
    }
    Ok(json.unwrap())
}