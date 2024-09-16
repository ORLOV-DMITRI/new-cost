import './src/styles/style.scss'
import { CategoryController } from "./src/components/category/CategoryController.js";
import { formController } from "./src/components/form/formController.js";

CategoryController.init()
formController.init()

// document.addEventListener('DOMContentLoaded', function () {
//     // Получаем элементы формы
//     const autoDebitRadios = document.getElementsByName('autoDebit');
//     const autoDebitAmountField = document.getElementById('autoDebitAmountField');
//     const rateInput = document.getElementById('rate');
//
//     const trackProgressRadios = document.getElementsByName('trackProgress');
//     const trackMaxField = document.getElementById('trackMaxField');
//     const trackMaxInput = document.getElementById('trackMax');
//
//     // Функция для отображения/скрытия поля суммы списания
//     function toggleAutoDebitField() {
//         if (document.querySelector('input[name="autoDebit"]:checked').value === 'yes') {
//             autoDebitAmountField.style.display = 'block';
//             rateInput.required = true;
//         } else {
//             autoDebitAmountField.style.display = 'none';
//             rateInput.required = false;
//             rateInput.value = 0;
//         }
//     }
//
//     // Функция для отображения/скрытия поля количества дней
//     function toggleTrackMaxField() {
//         if (document.querySelector('input[name="trackProgress"]:checked').value === 'yes') {
//             trackMaxField.style.display = 'block';
//             trackMaxInput.required = true;
//         } else {
//             trackMaxField.style.display = 'none';
//             trackMaxInput.required = false;
//             trackMaxInput.value = 0;
//         }
//     }
//
//     // Добавляем обработчики событий для радио-кнопок автосписания
//     autoDebitRadios.forEach(function (radio) {
//         radio.addEventListener('change', toggleAutoDebitField);
//     });
//
//     // Добавляем обработчики событий для радио-кнопок отслеживания прогресса
//     trackProgressRadios.forEach(function (radio) {
//         radio.addEventListener('change', toggleTrackMaxField);
//     });
//
//     // Инициализируем отображение полей при загрузке страницы
//     toggleAutoDebitField();
//     toggleTrackMaxField();
//
//     // Добавляем валидацию при отправке формы
//     const form = document.getElementById('createForm');
//     form.addEventListener('submit', function (event) {
//         // Проверка суммы списания
//         if (rateInput.required && rateInput.value < 0) {
//             alert('Сумма списания не может быть меньше нуля.');
//             event.preventDefault();
//             return;
//         }
//
//         // Проверка количества дней
//         if (trackMaxInput.required && trackMaxInput.value < 0) {
//             alert('Количество дней не может быть меньше нуля.');
//             event.preventDefault();
//             return;
//         }
//     });
// });

