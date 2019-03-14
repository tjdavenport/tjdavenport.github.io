const menu = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const list = document.querySelector('#sidebar .lined');

menu.onclick = e => {
  sidebar.classList.toggle('open');
  menu.classList.toggle('open');

  if (sidebar.classList.contains('open')) {
    sidebar.style.height = list.offsetHeight+'px';
  } else {
    sidebar.style.height = '0px';
  }
};
