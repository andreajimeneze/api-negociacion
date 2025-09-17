export function generarSlug(name) {
  return name
    .normalize("NFD")                        // separa letras de tildes
    .replace(/[\u0300-\u036f]/g, "")        // elimina las tildes
    .replace(/[^a-zA-Z0-9ñÑ_\s-]/g, "")     // elimina caracteres no válidos (mantiene ñ, guiones)
    .trim()
    .replace(/\s+/g, "-")                   // reemplaza espacios por guiones
    .toLowerCase();
}


