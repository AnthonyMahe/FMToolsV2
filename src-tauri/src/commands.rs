use crate::db::AppState;
use tauri::{State, Window};
use specta::specta;

#[tauri::command]
#[specta]
pub fn save_key(state: State<AppState>, key: String, value: String) -> Result<(), String> {
    state.db.insert(key, value.as_bytes()).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
#[specta]
pub fn get_key(state: State<AppState>, key: String) -> Result<Option<String>, String> {
    let res = state.db.get(key).map_err(|e| e.to_string())?;
    match res {
        Some(ivec) => {
            let s = String::from_utf8(ivec.to_vec()).map_err(|e| e.to_string())?;
            Ok(Some(s))
        },
        None => Ok(None)
    }
}
