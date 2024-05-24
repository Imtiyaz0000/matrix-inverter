import { invoke } from "@tauri-apps/api/tauri";

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
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".invert-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    inverter();
  });
});
