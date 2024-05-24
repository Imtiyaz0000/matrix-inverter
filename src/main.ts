import { invoke } from "@tauri-apps/api/tauri";

/*function matrixToString(matrix: number[][]): string {
  let result = '';
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result += matrix[i][j].toString() + '\t'; // Separate each element by a tab
    }
    result += '\n'; // Move to the next line after each row
  }
  return result;
}*/

async function inverter() {
  let container = document.querySelector(".container");
  let matrix: string[][] = []
  // @ts-ignore
  Array.from(container.children).forEach((row) => {
    let rowMat: string[] = [];
    Array.from(row.children).forEach((col) => {
      // @ts-ignore
      rowMat.push(Number(col.value));
    });
    matrix.push(rowMat);
  });
  let result: string | number[][] = await invoke("invert", {
    mat: matrix,
  });
  const display = document.querySelector(".display");
  if (typeof(result) == "string") {
    // @ts-ignore
    display.textContent = result;
  } else {
    // @ts-ignore
    display.innerHTML = `
[${result[0][0]}][${result[0][1]}][${result[0][2]}]
[${result[1][0]}][${result[1][1]}][${result[1][2]}]
[${result[2][0]}][${result[2][1]}][${result[2][2]}]
`;
  }
  /*if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }*/
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".invert-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    inverter();
  });
});
