using System;

namespace Core.Entities
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            this.InsertedDate=DateTime.Now;
        }

        public int Id { get; set; }
        public DateTime InsertedDate { get; set; }
    }
}