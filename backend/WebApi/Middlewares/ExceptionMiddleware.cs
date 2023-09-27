using System.Net;
using Application.Exceptions;
using WebApi.Contracts;

namespace WebApi.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            _logger.LogError(e, e.Message);
            var response = context.Response;
            response.ContentType = "application/json";
            var errorResponse = new ErrorResponse(e.Message);

            switch (e)
            {
                case AppException:
                   response.StatusCode = (int) HttpStatusCode.BadRequest;
                   break;
               case ValidationException ve:
                   response.StatusCode = (int) HttpStatusCode.BadRequest;
                   errorResponse.Errors = ve.Errors;
                   break;
               default:
                   response.StatusCode = (int)HttpStatusCode.InternalServerError;
                   break;
            }

            errorResponse.StatusCode = response.StatusCode.ToString();
            await response.WriteAsync(errorResponse.ToString());
        }

    }
}