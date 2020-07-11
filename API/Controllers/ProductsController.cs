using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _repoProd;
        private readonly IGenericRepository<ProductBrand> _repoBrand;
        private readonly IGenericRepository<ProductType> _repoType;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> repoProd,
         IGenericRepository<ProductBrand> repoBrand,
          IGenericRepository<ProductType> repoType,
          IMapper mapper)
        {
            _repoType = repoType;
            _mapper = mapper;
            _repoBrand = repoBrand;
            _repoProd = repoProd;

        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GeProducts([FromQuery]ProductSpecParams productParams)
        {
            var spec =new ProductWithTypeAndBrandSpecification(productParams);
            var countSprc=new ProductsWithFilterCountSpecification(productParams);
            var totalItems=await _repoProd.CountAsync(countSprc);
            var products = await _repoProd.ListAsync(spec);
            var data=_mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex,productParams.PageSize,totalItems,data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]//just for understanding not required 
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GeProduct(int id)
        {
            var spec =new ProductWithTypeAndBrandSpecification(id);
            var product = await _repoProd.GetEntityWithSpec(spec);
            if(product==null)
               return NotFound(new ApiResponse(404));
            return Ok(_mapper.Map<Product,ProductToReturnDto>(product));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _repoBrand.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            return Ok(await _repoType.ListAllAsync());
        }
    }
}