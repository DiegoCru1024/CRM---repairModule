using System.Net.Http.Json;
using Application.Contracts.Sell.DTOs;
using Application.Contracts.Warranty.DTOs;
using Application.Exceptions;
using Application.Services.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.ExternalServices.SalesModule;

public class SalesModuleService : ISalesModuleService
{
    private readonly HttpClient _httpClient;

    public SalesModuleService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<GetSell>?> GetSellsByDni(string dni)
    {
        return await _httpClient.GetFromJsonAsync<IEnumerable<GetSell>>($"getselldni/{dni}");
    }

    public async Task<GetSell?> GetSellById(Guid sellId)
    {
        return await _httpClient.GetFromJsonAsync<GetSell>($"getsellid/{sellId}");
    }

    public async Task<IEnumerable<GetSellDetail>?> GetSellDetailBySellId(Guid sellId)
    {
        return await _httpClient.GetFromJsonAsync<IEnumerable<GetSellDetail>>($"getselldetails/{sellId}");
    }

    public async Task<GetWarranty?> GetWarrantyById(int warrantyId)
    {
        return await _httpClient.GetFromJsonAsync<GetWarranty>($"searchwarranty/{warrantyId}");
    }

    public async Task<GetWarranty?> GetWarrantyByProductIdAndSellId(Guid productId, Guid sellId)
    {
        var sell = await this.GetSellById(sellId);

        if (sell == null)
        {
            throw new NotFoundException("Sell", sellId);
        }

        var details = await this.GetSellDetailBySellId(sellId);

        if (details == null)
        {
            throw new NotFoundException("SellDetail", nameof(sellId), sellId);
        }

        var productDetail = details.FirstOrDefault(x => x.ProductId == productId);

        if (productDetail == null)
        {
            throw new NotFoundException("SellDetail", nameof(productId), productId);
        }

        var warranty = await this.GetWarrantyById(productDetail.WarrantyId);

        if (warranty == null)
        {
            throw new NotFoundException("Warranty", productDetail.WarrantyId);
        }

        if (sell.Date.AddMonths(productDetail.WarrantyTime) < DateTime.Now)
        {
            warranty.IsExpired = true;
        }

        return await this.GetWarrantyById(productDetail.WarrantyId);
    }
}
