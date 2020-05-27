import './shared/styles/tailwind.css';
import './index.css';


const gb = document.getElementById('gridbutton');
const lb = document.getElementById('listbutton');
const t = document.getElementById('datatable');

lb.onclick = () => {
  lb.classList.add('active');
  gb.classList.remove('active');
  t.classList.remove('gridview');
};

gb.onclick = () => {
  gb.classList.add('active');
  lb.classList.remove('active');
  t.classList.add('gridview');
};
