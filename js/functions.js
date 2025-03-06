// //function declaration - может работать после вызова (но на практике лучше так не делать)
// function someFunc (a = 1 - у параметров могут быть дефолтные значения - обязательные параметры вначале, b = 'text' - необязательные в конце - порядок вывода) {
//   тело функции
// console.log(a + b); - вызывать
// или
// retern a + b; - возвращать
// }

//параметр по отношению к функции это обычная переменная


// //function expression - вначале объявляется функция, потом вызывается
// var someFunc1 = function () {
// return
// };


// //стрелочная натация функции
// const someFunc1 = () => {

// };


// сокращенная стрелочная натация функции для число строка массив
// const someFunc1 = (a, b) => a + b;


// someFunc(); - вызов функции


// число строка массив
// для объекта особенность - из стрелочной функции без указания ретерна вернуть объект, то обернуть в круглые скобки ({})


//Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.

//var 1
// function checkLength (string, maxSimbols) {
//   if (string.length <= maxSimbols) {
//     return true;
//   }
// }
// checkLength ();

//var 2
// const checkLength = function (string, maxSimbols) {
//   return string.length <= maxSimbols;
// };

//var3
const checkLength = (string, maxSimbols) => string.length <= maxSimbols;

checkLength("Привет!", 3);


//Функция для проверки, является ли строка палиндромом
const checkStringPalindrome = function (polindromString) {
  const normalString = polindromString.replaceAll(' ', '').toUpperCase();
  let reversString = '';

  for (let i = normalString.length - 1; i >= 0 ; i--) {
    reversString += normalString.at(i);
  }

  return reversString === normalString;
};

checkStringPalindrome("");


//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN
// имяФункции(2023); // 2023
// имяФункции(-1);   // 1
// имяФункции(1.5);  // 15
// Для решения этой задачи вам пригодятся:

// цикл — для перебора полученной строки,
// функция parseInt() — для превращения в число отдельных символов и результирующей строки,
// функция Number.isNaN() — чтобы проверить, получилось ли превратить символ в число,
// метод toString() — на случай, если в качестве параметра пришло число.

const extractNumbers = function (string) {
  let result = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {

    const parseString = parseInt(string[i], 10);

    if (!Number.isNaN(parseString)) {
      result += string[i];
    }
  }
  return result;
};

extractNumbers(-10);

