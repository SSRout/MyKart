using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using AutoMapper;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManger;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManger, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManger = userManger;
        }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManger.FindEmailFromClaimPrinciple(HttpContext.User);

        return new UserDto
        {
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email)
    {
        return await _userManger.FindByEmailAsync(email) != null;
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<AddressDto>> GetUserAddress()
    {
        var user = await _userManger.FindByClaimPrincipleByWithAddress(HttpContext.User);
        return _mapper.Map<Address,AddressDto>(user.Address);
    }

    [Authorize]
    [HttpPut("address")]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto){
        var user=await _userManger.FindByClaimPrincipleByWithAddress(HttpContext.User);
        user.Address=_mapper.Map<AddressDto,Address>(addressDto);
        var res=await _userManger.UpdateAsync(user);
        if(res.Succeeded) return Ok(_mapper.Map<Address,AddressDto>(user.Address));

        return BadRequest("Problem while Upadting Address");
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManger.FindByEmailAsync(loginDto.Email);
        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return new UserDto
        {
            Email = user.Email,
            Token = _tokenService.CreateToken(user),
            DisplayName = user.DisplayName
        };
    }

    [HttpPost("Register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if(CheckEmailExists(registerDto.Email).Result.Value){
            return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors=new []{"Email Address Already in Use"}});
        }
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Email,
        };

        var result = await _userManger.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return new UserDto
        {
            DisplayName = user.DisplayName,
            Email = user.Email,
            Token = _tokenService.CreateToken(user)
        };
    }

}
}