import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'

// Alto de la pantalla en px, para el hero y la foto de fondo fija.
// En algunos navegadores (Opera en iPhone) la ventana cambia de alto cada vez que la barra
// aparece o se esconde al deslizar; con unidades svh/lvh, el hero saltaba y la foto se reescalaba.
// Por eso se mide al cargar y solo se vuelve a medir si cambia el ANCHO (girar el móvil,
// redimensionar la ventana en el ordenador), nunca por la barra, que solo cambia el alto.
let lastWidth = 0

function setScreenHeight(): void {
  lastWidth = window.innerWidth
  document.documentElement.style.setProperty('--screen-height', `${window.innerHeight}px`)
}

setScreenHeight()
window.addEventListener('resize', () => {
  if (window.innerWidth !== lastWidth) setScreenHeight()
})

createApp(App).mount('#app')
