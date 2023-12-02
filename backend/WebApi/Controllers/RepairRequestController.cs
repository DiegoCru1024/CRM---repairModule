using System.Data;
using System.Globalization;
using System.Security.Claims;
using Application.Contracts.RepairRequest.DTOs;
using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

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

    [Authorize]
    [HttpGet("DownloadAsExcel")]
    public async Task<IActionResult> DownloadAsExcel([FromQuery] string? status, [FromQuery] string? clientId,
        [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate, [FromQuery] int? limit)
    {
        var requests = (await _repairRequestService.GetRequestsWithFilters(status, clientId, fromDate, toDate, limit))
            .ToList();
        var dataTable = new DataTable("Reporte de Solicitudes de Reparación");
        dataTable.Columns.Add("Id");
        dataTable.Columns.Add("ClienteDni");
        dataTable.Columns.Add("VentaId");
        dataTable.Columns.Add("ProductoId");
        dataTable.Columns.Add("FechaCreacion");
        dataTable.Columns.Add("FechaCierre");
        dataTable.Columns.Add("Motivo");
        dataTable.Columns.Add("Descripcion");
        dataTable.Columns.Add("EstadoDiapositivo");
        dataTable.Columns.Add("GarantiaId");
        dataTable.Columns.Add("EmailContacto");
        dataTable.Columns.Add("EstadoReporte");

        foreach (var request in requests)
        {
            dataTable.Rows.Add(request.Id, request.ClientId, request.PurchaseOrderId, request.ProductId,
                request.CreatedAt, request.ClosedAt, request.Motive, request.Description, request.DeviceStatus,
                request.WarrantyId, request.ContactEmailInfo, request.Status);
        }

        using var package = new ExcelPackage();

        var worksheet = package.Workbook.Worksheets.Add("Reporte de Solicitudes de Reparación");
        worksheet.Cells["A1"].LoadFromDataTable(dataTable, true);
        worksheet.Cells.AutoFitColumns();
        var stream = new MemoryStream();
        await package.SaveAsAsync(stream);
        stream.Position = 0;
        var excelName = $"RepairRequests-{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";
        return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
    }
}
