using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private Hashtable _repos;
        private readonly StoreContext _context;
        public UnitOfWork(StoreContext context)
        {
            _context = context;

        }
        public async Task<int> Complete()
        {
           return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(_repos==null) _repos=new Hashtable();

            var type=typeof(TEntity).Name;

            if(!_repos.ContainsKey(type)){
                var repositoryType=typeof(GenericRepository<>);
                var repositoryInstance=Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)),_context);
                _repos.Add(type,repositoryInstance);
            }

             return( IGenericRepository<TEntity>)_repos[type];
        }
    }
}