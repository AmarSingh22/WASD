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

async function navigate(title, url){
  document.title = title;
  let content = document.querySelector('#Details');
  if(url === null){
    content.innerHTML = "";
  }else{
    let response = await fetch(url);//fetch another page eg battery.html
    content.innerHTML = await response.text();
    executeScripts();
  }
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
    <td><input type="number" id="quantity${i}" value="Cart[${i}].qty" >
    <button onclick="countUp(${i})">+</button>
    <button onclick="countDown(${i})">-</button>
    <button onclick="removeDessert(${i})">x</button></td>
    </tr>`
    i++;
  }
  html += `<tr><td></td> <td></td> 
  <td><button onclick="Order()">Order items</button></td>
  </tr></tbody></table>`;
  result.innerHTML = html;
}

function Order(){
  let result = document.querySelector('#Details');

  let html = `<div class="row">
  <form id="myForm" class="col s12" >
    <div class="row">
      <div class="input-field col s12">
        <input name="Username" type="text"  required>
        <label for="Username">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input name="Address" type="text"  required>
        <label for="Address">Address</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input name="Number" type="tel" required>
        <label for="Number">Phone Number</label>
      </div>
    </div>
              
    <div class="row">
      <div class="col">
        <input type="submit" class="btn waves-effect waves-light blue" value="Order" required/>
      </div>
    </div>
   
  </form>
</div>`;

  result.innerHTML = html;
}

  /*function submit(event){
  event.preventDefault();
    
  const myForm = event.target;
  const formData = new FormData(form);//get form data
  const data = Object.fromEntries(formData);//convert form data to object

  postData('https://wasd-bakery.herokuapp.com/nc/wasd_bakery_h7p8/api/v1/Purchase', data);
  }

  document.forms['myForm'].addEventListener('submit', submit);

  async function postData(url, data){
  let Products = '';
  let Total = 0;
  for(let item of Cart){
    Products += `${item.qty} ${item.id}, `; 
    Total += (item.qty * item.cost);
  }
  data.Products =Products;
  data.Total = Total;
  try{
      let response = await fetch(
        url, 
        {
            method: 'POST',
            body: JSON.stringify(data),
          headers: { 'Content-Type':'application/json', 'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXJkc2luZ2gyMEBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjQ4NDI0NTMyfQ.s0d2BGWl5J0PRCUy5Q6n7SYG5La0wIudSlfFtFSkfLY' }
        },
      );
      
      let result = await response.text();
      console.log(result);
    
    }catch(error){
      console.log(error);
  }
  }
  */
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
