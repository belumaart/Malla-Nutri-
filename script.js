// Definición de la estructura curricular
const estructura = {
  "Primer Año": {
    "I Semestre": [
      "Curso Introductorio",
      "Bases Biológicas de la nutrición humana",
      "Química Alimentaria",
      "Fundamentos de la nutrición humana",
      "Metodología de las practicas articuladoras"
    ],
    "II Semestre": [
      "Bioquímica nutricional",
      "Normativa alimentaria",
      "Seguridad alimentaria nutricional y soberanía alimentaria",
      "Administración aplicada al ejercicio de la profesión",
      "Práctica articuladora I"
    ]
  },
  "Segundo Año": {
    "III Semestre": [
      "Diagnóstico y evaluación del estado nutricional",
      "Nutrición y alimentación en el ciclo de la vida",
      "Salud pública",
      "Bioestadística y métodos de investigación",
      "Práctica articuladora II"
    ],
    "IV Semestre": [
      "Producción e industrialización de alimentos",
      "Transformaciones físico- química de los alimentos",
      "Epidemiologia nutricional",
      "Educación en alimentación y nutrición Fundamentos y praxis",
      "Práctica articuladora III"
    ]
  },
  "Tercer Año": {
    "V Semestre": [
      "Ética de la alimentación",
      "Nutrición poblacional",
      "Diseño de alimentos",
      "Nutrición clínica I",
      "Práctica articuladora IV"
    ],
    "VI Semestre": [
      "Nutrición Clínica II",
      "Gestión de servicios de alimentación colectiva",
      "Práctica articuladora V"
    ]
  },
  "Cuarto Año": {
    "VII Semestre": [
      "Práctica profesional"
    ]
  }
};

// Cargar materias aprobadas del navegador
let aprobadas = JSON.parse(localStorage.getItem("materias_aprobadas") || "[]");

// Guardar estado en el navegador
function guardarEstado() {
  localStorage.setItem("materias_aprobadas", JSON.stringify(aprobadas));
}

// Renderizar la malla curricular
function crearMalla() {
  const contenedor = document.getElementById("malla-container");
  contenedor.innerHTML = "";

  for (const [anio, semestres] of Object.entries(estructura)) {
    for (const [semestre, materias] of Object.entries(semestres)) {
      const divSemestre = document.createElement("div");
      divSemestre.className = "semestre";

      const titulo = document.createElement("h2");
      titulo.textContent = `${anio} - ${semestre}`;
      divSemestre.appendChild(titulo);

      const contRamos = document.createElement("div");
      contRamos.className = "ramos";

      for (const nombre of materias) {
        const id = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "_").replace(/[^\w_]/g, "");

        const cuadro = document.createElement("div");
        cuadro.className = "ramo";
        cuadro.textContent = nombre;

        if (aprobadas.includes(id)) {
          cuadro.classList.add("aprobado");
        }

        cuadro.addEventListener("click", () => {
          if (aprobadas.includes(id)) {
            aprobadas = aprobadas.filter(x => x !== id);
          } else {
            aprobadas.push(id);
          }
          guardarEstado();
          crearMalla(); // Recargar para aplicar clases
        });

        contRamos.appendChild(cuadro);
      }

      divSemestre.appendChild(contRamos);
      contenedor.appendChild(divSemestre);
    }
  }
}

// Inicializar
crearMalla();
