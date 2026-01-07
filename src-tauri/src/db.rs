use tauri::AppHandle;
use tauri::Manager;
use sled::Db;
use std::fs;

pub struct AppState {
    pub db: Db,
}

impl AppState {
    pub fn new(app: &AppHandle) -> Self {
        let app_data_dir = app.path().app_data_dir().expect("failed to get app data dir");
        
        if !app_data_dir.exists() {
            fs::create_dir_all(&app_data_dir).expect("failed to create app data dir");
        }

        let db_path = app_data_dir.join("my_db");
        let db = sled::open(db_path).expect("failed to open sled db");

        Self { db }
    }
}
