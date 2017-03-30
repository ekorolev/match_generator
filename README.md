# Генератор футбольных матчей

Программа на NodeJS, генерирующая матч на основе определенных начальных данных (состав команды, усталость игроков и т.д.)

# Пример входных данных

Чтобы получить объект с результатами, необходимо предоставить данные в формате:

### Формат представления команд

```Javascript
{
  name: String, // Название команды
  players Array // Массив игроков (11 штук)
}
```
### Формат представление игроков

```Javascript
{
  fullname: String, // Имя и Фамилия игрока (именно в таком порядке)
  position: String, // Позиция игрока на поле (GK, CM, LM и т.д.)
  age: Number, // Возраст игрока (14 - 44 года)
  power: Number // Сила игрока (0 - неограниченно)
}
```
#### Допустимые позиции
| Код позиции | Расшифровка |
| --- | --- |
| **GK** | Вратарь |
| **LD** | Левый защитник |
| **CD** | Центральный защитник |
| **RD** | Правый защитник |
| **LM** | Левый полузащитник |
| **CM** | Центральный полузащитник |
| **RM** | Правый полузащитник |
| **CF** | Центральный нападающий |
