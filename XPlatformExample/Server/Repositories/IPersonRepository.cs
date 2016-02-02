using System.Collections.Generic;
using XPlatformExample.Server.Models;

namespace XPlatformExample.Server.Repositories
{
    public interface IPersonRepository
    {
        List<Person> GetAll();
        Person GetSingle(int id);
        Person AddPerson(Person personToAdd);
        Person UpdatePerson(Person personToUpdate);
        void DeletePerson(int id);
    }
}