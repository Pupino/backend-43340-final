let userId;
//users list
const buttons = document.querySelectorAll('.userBtn');

buttons.forEach((btn) => {
  btn.addEventListener('click', function handleClick(event) {
    var host = window.location.hostname;
    userId = this.id;
    window.location.href = `https://${host}/api/users/${userId}`;
  });
});
/////////////////////////////////////////////////////////////////////////
//specific user
//Switch to Premium
const switchBtn = document.querySelectorAll('.switchBtn');

switchBtn.forEach((btn) => {
  btn.addEventListener('click', function handleClick(event) {
    userId = this.id;
    switchPremium();
  });
});

const switchPremium = async () => {
  var host = window.location.hostname;
  const response = await fetch(
    `https://${host}/api/users/premiumSwitch/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const userJson = await response.json(); //extract JSON from the http response
  window.location.href = `https://${host}/api/users/${userId}`;
};

//delete
const deleteBtn = document.querySelectorAll('.deleteBtn');

deleteBtn.forEach((btn) => {
  btn.addEventListener('click', function handleClick(event) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas ejecutar esta acción?'
    );
    if (confirmacion) {
      userId = this.id;
      deleteUser();
    }
  });
});

const deleteUser = async () => {
  var host = window.location.hostname;
  const response = await fetch(`https://${host}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const userJson = await response.json(); //extract JSON from the http response
  window.location.href = `https://${host}/api/users`;
};
