use crate::utils;

pub fn check_tectonic_existence() -> bool {
    let file_name = if cfg!(target_os="windows") {
        "tectonic.exe"
    } else {
        "tectonic"
    };
    let file = std::path::PathBuf::from(crate::HOME_DIR.clone() + file_name);
    log::info!("Tectonic path: {}",file.as_path().to_str().unwrap());
    return file.exists();
}

pub async fn download_tectonic() -> Result<(), String> {
    // Start getting latest release asset url
    let client = reqwest::ClientBuilder::new()
        .no_proxy()
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36")
        .build().unwrap();

    let response = client.get("https://api.github.com/repos/tectonic-typesetting/tectonic/releases")
        .send().await;
    if response.is_err() {
        return utils::handle_void_error(String::from("Network error (Stage 1)"));
    }
    let response = response.unwrap();

    let response_status = response.status();
    let response_body = response.text().await.unwrap();
    if response_status != 200 {
        return utils::handle_void_error(String::from("Failed to get tectonic release(stage 1), error code ") + response_status.to_string().as_str() + ", error message: " + response_body.as_str());
    }
    let response: Vec<serde_json::Value> = serde_json::from_str(&response_body).unwrap();
    let asset_url = response[0]["assets_url"].as_str().unwrap();
    // End getting latest asset url

    // Start getting asset download url for different platforms
    let response = client.get(asset_url)
        .send().await;
    if response.is_err() {
        return utils::handle_void_error(String::from("Network error (Stage 2)"));
    }
    let response = response.unwrap();
    let response_status = response.status();
    let response_body = response.text().await.unwrap();
    if response_status != 200 {
        return utils::handle_void_error(String::from("Failed to get tectonic release(stage 2), error code ") + response_status.to_string().as_str() + ", error message: " + response_body.as_str());
    }
    let response: Vec<serde_json::Value> = serde_json::from_str(&response_body).unwrap();

    let mut browser_download_url = String::new();

    let target_name: &str = if cfg!(target_os = "windows") {
        "msvc"
    } else {
        // TODO: Add architecture selection
        "linux"
    };

    for asset in response {
        if asset["name"].as_str().unwrap().to_string().contains(target_name) {
            browser_download_url = asset["browser_download_url"].as_str().unwrap().to_string();
            break;
        }
    }

    if browser_download_url.is_empty() {
        return utils::handle_void_error(String::from("Failed to find tectonic release asset"));
    }
    // End getting asset download url for different platforms

    // Start downloading tectonic binary
    let response = client.get(&browser_download_url).send().await;
    if response.is_err() {
        return utils::handle_void_error(String::from("Network error (Stage 3)"));
    }
    let response = response.unwrap();
    {
        let mut content = std::io::Cursor::new(response.bytes().await.unwrap());
        let mut file = std::fs::File::create(crate::HOME_DIR.clone() + "tectonic_tmp.zip").unwrap();
        let result = std::io::copy(&mut content, &mut file);
        if result.is_err() {
            return utils::handle_void_error(String::from("File download error"));
        } else {
            log::info!("File download complete");
        }
    }
    // End downloading tectonic binary

    // Start extracting tectonic binary zip file
    let result = zip_extract::extract(std::io::Cursor::new(std::fs::read(crate::HOME_DIR.clone() + "/tectonic_tmp.zip").unwrap()), &std::path::PathBuf::from(crate::HOME_DIR.clone()), true);
    if result.is_err() {
        return utils::handle_void_error(String::from("File extraction error"));
    } else {
        log::info!("File extraction complete");
    }
    // End extracting tectonic binary zip file

    Ok(())
}