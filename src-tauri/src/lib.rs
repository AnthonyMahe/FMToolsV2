use tauri::Manager;
mod commands;
mod db;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();

    // Specta Plugin Setup
    #[cfg(debug_assertions)]
    let specta_builder =
        {
            let specta_builder = tauri_specta::Builder::<tauri::Wry>::new().commands(
                tauri_specta::collect_commands![commands::save_key, commands::get_key],
            );
            specta_builder
        };

    builder
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let handle = app.handle();
            let state = db::AppState::new(handle);
            app.manage(state);

            // Generate bindings on startup (optional, better in a dedicated build step)
            #[cfg(debug_assertions)]
            {
                // let _ = specta_builder.path("../src/bindings.ts").export();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::save_key,
            commands::get_key
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
