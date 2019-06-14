const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
while (true) {
  input = prompt('Введите пароль', '');
  if (input === null) {
    alert('Отменено пользователем!');
    break;
  }
  else if (passwords.includes(input)) {
    alert('Добро пожаловать!');
    break;
  }
  else if (input !== null) {
    attemptsLeft -= 1;
    alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток!`);
  }
  if (attemptsLeft === 0) {
    alert('У вас закончились попытки, аккаунт заблокирован!');
  }
}
