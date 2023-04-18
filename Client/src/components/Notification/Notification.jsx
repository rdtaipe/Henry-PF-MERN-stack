
import Swal  from 'sweetalert2'

/* 
Esta función se llama Notify y acepta cuatro parámetros:


tipo: info, warning, error, o success.
mensaje: el mensaje que deseas mostrar al usuario.
tiempo: el tiempo que deseas que el mensaje se muestre antes de desaparecer, en milisegundos.
posicion:  top, top-start, top-end, center, center-start, center-end, bottom, bottom-start, o bottom-end.

*/

export function Notification(type, message, position, time) {
  let icon,background,color,iconColor;



  switch (type) {
    case 'success':
      icon = 'success';
      background = '#c8e6c9';
      color = '#1b5e20';
      iconColor = '#1b5e20';
      break;
    case 'info':
      icon = 'info';
      background = '#bbdefb';
      color = '#01579b';
      iconColor = '#01579b';
      break;
    case 'warning':
      icon = 'warning';
      background = '#f0f4c3';
      color = '#f57f17';
      iconColor = '#e65100';
      break;
    case 'error':
      icon = 'error';
      background = '#ffcdd2';
      color = '#c62828';
      iconColor = '#c62828';
      break;
    case 'question':
      icon = 'question';
      background = '#cfd8dc';
      color = '#7b1fa2';
      iconColor = '#7b1fa2';
      break;
    default:
      icon = 'success';
      background = '#c8e6c9';
      color = '#1b5e20';
      iconColor = '#1b5e20';
  }

  Swal.fire({
    toast: true,
    position: position,
    icon: icon,
  
    title: message,
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    iconColor: iconColor,
    background: background,
    color: color,

    didOpen: (toast) => {
      toast.style.zIndex = 9999;
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
 /*   style: {
      zIndex: 9999,
      width: '3rem', // Cambiar el ancho de la ventana
      padding: '5px', // Cambiar el espaciado interno de la ventana
      background: '#fff', // Cambiar el color de fondo de la ventana
      border: '2px solid #ccc', // Cambiar el borde de la ventana
      borderRadius: '5px', // Cambiar el radio de la esquina de la ventana
      boxShadow: 'none', // Eliminar la sombra de la ventana
      'font-size': '16px', // Cambiar el tamaño de fuente de la ventana
    },  */
  });
}

