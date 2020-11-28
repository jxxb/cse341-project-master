const ul = document.getElementById('avengers');
const button = document.getElementById('button');
const addButton = document.getElementById('add-button');
const socket = io();

button.addEventListener('click', async () => {
   fetch('/prove11/fetchAll').then((res) => {
      return res.json();
   }).then(data => {
      console.log(data);
         const newArray = data.avengers.map(item => `
         <li>${item.name}
         ${item.power}</li>
         `);
         ul.innerHTML = newArray.join();
   }).catch(err => {
      console.log(err);
   }); 
});

addButton.addEventListener('click', async () => {
   const name = document.getElementById('name').value;
   const power = document.getElementById('power').value;
   console.log(name);
   const data = {name: name, power: power};
   socket.emit('new name',data);

   fetch('/prove11/insert',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name,power: power})
   }).then((res) => {
      return res.json();
   }).then(data => {
      console.log(data);
         const newArray = data.avengers.map(item => `
         <li>${item.name}
         ${item.power}</li>
         `);
         ul.innerHTML = newArray.join();
   }).catch(err => {
      console.log(err);
   });
});

socket.on('new name', msg => {
   fetch('/prove11/fetchAll').then((res) => {
      return res.json();
   }).then(data => {
      console.log(data);
         const newArray = data.avengers.map(item => `
         <li>${item.name}
         ${item.power}</li>
         `);
         ul.innerHTML = newArray.join();
   }).catch(err => {
      console.log(err);
   }); 
});