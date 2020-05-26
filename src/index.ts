import './shared/tailwind.css'
import './index.css'


const indexTempl = document.getElementById('indextemplate') as HTMLTemplateElement

document.querySelector('main').append(indexTempl.content.cloneNode(true))

document.getElementById('viewtoggle').onclick = () => {
  document.getElementById('datatable').classList.toggle('gridview')
}