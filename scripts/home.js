import axios from "axios";
import { getUserInfo } from "../apis/services/user.service";
import { getSessionToken } from "../libs/session-manager";

async function main() {
  try {
    const response = await getUserInfo();
    const userName = response.data.username;
    document.getElementById("username").textContent = `Welcome, ${userName}!`;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
main();

function greetUser() {
  const now = new Date();
  const hour = now.getHours();

  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning👋 ";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good night👋";
  }

  document.getElementById("greeting").textContent = greeting;
}

greetUser();

async function getProduct() {
  const token = getSessionToken();
  try {
    const response = await axios.get(
      "http://localhost:3000/sneaker?page=1&limit=50",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    const products = response.data.data;
    console.log(products);
    const container = document.getElementById("product-container");
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}" class = "rounded-2xl">
            <h1>${product.name}</h1>
            <p>${product.price}$</p>
            `;
      productDiv.addEventListener("click", () => {
        displayProductDetails(product.id);
      });
      container.appendChild(productDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

async function displayProductDetails(productId) {
  const token = getSessionToken();
  try {
    const response = await axios.get(
      `http://localhost:3000/sneaker/item/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const product = response.data;

    const productInfoPage = window.open("product");
    productInfoPage.document.write(`
      <html>
        <head>
          <title>${product.name}</title>
          <link rel="stylesheet" href="style/product.css">
        </head>
        <body>
          <img src="${product.imageURL}" alt="${product.name}" class ="flex justify-center">
          <div>
          <h1 class="font-sans ">${product.name}</h1>
         <button class="bg-neutral-300 rounded-lg">5,731 sold</button> 
         </div>
          <h2 class="font-sans">description</h2>
          <h5 class ="discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime repellendus veritatis saepe laudantium tempore rerum nostrum, error aliquid fuga corporis itaque dolor laboriosam iste dolores neque fugit mollitia quas doloremque?</h5>
          <p>Price: ${product.price}$</p>
          
        </body>
      </html>
    `);

    productInfoPage.document.close();
  } catch (error) {
    console.log(error);
  }
}

getProduct();

