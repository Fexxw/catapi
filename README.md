# catapi
 ## Установка и запуск
 1. `git clone https://github.com/Fexxw/catapi.git`
 2. `docker-compose up`
  
 ## API методы
 1. `GET /api/cats` - получение списка всех котов (параметры `page`, `limit` для пагинации). Пример выходных данных:
 ```json
 {
    "results": [
        {
            "id": 2,
            "name": "Хагиваги",
            "breed": "Страшный",
            "color": "Синий",
            "age": 3,
            "price": 23,
            "photo": "pictureUrl",
            "isReserved": false
        }
    ],
    "itemsTotal": 1,
    "total": 1
}
```
 2. `GET /api/cats/reserved` - получение списка зарезервированных котов (параметры `page`, `limit` для пагинации)
 3. `GET /api/cats/available` - получение списка доступных котов (параметры `page`, `limit` для пагинации)
 4. `GET /api/cats/search/:id` - получение кота с id = `:id`
 5. `POST /api/cats` - создание кота с входными данными:
 ```json
 {
    "name": "Хагиваги",
    "breed": "Страшный",
    "color": "Синий",
    "age": 3,
    "photo": "pictureUrl",
    "price": 23
}
```
6. `PUT /api/cats/reserve/:id` - резервирование кота с id = `:id`
7. `PUT /api/cats/search/:id` - изменение кота с id = `:id`. Пример входных данных:
```json
{
    "name": "Хагиваги",
    "breed": "Страшный",
    "color": "красный",
    "age": 3,
    "photo": "pictureUrl",
    "price": 23
}
```
8. `DELETE /api/cats/search/:id` - удаление кота с id = `:id`
