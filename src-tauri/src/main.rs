// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lazy_static::lazy_static;

mod latex;
mod database;
mod utils;

lazy_static! {
    static ref HOME_DIR: String = {
        let home_dir = directories::UserDirs::new().unwrap();
        let home_dir = home_dir.home_dir();
        let home_dir = home_dir.join(".razorpen/");
        home_dir.to_str().unwrap().to_string()
    };
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn init_backend() -> Result<(), String> {
    let result = database::init_database().await;
    if result.is_err() {
        return result;
    }
    let tectonic_existence = latex::check_tectonic_existence();
    log::info!("Tectonic existence: {}",tectonic_existence);
    if !tectonic_existence {
        let result = latex::download_tectonic().await;
        if result.is_err() {
            return result;
        }
    }
    Ok(())
}

fn main() {
    env_logger::init();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![init_backend])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
