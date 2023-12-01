using System.Security.Claims;
using Application.Contracts.Diagnosis.DTOs;
using Application.Contracts.RepairOrder.DTOs;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class RepairOrderController : ControllerBase
{
    private readonly IRepairOrderService _repairOrderService;

    public RepairOrderController(IRepairOrderService repairOrderService)
    {
        _repairOrderService = repairOrderService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRepairOrder(Guid id, [FromQuery] bool includeDetails)
    {
        var order = await _repairOrderService.GetRepairOrder(id, includeDetails);
        return Ok(order);
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetRepairOrders()
    {
        var orders = await _repairOrderService.GetRepairOrders();
        return Ok(orders);
    }

    [HttpGet("Search")]
    public async Task<IActionResult> GetRepairOrdersWithFilters([FromQuery] string? status, [FromQuery] string? clientId, [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate, [FromQuery] int? limit)
    {
        var orders = await _repairOrderService.GetRepairOrdersWithFilters(status, clientId, fromDate, toDate, limit);
        return Ok(orders);
    }

    [HttpPut("{id}/Diagnose")]
    public async Task<IActionResult> DiagnoseOrder(Guid id, [FromBody] DiagnoseRepairOrder model)
    {
        var user = (ClaimsIdentity)User.Identity!;
        var createdById = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var order = await _repairOrderService.DiagnoseOrder(id, createdById, model);
        return Ok(order);
    }

    [HttpGet("SpareParts")]
    public async Task<IActionResult> GetSpareParts()
    {
        var spareParts = await _repairOrderService.GetSpareParts();
        return Ok(spareParts);
    }

    [HttpGet("Reports/Weekly")]
    public async Task<IActionResult> OrdersWeeklyReport([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
    {
        var report = await _repairOrderService.OrdersWeeklyReport(fromDate, toDate);
        return Ok(report);
    }

    [HttpGet("Reports/MonthlyByStatus")]
    public async Task<IActionResult> StatusesMonthlyReport([FromQuery] int year, [FromQuery] int month)
    {
        var report = await _repairOrderService.StatusesMonthlyReport(year, month);
        return Ok(report);
    }
}
