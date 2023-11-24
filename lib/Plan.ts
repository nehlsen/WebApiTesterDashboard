/*
GET http://localhost:8080/plans/
[
  {
    "name": "HTTP GET and expect HTTP-OK",
    "uuid": "dc6647fe-f0ef-4d0e-90a9-1843288089e3"
  },
  {
    "name": "my first plan having no tasks",
    "uuid": "66b7b061-4a5a-4b51-89b9-c7e08d4632c9"
  }
]
 */
export interface Plan {
    uuid: string,
    name: string
}
