using System.Security.Claims;
using Application.Contracts.RepairRequest.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateRequest(NewRepairRequest model)
    {
        var user = (ClaimsIdentity)User.Identity!;
        var createdById = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var repairRequest = await _repairRequestService.CreateRequest(model, createdById);
        return CreatedAtAction(nameof(GetRequestById), new { id = repairRequest.Id }, repairRequest);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRequestById(Guid id)
    {
        var request = await _repairRequestService.GetRequestById(id);
        return Ok(request);
    }

    [Authorize]
    [HttpGet("All")]
    public async Task<IActionResult> GetAllRequests()
    {
        var requests = await _repairRequestService.GetAllRequests();
        return Ok(requests);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRequest(Guid id, [FromBody] UpdateRepairRequest model)
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

    [HttpGet("Report/Weekly")]
    public async Task<IActionResult> WeeklyReport([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
    {
        var report = await _repairRequestService.RequestWeeklyReport(fromDate, toDate);
        return Ok(report);
    }

    [HttpGet("Report/MonthlyByStatus")]
    public async Task<IActionResult> StatusesMonthlyReport([FromQuery] int year, [FromQuery] int month)
    {
        var report = await _repairRequestService.StatusesMonthlyReport(year, month);
        return Ok(report);
    }

    [HttpGet("Search")]
    public async Task<IActionResult> GetRequestsWithFilters([FromQuery] string? status, [FromQuery] string? clientId,
        [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate, [FromQuery] int? limit)
    {
        var requests = await _repairRequestService.GetRequestsWithFilters(status, clientId, fromDate, toDate, limit);
        return Ok(requests);
    }
}
