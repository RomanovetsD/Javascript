const country = prompt('Выбирите доставку товара в вашу страну: китай, южная америка, австралия, индия, ямайка ');
let price;
let message;

if (country === null) {
  alert('Отменено пользователем!');
} else {
  const countryLowerCase = country.toLowerCase();

  switch (countryLowerCase) {
    case 'китай':
      price = 100;
      message = `Доставка в ${countryLowerCase} будет стоить ${price} кредитов`;
      alert(message);
      break;
    case 'южная америка':
      price = 250;
      message = `Доставка в ${countryLowerCase} будет стоить ${price} кредитов`;
      alert(message);
      break;
    case 'австралия':
      price = 170;
      message = `Доставка в ${countryLowerCase} будет стоить ${price} кредитов`;
      alert(message);
      break;
    case 'индия':
      price = 80;
      message = `Доставка в ${countryLowerCase} будет стоить ${price} кредитов`;
      alert(message);
      break;
    case 'ямайка':
      price = 120;
      message = `Доставка в ${countryLowerCase} будет стоить ${price} кредитов`;
      alert(message);
      break;
    default:
      alert('В вашей стране доставка не доступна');
  }
}