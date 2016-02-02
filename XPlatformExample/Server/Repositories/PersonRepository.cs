using System.Collections.Generic;
using System.Linq;
using XPlatformExample.Server.Models;

namespace XPlatformExample.Server.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        readonly Dictionary<int, Person> _persons = new Dictionary<int, Person>();

        public PersonRepository()
        {
            _persons.Add(1, new Person() { Id = 1, Age = 34, Name = "Claudio" });
            _persons.Add(2, new Person() { Id = 2, Age = 28, Name = "Fabi" });
        }

        public List<Person> GetAll()
        {
            return _persons.Select(x => x.Value).ToList();
        }

        public Person GetSingle(int id)
        {
            return _persons.FirstOrDefault(x => x.Key == id).Value;
        }

        public Person AddPerson(Person personToAdd)
        {
            int newId = !GetAll().Any() ? 1 : GetAll().Max(x => x.Id) + 1;
            personToAdd.Id = newId;
            _persons.Add(newId, personToAdd);
            return personToAdd;
        }

        public Person UpdatePerson(Person personToUpdate)
        {
            Person single = GetSingle(personToUpdate.Id);

            if (single == null)
            {
                return null;
            }

            _persons[single.Id] = personToUpdate;
            return personToUpdate;
        }

        public void DeletePerson(int id)
        {
            _persons.Remove(id);
        }
    }
}