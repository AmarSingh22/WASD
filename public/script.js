const tabs = M.Tabs.init(document.querySelector('.tabs'));


// All code for the AddToCart feature
const Cart = [];

//function to use with a button
function AddCart(id, name, cost){
  let purchase = {
    "id":id,
    "name": `${name}`,
    "cost":cost,
    "qty": 1
  };

  Cart.push(purchase);
}

//functions for cart list
function countUp(i) {
  let quantity = document.getElementById(`quantity${i}`);
  quantity.value = ++Cart[i].qty;
}
function countDown(i) {
  let quantity = document.getElementById(`quantity${i}`);
  quantity.value = --Cart[i].qty;

}
function removeDessert(j){
  for(let i = j; i < Cart.length -1; i++){
    Cart[i] = Cart[i+1]
  }
  Cart.pop();

  showCart();
}

//function to use with a button to show cart, use the Id cart where you want the Cart to display
function showCart(){
  let result = document.querySelector('#Details');
  let html = '<table><thead> <th>Product</th><th>Price</th><th>Quantity</th> </thead><tbody>';
  let i = 0;

  for(let item of Cart){

    html += `<tr>
    <td>${item.name}</td>
    <td>$${item.cost}</td>
    <td><input type="number" id="quantity${i}" value="Cart[${i}].qty">
    <button onclick="countUp(${i})">+</button>
    <button onclick="countDown(${i})">-</button>
    <button onclick="removeDessert(${i})">x</button></td>
    </tr>`
    i++;
  }
  html += `<tr><td></td> <td></td> 
  <td><button onclick="Order()"></button></td>
  </tr></tbody></table>`;
  result.innerHTML = html;
}

function showHome(){
  let result = document.querySelector('#Details');

  let html = `<image id="Home-Img" src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2Rlc3NlcnRzLXVwZGF0ZS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH0sInRvRm9ybWF0IjoiYXZpZiJ9fQ==" alt='Desserts'> 
  <p id="Home-p">WASD's Bakery has established itself as being the Caribbean's bakery of choice by passionately providing our customers daily 
  with quality products, heartfelt service and an enjoyable experience at unbeatable value.</p>`;
  result.innerHTML = html;
}
function showContact(){
  let result = document.querySelector('#Details');

  let html = " Test 1";
  result.innerHTML = html;
}
function Order(){
  
}

//Prints the data, use the id Details where you want the details
// eg. <div id="Details"> </div>
function PrintDetails(item){
  let result = document.querySelector('#Details');
  let html = `<image src='${item.Image}' alt='${item.Name}'>
      <h4>${item.Name}</h4>
      <p> Cost: $${item.Cost} <br> This dessert contains: ${item.Ingredients} <br></p>
     `;
     if(item.Vegan === 'true') html += `<span class="Info">Vegan </span>`;
     if(item.LactoseFree === 'true') html += `<span class="Info">Lactose Free </span>`;
     if(item.GlutenFree === 'true') html += `<span class="Info">Gluten Free </span>`;

     html+= `<br><button class="Cart" onclick="AddCart(${item.id}, '${item.Name}', ${item.Cost})">Add to Cart</button>`

  result.innerHTML= html;
}

async function getDetails(id){
  try{
    let response = await fetch(
      `https://wasd-bakery.herokuapp.com/nc/wasd_bakery_h7p8/api/v1/Desserts/${id}`,
      {
      method: 'GET',
      headers: {'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXJkc2luZ2gyMEBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjQ4NDI0NTMyfQ.s0d2BGWl5J0PRCUy5Q6n7SYG5La0wIudSlfFtFSkfLY'}
     }, 
      );
    let result = await response.json();
    PrintDetails(result);
 }catch(e){
     console.log(e);
 }
}

//Prints the list of desserts, use ID list for where your want the list
// eg. <ul id="List"> </ul>
function drawlist(data, Place){
  let result = document.querySelector(Place);
  let html = '';

  for(let item of data){
    html += `<li><a href="#Details" class="Listings" onclick="getDetails('${item.id}')">${item.Name}</a></li>`;
  }
  result.innerHTML= html;
}

//gets the data from our api
async function getData(Place){
   try{
     let response = await fetch(
       "https://wasd-bakery.herokuapp.com/nc/wasd_bakery_h7p8/api/v1/Desserts",
       {
       method: 'GET',
       headers: {'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXJkc2luZ2gyMEBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjQ4NDI0NTMyfQ.s0d2BGWl5J0PRCUy5Q6n7SYG5La0wIudSlfFtFSkfLY'}
      }, 
       );
     let result = await response.json();
     drawlist(result,Place);
  }catch(e){
      console.log(e);
  }
}
getData("#List");
