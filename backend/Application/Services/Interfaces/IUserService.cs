using Application.Contracts.User.DTOs;

namespace Application.Services.Interfaces;

public interface IUserService
{
    Task<UserToken> CreateUser(RegisterUser model);
    Task<UserToken> LoginUser(LoginUser model);
}