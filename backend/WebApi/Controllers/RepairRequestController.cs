using System.Security.Claims;
using Application.Contracts.RepairRequest.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepairRequestController : ControllerBase
{
    private readonly IRepairRequestService _repairRequestService;

    public RepairRequestController(IRepairRequestService repairRequestService)
    {
        _repairRequestService = repairRequestService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateRequest(NewRepairRequest model)
    {
        if(User.Identity is not ClaimsIdentity user)
        {
            return Unauthorized();
        }

        model.CreatedById = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var repairRequest = await _repairRequestService.CreateRequest(model);
        return CreatedAtAction(nameof(GetRequestById), new{ id = repairRequest.Id}, repairRequest);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRequestById(Guid id)
    {
        var request = await _repairRequestService.GetRequestById(id);
        return Ok(request);
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetAllRequests()
    {
        var requests = await _repairRequestService.GetAllRequests();
        return Ok(requests);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRequest(Guid id, [FromBody]UpdateRepairRequest model)
    {
        var request = await _repairRequestService.UpdateRequest(id, model);
        return Ok(request);
    }

    [HttpGet("Statuses")]
    public async Task<IActionResult> GetRequestStatuses()
    {
        var statuses = await _repairRequestService.GetRequestStatuses();
        return Ok(statuses);
    }
}