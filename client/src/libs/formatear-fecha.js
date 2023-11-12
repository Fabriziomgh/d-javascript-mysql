export const formatDate = (date) => {
   const fechaCreacion = new Date(date);
   const dia = fechaCreacion.getDate();
   const mes = fechaCreacion.getMonth() + 1;
   const año = fechaCreacion.getFullYear();
   return `${dia}/${mes}/${año}`;
};
