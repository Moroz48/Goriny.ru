/**
 * Google Apps Script для обработки RSVP формы
 * 
 * Инструкция по настройке:
 * 1. Создайте Google Таблицу с колонками: Timestamp, First Name, Last Name, Email, Guests, Dietary
 * 2. Откройте таблицу → Расширения → Apps Script
 * 3. Вставьте этот код
 * 4. Сохраните проект
 * 5. Разверните как веб-приложение:
 *    - Нажмите "Развернуть" → "Новое развертывание"
 *    - Выберите тип: "Веб-приложение"
 *    - Выполнение от имени: "Меня"
 *    - У кого есть доступ: "Все"
 *    - Нажмите "Развернуть"
 * 6. Скопируйте URL веб-приложения и используйте его в script.js
 */

function doPost(e) {
  try {
    let data;
    
    // Пытаемся получить данные из JSON
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // Если не JSON, пробуем FormData
        data = {};
        const params = e.parameter;
        data.firstName = params.firstName || '';
        data.lastName = params.lastName || '';
        data.email = params.email || '';
        data.guests = params.guests || '';
        data.dietary = params.dietary || '';
      }
    } else {
      // Получаем из параметров
      data = {
        firstName: e.parameter.firstName || '',
        lastName: e.parameter.lastName || '',
        email: e.parameter.email || '',
        guests: e.parameter.guests || '',
        dietary: e.parameter.dietary || ''
      };
    }
    
    // Открываем вашу Google Таблицу (замените ID на ваш)
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Замените на ID вашей таблицы
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Добавляем данные в таблицу
    sheet.appendRow([
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.guests || '',
      data.dietary || ''
    ]);
    
    // Устанавливаем CORS заголовки
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Данные успешно сохранены'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    // Получаем данные из GET параметров
    const data = {
      firstName: e.parameter.firstName || '',
      lastName: e.parameter.lastName || '',
      email: e.parameter.email || '',
      guests: e.parameter.guests || '',
      dietary: e.parameter.dietary || ''
    };
    
    // Открываем вашу Google Таблицу (замените ID на ваш)
    const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Замените на ID вашей таблицы
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Добавляем данные в таблицу
    sheet.appendRow([
      new Date(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.guests || '',
      data.dietary || ''
    ]);
    
    // Возвращаем успешный ответ с CORS заголовками
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Данные успешно сохранены'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Возвращаем ошибку
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


