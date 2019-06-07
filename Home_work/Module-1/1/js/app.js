const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message = prompt("Введите пароль доступа!");

if (message === ADMIN_PASSWORD) {
    alert('Добро пожаловать!');
}

else if (message === null) {
	alert('Отменено пользователем!');
}

else {
    alert('Доступ запрещен, неверный пароль!');
}