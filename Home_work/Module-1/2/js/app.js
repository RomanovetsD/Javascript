const credits = 23580;
const pricePerDroid = 3000;


let numberDroid = prompt("Какое количество дроидов Вы желаете купить?");
let totalPrice = numberDroid * pricePerDroid;
let restCredits = credits - totalPrice;

if (numberDroid === null) {
	alert('Отменено пользователем!');
}

else if (totalPrice > credits) {
	alert('Недостаточно средст на счету!');
}

else {
    alert(`Вы купили ${numberDroid} дроидов, на счету осталось ${restCredits} кредитов!`);
}