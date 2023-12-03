using Application.Contracts.Sell.DTOs;
using Application.Contracts.Warranty.DTOs;

namespace Application.Services.Interfaces;

public interface ISalesModuleService
{
    Task<IEnumerable<GetSell>?> GetSellsByDni(string dni);
    Task<IEnumerable<GetSellDetail>?> GetSellDetailBySellId(Guid sellId);
    Task<GetWarranty?> GetWarrantyById(int id);
    Task<GetWarranty?> GetWarrantyByProductIdAndSellId(Guid productId, Guid sellId);
    Task<GetSell?> GetSellById(Guid sellId);
}
