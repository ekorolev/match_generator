# Генератор футбольных матчей

Программа на NodeJS, генерирующая матч на основе определенных начальных данных (состав команды, усталость игроков и т.д.)

# Пример входных данных

Чтобы получить объект с результатами, необходимо предоставить данные в приведенном ниже формате

### Входные параметры матча
```Javascript
{
  current_minute: Number, // Текущая минута (0-90)
  current_time: Number, // Текущий тайм (1 или 2)
  is_begin: Boolean, // true, если матч еще не начался
  is_end: Boolean, // true, если матч уже закончился
  
  home_score: Number, // Количество мячей, забитых домашней командой
  guest_score: Number, // Количество мячей, забитых гостевой командой
  
  home_team: Object, // Объект с параметрами домашней команды
  guest_team: Object // Объект с параметрами гостевой команды 
}
```

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
  power: Number // Сила игрока (0 - неограниченно),
  
  current_power: Number, // Текущая сила игрока
  current_position: String // Позиция, занимаемая игроком на поле
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

# Принцип работы генератора

Фактически, скрипт принимает в себя объект игры, просчитывает одну игровую минуту и отдаёт ответ. Причины, по которым выбран именно такой формат генератора: 
1. Возможность реализовать трансляцию матча.
2. Тренер играющей команды имеет возможность вносить изменения в тактику команды во время игры.
3. В случае сбоя матч можно продолжить ровно с того момента, на котором произошёл сбой.
4. Можно составить максимально подробный отчет о матче, показав все действия команды в каждую минуту игры.
5. Упрощается процесс разработки генератора.
