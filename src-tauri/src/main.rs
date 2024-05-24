
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


fn invert_matrix(matrix: Vec<Vec<f64>>) -> Res {
    if matrix.len() == 2 {
        let det: f64 = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        if det == 0.0{
            return Res::Msg(String::from("inverse matrix doesn't exist!"));
        }

        return Res::Matrix(vec![vec![matrix[1][1]/det, -matrix[0][1]/det], vec![-matrix[1][0]/det, matrix[0][0]/det]]);
    }

    let mut temp_matrix: Vec<Vec<f64>> = Vec::new();
    let det: f64 = {
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) as f64
    };

    if det == 0.0{
        return Res::Msg(String::from("inverse matrix doesn't exist!"));
    }

    temp_matrix.push(vec![(matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) as f64, -(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) as f64, (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) as f64]);
    temp_matrix.push(vec![-(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1]) as f64, (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) as f64, -(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0]) as f64]);
    temp_matrix.push(vec![(matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) as f64, -(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0]) as f64, (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) as f64]);

    let mut inverse_matrix: Vec<Vec<f64>> = vec![vec![0.0; 3]; 3];

    for i in 0..3 {
        for j in 0..3 {
            inverse_matrix[j][i] = temp_matrix[i][j] / det;
        }
    }

    return Res::Matrix(inverse_matrix);
}

enum Res {
    Matrix(Vec<Vec<f64>>),
    Msg(String)
}


#[tauri::command]
fn invert(mat: Vec<Vec<f64>>) -> String {
    let inverse = invert_matrix(mat);
    return match inverse {
        Res::Msg(s) => s,
        Res::Matrix(vec) => serde_json::to_string(&vec).unwrap()
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![invert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
