import { invoke } from "@tauri-apps/api/tauri";

function isJsonArray(jsonString: string): boolean {
  try {
    const parsedValue = JSON.parse(jsonString);
    return Array.isArray(parsedValue);
  } catch (error) {
    return false;
  }
}

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
  //const display = document.querySelector(".display-wrapper");
  const msg = document.querySelector(".msg");
  if (typeof(result) == "string" && msg != null) {
    if (isJsonArray(result)) {
      msg.textContent = "";
      result = JSON.parse(result);
      console.log(result);
      // @ts-ignore
      document.querySelector(".or1c1").textContent = result[0][0].toFixed(4);
      // @ts-ignore
      document.querySelector(".or1c2").textContent = result[0][1].toFixed(4);
      // @ts-ignore
      document.querySelector(".or1c3").textContent = result[0][2].toFixed(4);
      // @ts-ignore
      document.querySelector(".or2c1").textContent = result[1][0].toFixed(4);
      // @ts-ignore
      document.querySelector(".or2c2").textContent = result[1][1].toFixed(4);
      // @ts-ignore
      document.querySelector(".or2c3").textContent = result[1][2].toFixed(4);
      // @ts-ignore
      document.querySelector(".or3c1").textContent = result[2][0].toFixed(4);
      // @ts-ignore
      document.querySelector(".or3c2").textContent = result[2][1].toFixed(4);
      // @ts-ignore
      document.querySelector(".or3c3").textContent = result[2][2].toFixed(4);
    } else {
      msg.textContent = result;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".invert-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    inverter();
  });
});

