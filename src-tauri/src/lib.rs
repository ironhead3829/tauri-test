use std::sync::Mutex;
use tauri::State;

struct Counter(Mutex<i32>);

#[tauri::command]
fn increment(counter: State<'_, Counter>) -> i32 {
    let mut value = counter.0.lock().unwrap();
    *value += 1;
    *value
}

#[tauri::command]
fn decrement(counter: State<'_, Counter>) -> i32 {
    let mut value = counter.0.lock().unwrap();
    *value -= 1;
    *value
}


#[tauri::command]
fn reset(counter: State<'_, Counter>) -> i32 {
    let mut value = counter.0.lock().unwrap();
    *value = 0;
    *value
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Counter(Mutex::new(0))) 
        .invoke_handler(tauri::generate_handler![
            increment,
            decrement,
            reset
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
