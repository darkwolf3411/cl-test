<h1>Frontend test case</h1>
Написать небольшое приложение на React + Typescript. Приложение пишется только через функции и хуки, классы использовать запрещено.
Приложение должно содержать:
<ul>
<li>Таблица, которая может содержать произвольное кол-во полей (от 5 до 15).</li>
<li>Данные в таблицу должны загружаться с сервера и использовать Infinite Loader для подгрузки новых данных.</li>
<li>Стейт-менеджер (или его отсутствие, обосновать выбор или же отсутствие инструмента).</li>
<li>Форма создания новой записи в таблице - должно быть минимум 5 полей
Пояснения:
  <ul>
    <li>Учитывайте, что полей может быть произвольное кол-во</li>
    <li>Поля имеют валидацию (от простых на обязательность, до сложных в виде правильного IBAN) (можно не делать, но тогда описать как бы вы это реализовали)</li>
    <li>При отправке должен быть соответствующий стейт (disable кнопки или другие)</li>
    <li>Сервер может не принять форму и вернуть ошибки (опять же можно не делать, но описать реализацию)</li>
    </ul>
</li>
<li>Форма должна отправляться по api. Запись добавляется в таблицу</li>
<li>Любая анимация (например попап с формой) (используйте что-то сложнее простых CSS анимаций)</li>
<li>Описать как реализовать i18n и l10n в текущем проекте (делать не нужно).</li>
<li>Код расположить в github. В github actions должна быть настроена сборка. (Если не знаете, то пропускаете с пометкой не знаком, слышал, использовал другие CI/CD и т.д.)</li>
<li>Приложить Dockerfile (если не знаете, то пропускаете с пометкой не знаком, слабо знаком, слышал и т.д.)</li>
<li>Должно быть написано несколько тестов. Хотя бы один из тестов обязательно должен покрывать сетевые запросы и асинхронные операции.</li>
</ul>
Разрешено использование любых сторонних библиотек (но нужно будет обосновать их использование).
Для UI возможно использовать любую библиотеку компонентов или фреймворк(bootstrap, chakra, material, etc.).
Для API можно использовать https://github.com/typicode/json-server файл c db нужно приложить к проекту.
***
<h2>Мои решения<h2>

  <ol>
    <li>
      Для реализации infinite scroll использовал библиотеку "react-infinite-scroll-hook"
    </li>
    <li>
      Стейт-менеджер использовал React toolkit (слайсы) для хранения данных и выполнения асинхронных запросов (thunk'и)
    </li>
    <li>
      Для валидации формы использовал библиотеку "react-hook-form" и "validator" для кастомной валидации, например IBAN
    </li>
    <li>
      Для вывода ошибок использовался snackbar из библиотеки "notistack" 
    </li>
    <li>
      С GitHub Actions не знаком
    </li>
    <li>
      С Docker малознаком
    </li>
  </ol>
  <h3>
    Пример валидации IBAN с "react-hook-form" и "validator"
  </h3>
 

```javascript
const checkAsIBAN = (fieldName) => {
  return (
    validator.isIBAN(getValues(fieldNane).toString()) || "Wrong IBAN"
  );
};
<Controller
  name="iban"
  control={control}
  rules={{
    required: "Field Calories is required!",
    validate: () => checkAsIBAN("iban"),
  }}
  render={({ field, fieldState: { error } }) => (
    <TextField
      {...field}
      error={!!error}
      margin="dense"
      label="iban"
      fullWidth
      helperText={error?.message || null}
      variant="standard"
    />
  )}
/>
```
