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


}