const json = () => {
   fetch('https://pr0ve.herokuapp.com//prove10/fetchAll').then((res) => {
      return res.json();
   }).then(data => {
      console.log(data);
      return data;
   }).catch(err => {
      console.log(err);
   });

};

console.log('script');

const ul = document.getElementById('avengers');
const button = document.getElementById('button');
const addButton = document.getElementById('add-button');

button.addEventListener('click', async () => {
   fetch('https://pr0ve.herokuapp.com/prove10/fetchAll').then((res) => {
      return res.json();
   }).then(data => {
      console.log(data);
         const newArray = data.avengers.map(item => `
         <li>${item.name}</li>
         `);
         ul.innerHTML = newArray.join();
   }).catch(err => {
      console.log(err);
   }); 
});

addButton.addEventListener('click', async () => {
   const name = document.getElementById('name').value;
   console.log(name);
   fetch('https://pr0ve.herokuapp.com/prove10/insert',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name})
   }).then((res) => {
      console.log(res);
   }).catch(err => {
      console.log(err);
   });
});