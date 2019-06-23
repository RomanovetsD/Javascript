let input;
const numbers = [];
let total = 0;
do {
  input = prompt('Введите число', '');
  numbers.push(Number(input));
} while (input !== null);
for (let i = 0; i < numbers.length; i += 1) {
  total += numbers[i];
}
const message = `Общая сумма чисел равна ${total}`;
console.log(message);
