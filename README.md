# Code challenge Exactian

## Modelos de BBDD

### Employee
- name: String
- surname: String
- dni: Number
- state: Boolean ('logged-in': true, 'fuera': false)
- last_entry: Date 

### Registro
- employee_ID: Number
- type: boolean (entry: true o exit: false)
- entry: Date
- exit: Date

## API REST

### POST /registros
Crea un nuevo registro de entry y actualiza el estado del empleado.
{
  "employee_id": "60d0fe4f5311236168a109ca",
  "entry": "2025-08-13T09:00:00Z"
}

200:
{
  "msg": "entry registrado con éxito.",
  "registro": {
    "_id": "60d0fe4f5311236168a109cb",
    "employee_ID": "60d0fe4f5311236168a109ca",
    "entry": "2025-08-13T09:00:00Z",
    "exit": null
  }
}

400:
{
  "msg": "El empleado ya se encuentra logged-in de la compañía."
}

### PATCH /registros/:id
Actualiza un registro de entry con la hora de exit y actualiza el estado del empleado. El :id corresponde al _id del empleado
{
  "exit": "2025-08-13T18:00:00Z"
}

200:
{
  "msg": "exit registrado con éxito.",
  "tiempoTranscurrido": "9 horas",
  "aviso": "El tiempo transcurrido es mayor a 8 horas.",
  "registro": {
    "_id": "60d0fe4f5311236168a109cb",
    "employee_ID": "60d0fe4f5311236168a109ca",
    "entry": "2025-08-13T09:00:00Z",
    "exit": "2025-08-13T18:00:00Z"
  }
}

400:
{
  "msg": "El empleado no se encuentra en la compañía."
}

### GET /empleados/logged-in
Devuelve un arreglo de todos los empleados cuyo estado es true

200:
[
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "Juan",
    "surname": "De los Palotes",
    "estado": true
  }
]
