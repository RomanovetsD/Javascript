const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
/* Функция isLoginValid(login), проверка количества символов параметра login.
Вернет true или false, попадает ли длина параметра в заданный диапазон
от 4-х до 16-ти символов включительно. */
const isLoginValid = function (login) {
  const passed = login.length >= 4 && login.length <= 16;
  if (passed) {
    return true;
  }
  console.log('Ошибка! Логин должен быть от 4 до 16 символов');

  return false;
};

/* Функция isLoginUnique(allLogins, login), которая принимает список всех логинов и добавляемый логин
 как параметры и проверяет наличие login в массиве allLogins,
 возвращая true если такого логина еще нет и false если логин уже используется. */
const isLoginUnique = function (allLogins, login) {
  const isInclude = allLogins.includes(login);
  if (!isInclude) {
    return true;
  }
  console.log('Такой логин уже используется!');
  return false;
};

/* Функция addLogin добавляет или не добавляет логин в массив.
При этом для проверок условия добавления использует результаты
вызовов других функций - isLoginUnique и isLoginValid. */
const addLogin = function (allLogins, login) {
  const passed = isLoginValid(login) && isLoginUnique(allLogins, login);
  if (passed) {
    allLogins.push(login);
    console.log('Логин успешно добавлен!');
  }
};

// Вызовы функции для проверки
addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'Zd'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
