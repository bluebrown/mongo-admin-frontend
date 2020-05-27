import './shared/styles/tailwind.css'
import './index.css'


let gb = document.getElementById('gridbutton')
let lb = document.getElementById('listbutton')
let t = document.getElementById('datatable')


lb.onclick = () => {
  lb.classList.add('active')
  gb.classList.remove('active')
  t.classList.remove('gridview')

}
gb.onclick = () => {
  gb.classList.add('active')
  lb.classList.remove('active')
  t.classList.add('gridview')

}