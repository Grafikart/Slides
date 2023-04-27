type Person = {firstname: string, lastname: string}

export function fullName (p: Person) {
  return p.firstname + ' ' + p.lastname
}


const john = {firstname: 'John', lastname: 'Doe', age: 23}
fullName(john)
