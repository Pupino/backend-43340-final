const protocol = window.location.protocol;
const host = window.location.host;
let cartId;
let prodId;
document.addEventListener('DOMContentLoaded', function (event) {
  const createCart = async () => {
    const response = await fetch(`${protocol}//${host}/api/carts`, {
      method: 'POST',
      //body: myBody, // string or object
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const cartJson = await response.json(); //extract JSON from the http response
    cartId = cartJson.data.id;
  };
  createCart();
});

//add to cart
const buttons = document.querySelectorAll('.addCartBtn');

buttons.forEach((box) => {
  box.addEventListener('click', function handleClick(event) {
    prodId = this.id;
    addProdToCart();
  });
});

const addProdToCart = async () => {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.style.display = 'flex'; // Muestra el modal
  const data = { quantity: 1 };
  const response = await fetch(
    `${protocol}//${host}/api/carts/${cartId}/products/${prodId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // string or object
    }
  );
  const cartJson = await response.json(); //extract JSON from the http response
  modalOverlay.style.display = 'none'; // Oculta el modal una vez que se complete la llamada
  alert('You have added 1 unit to Cart');
};

//check cart
const cartBtn = document.getElementById('cartBtn');
cartBtn.addEventListener('click', function handleClick(event) {
  window.location.href = `${protocol}//${host}/api/carts/${cartId}`;
});

//delete
const deleteBtn = document.querySelectorAll('.deleteBtn');

deleteBtn.forEach((btn) => {
  btn.addEventListener('click', function handleClick(event) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas eliminar este Producto?'
    );
    if (confirmacion) {
      prodId = this.id;
      deleteProduct();
    }
  });
});

const deleteProduct = async () => {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.style.display = 'flex'; // Muestra el modal
  const response = await fetch(`${protocol}//${host}/api/products/${prodId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const prodJson = await response.json(); //extract JSON from the http response
  //modalOverlay.style.display = 'none'; // Oculta el modal una vez que se complete la llamada
  window.location.href = `${protocol}//${host}/api/products`;
};
