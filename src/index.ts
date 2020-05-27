import './shared/styles/tailwind.css'
import './index.css'


document.getElementById('viewtoggle').onclick = () => {
  document.getElementById('datatable').classList.toggle('gridview')
}