const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fungsi untuk memeriksa apakah matriks adalah matriks nol
function isZeroMatrix(matrix) {
  return matrix.every((row) => row.every((element) => element === 0));
}

// Fungsi untuk memeriksa apakah matriks adalah matriks diagonal
function isDiagonalMatrix(matrix) {
  return matrix.every((row, i) =>
    row.every((element, j) => (i !== j ? element === 0 : true))
  );
}

// Fungsi untuk memeriksa apakah matriks adalah matriks identitas
function isIdentityMatrix(matrix) {
  return matrix.every((row, i) =>
    row.every((element, j) => (i === j ? element === 1 : element === 0))
  );
}

// Fungsi untuk memeriksa apakah matriks adalah matriks skalar
function isScalarMatrix(matrix) {
  if (!isDiagonalMatrix(matrix)) return false;
  const diagonalElement = matrix[0][0];
  return matrix.every((row, i) => row[i] === diagonalElement);
}

// Fungsi untuk memeriksa apakah matriks adalah matriks segitiga atas
function isUpperTriangularMatrix(matrix) {
  return matrix.every((row, i) =>
    row.every((element, j) => (i > j ? element === 0 : true))
  );
}

// Fungsi untuk memeriksa apakah matriks adalah matriks segitiga bawah
function isLowerTriangularMatrix(matrix) {
  return matrix.every((row, i) =>
    row.every((element, j) => (i < j ? element === 0 : true))
  );
}

// Fungsi untuk menghitung transpose matriks
function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

// Fungsi untuk menghitung determinan menggunakan metode Sarrus (hanya untuk matriks 3x3) dengan langkah-langkah
function determinantSarrus(matrix) {
  if (matrix.length !== 3 || matrix[0].length !== 3) {
    throw new Error("Metode Sarrus hanya untuk matriks 3x3");
  }

  const [a, b, c] = matrix[0];
  const [d, e, f] = matrix[1];
  const [g, h, i] = matrix[2];

  console.log("\n=== Langkah-langkah Metode Sarrus ===");
  console.log("Metode Sarrus digunakan untuk matriks 3x3.");
  console.log("Langkah-langkahnya sebagai berikut:");

  console.log("\n1. Kalikan diagonal utama (dari kiri atas ke kanan bawah):");
  console.log(`   (${a} * ${e} * ${i}) + (${b} * ${f} * ${g}) + (${c} * ${d} * ${h})`);
  const diagUtama = a * e * i + b * f * g + c * d * h;
  console.log(`   Hasil: ${diagUtama}`);

  console.log("\n2. Kalikan diagonal kedua (dari kanan atas ke kiri bawah):");
  console.log(`   (${c} * ${e} * ${g}) + (${a} * ${f} * ${h}) + (${b} * ${d} * ${i})`);
  const diagKedua = c * e * g + a * f * h + b * d * i;
  console.log(`   Hasil: ${diagKedua}`);

  console.log("\n3. Kurangi hasil diagonal kedua dari hasil diagonal utama:");
  const det = diagUtama - diagKedua;
  console.log(`   Determinan: ${det}`);

  return det;
}

// Fungsi untuk menghitung determinan menggunakan teorema Laplace dengan langkah-langkah
function determinantLaplace(matrix) {
  if (matrix.length !== matrix[0].length) {
    throw new Error("Matriks harus persegi");
  }

  if (matrix.length === 1) {
    console.log(`\nDeterminant Matriks 1x1: ${matrix[0][0]}`);
    return matrix[0][0];
  }

  if (matrix.length === 2) {
    const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    console.log(`\nDeterminant Matriks 2x2: (${matrix[0][0]} * ${matrix[1][1]}) - (${matrix[0][1]} * ${matrix[1][0]}) = ${det}`);
    return det;
  }

  console.log("\n=== Langkah-langkah Metode Laplace ===");
  console.log("Metode Laplace dapat digunakan untuk semua ukuran matriks persegi.");
  console.log("Langkah-langkahnya sebagai berikut:");

  let det = 0;
  const row = matrix[0];
  for (let j = 0; j < row.length; j++) {
    const element = row[j];
    const subMatrix = matrix.slice(1).map(r => r.filter((_, index) => index !== j));
    const cofactor = Math.pow(-1, j) * determinantLaplace(subMatrix);

    console.log(`\n1. Elemen matriks[0][${j}] = ${element}`);
    console.log("   Submatriks setelah menghapus baris 0 dan kolom " + j + ":");
    console.log(subMatrix.map(r => `[${r.join(", ")}]`).join("\n"));
    console.log(`   Kofaktor = (-1)^${j} * determinan submatriks = ${cofactor}`);

    det += element * cofactor;
    console.log(`   Determinan sementara: ${det}`);
  }

  console.log(`\n2. Determinan akhir: ${det}`);
  return det;
}

// Fungsi untuk penjumlahan matriks
function addMatrices(...matrices) {
  if (matrices.length < 2) {
    throw new Error("Minimal dua matriks diperlukan untuk penjumlahan");
  }

  const rows = matrices[0].length;
  const cols = matrices[0][0].length;

  if (
    !matrices.every(
      (matrix) => matrix.length === rows && matrix[0].length === cols
    )
  ) {
    throw new Error("Semua matriks harus memiliki ukuran yang sama");
  }

  return matrices[0].map((row, i) =>
    row.map((_, j) => matrices.reduce((sum, matrix) => sum + matrix[i][j], 0))
  );
}

// Fungsi untuk pengurangan matriks
function subtractMatrices(...matrices) {
  if (matrices.length < 2) {
    throw new Error("Minimal dua matriks diperlukan untuk pengurangan");
  }

  const rows = matrices[0].length;
  const cols = matrices[0][0].length;

  if (
    !matrices.every(
      (matrix) => matrix.length === rows && matrix[0].length === cols
    )
  ) {
    throw new Error("Semua matriks harus memiliki ukuran yang sama");
  }

  return matrices[0].map((row, i) =>
    row.map((_, j) =>
      matrices.reduce(
        (diff, matrix, index) =>
          index === 0 ? matrix[i][j] : diff - matrix[i][j],
        0
      )
    )
  );
}

// Fungsi untuk perkalian dua matriks
function multiplyTwoMatrices(matrix1, matrix2) {
  if (matrix1[0].length !== matrix2.length) {
    throw new Error(
      "Jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua"
    );
  }

  return matrix1.map((row) =>
    matrix2[0].map((_, j) =>
      row.reduce((sum, element, k) => sum + element * matrix2[k][j], 0)
    )
  );
}

// Fungsi untuk perkalian beberapa matriks
function multiplyMatrices(...matrices) {
  if (matrices.length < 2) {
    throw new Error("Minimal dua matriks diperlukan untuk perkalian");
  }

  return matrices.reduce((result, matrix) =>
    multiplyTwoMatrices(result, matrix)
  );
}

// Fungsi untuk meminta input matriks dari pengguna
function inputMatrix() {
    return new Promise((resolve) => {
      rl.question(
        "Masukkan jumlah baris dan kolom matriks (pisahkan dengan spasi): ",
        (dimensions) => {
          const dimensionArray = dimensions.split(" ").map(Number);
          
          // Cek apakah input valid (harus ada dua angka)
          if (dimensionArray.length !== 2 || dimensionArray.some(isNaN)) {
            console.log('Input tidak valid. Harap masukkan dua angka yang dipisahkan dengan spasi.');
            return inputMatrix().then(resolve); // Meminta input lagi
          }
  
          const [rows, cols] = dimensionArray;
          console.log(
            `Masukkan elemen matriks ${rows}x${cols} (pisahkan baris dengan Enter, elemen dengan spasi):`
          );
  
          const matrix = [];
          let currentRow = 0;
  
          const inputRow = () => {
            rl.question("", (rowInput) => {
              const row = rowInput.split(" ").map(Number);
              if (row.length !== cols) {
                console.log(`Jumlah elemen harus ${cols}. Coba lagi.`);
                inputRow();
              } else {
                matrix.push(row);
                currentRow++;
                if (currentRow < rows) {
                  inputRow();
                } else {
                  resolve(matrix);
                }
              }
            });
          };
  
          inputRow();
        }
      );
    });
  }
  

// Fungsi untuk meminta jawaban valid ("y" atau "n") dari pengguna
function askYesNo(question) {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question, (answer) => {
        const lowerAnswer = answer.toLowerCase();
        if (lowerAnswer === "y" || lowerAnswer === "n") {
          resolve(lowerAnswer);
        } else {
          console.log('Input tidak valid. Harap masukkan "y" atau "n".');
          ask();
        }
      });
    };
    ask();
  });
}

// Fungsi untuk menampilkan menu utama
async function displayMenu() {
  return new Promise((resolve) => {
    console.log("\n=== Menu Operasi Matriks ===");
    console.log("1. Tambah Matriks");
    console.log("2. Kurangi Matriks");
    console.log("3. Kalikan Matriks");
    console.log("4. Transpose Matriks");
    console.log("5. Hitung Determinan (Sarrus/Laplace)");
    console.log("6. Reset Matriks dan Mulai Ulang");
    console.log("7. Tentukan Jenis Matriks");
    console.log("8. Keluar");

    rl.question("Pilih operasi yang diinginkan (1-8): ", resolve);
  });
}

// Fungsi utama untuk menjalankan program
async function main() {
  let matrices = [];
  let continueInput = true;

  // Input matriks awal
  while (continueInput) {
    console.log(`\nMatriks ke-${matrices.length + 1}:`);
    const matrix = await inputMatrix();
    matrices.push(matrix);

    const answer = await askYesNo(
      "Apakah Anda ingin memasukkan matriks lagi? (y/n): "
    );
    continueInput = answer === "y";
  }

  let exit = false;

  // Menu operasi
  while (!exit) {
    const choice = await displayMenu();

    try {
      switch (choice) {
        case "1": // Tambah Matriks
          if (matrices.length < 2) {
            console.log("Anda perlu memasukkan minimal dua matriks untuk operasi ini.");
          } else {
            const result = addMatrices(...matrices);
            console.log("\nHasil Penjumlahan Matriks:");
            console.table(result);
          }
          break;

        case "2": // Kurangi Matriks
          if (matrices.length < 2) {
            console.log("Anda perlu memasukkan minimal dua matriks untuk operasi ini.");
          } else {
            const result = subtractMatrices(...matrices);
            console.log("\nHasil Pengurangan Matriks:");
            console.table(result);
          }
          break;

        case "3": // Kalikan Matriks
          if (matrices.length < 2) {
            console.log("Anda perlu memasukkan minimal dua matriks untuk operasi ini.");
          } else {
            const result = multiplyMatrices(...matrices);
            console.log("\nHasil Perkalian Matriks:");
            console.table(result);
          }
          break;

        case "4": // Transpose Matriks
          matrices.forEach((matrix, index) => {
            const result = transposeMatrix(matrix);
            console.log(`\nTranspose Matriks ${index + 1}:`);
            console.table(result);
          });
          break;

        case "5": // Hitung Determinan
          const detMethod = await new Promise((resolve) => {
            rl.question(
              "\nPilih metode perhitungan determinan (1: Sarrus, 2: Laplace): ",
              resolve
            );
          });

          matrices.forEach((matrix, index) => {
            if (matrix.length === matrix[0].length) {
              try {
                let det;
                if (detMethod === "1" && matrix.length === 3) {
                  det = determinantSarrus(matrix); // Dengan langkah-langkah
                } else if (detMethod === "2") {
                  det = determinantLaplace(matrix); // Dengan langkah-langkah
                } else {
                  console.log("Metode atau ukuran matriks tidak valid untuk metode Sarrus.");
                }
                if (det !== undefined) {
                  console.log(`\nDeterminan Matriks ${index + 1}: ${det}`);
                }
              } catch (error) {
                console.log(
                  `Tidak dapat menghitung determinan Matriks ${index + 1}: ${error.message}`
                );
              }
            } else {
              console.log(
                `Matriks ${index + 1} bukan matriks persegi, tidak dapat menghitung determinan.`
              );
            }
          });
          break;

        case "6": // Reset Matriks dan Mulai Ulang
          matrices = [];
          continueInput = true;

          while (continueInput) {
            console.log(`\nMatriks ke-${matrices.length + 1}:`);
            const matrix = await inputMatrix();
            matrices.push(matrix);

            const answer = await askYesNo(
              "Apakah Anda ingin memasukkan matriks lagi? (y/n): "
            );
            continueInput = answer === "y";
          }
          break;

          case "7":
        const matrixToCheck = matrices[matrices.length - 1];
        console.log("Memeriksa jenis matriks:");
        console.log("1. Matriks Nol");
        console.log("2. Matriks Diagonal");
        console.log("3. Matriks Identitas");
        console.log("4. Matriks Skalar");
        console.log("5. Matriks Segitiga Atas");
        console.log("6. Matriks Segitiga Bawah");

        const typeChoice = await new Promise((resolve) => {
          rl.question("Masukkan pilihan untuk jenis matriks: ", (answer) => resolve(answer));
        });

        switch (typeChoice) {
          case "1":
            console.log(
              isZeroMatrix(matrixToCheck)
                ? "Ini adalah matriks nol."
                : "Ini bukan matriks nol."
            );
            break;

          case "2":
            console.log(
              isDiagonalMatrix(matrixToCheck)
                ? "Ini adalah matriks diagonal."
                : "Ini bukan matriks diagonal."
            );
            break;

          case "3":
            console.log(
              isIdentityMatrix(matrixToCheck)
                ? "Ini adalah matriks identitas."
                : "Ini bukan matriks identitas."
            );
            break;

          case "4":
            console.log(
              isScalarMatrix(matrixToCheck)
                ? "Ini adalah matriks skalar."
                : "Ini bukan matriks skalar."
            );
            break;

          case "5":
            console.log(
              isUpperTriangularMatrix(matrixToCheck)
                ? "Ini adalah matriks segitiga atas."
                : "Ini bukan matriks segitiga atas."
            );
            break;

          case "6":
            console.log(
              isLowerTriangularMatrix(matrixToCheck)
                ? "Ini adalah matriks segitiga bawah."
                : "Ini bukan matriks segitiga bawah."
            );
            break;

          default:
            console.log("Pilihan tidak valid.");
            break;
        }
        break;

        case "8": // Keluar
          console.log("Terima kasih! Program dihentikan.");
          exit = true;
          rl.close();
          break;

        default:
          console.log("Pilihan tidak valid. Coba lagi.");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }
}

// Menjalankan program
main();
