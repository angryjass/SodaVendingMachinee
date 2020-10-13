using SodaVendingMachine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SodaVendingMachine.Repositories
{
    public class SVMRepository
    {
        SodaVendingMachineContext context;
        public SVMRepository()
        {
            context = new SodaVendingMachineContext();
        }
        public List<SodaStorageDto> GetSodaStorage()
        {
            var soda = context.Soda.ToList();
            List<SodaStorageDto> sodaStorages = new List<SodaStorageDto>();


            foreach (var s in soda)
            {

                var ss = context.SodaStorage.FirstOrDefault(a => a.SodaId == s.Id);


                sodaStorages.Add(new SodaStorageDto
                {



                    Id = ss.Id,
                    Name = s.Name,
                    Price = s.Price,
                    Img = s.Img,
                    Value = ss.Value,



                });
            }
            return sodaStorages;
        }



        public void DeleteSoda(int id)
        {
            var soda = context.Soda.First(a => a.Id == id);
            var sodaStorage = context.SodaStorage.First(b => b.SodaId == id);
            context.Soda.Remove(soda);
            context.SodaStorage.Remove(sodaStorage);
            context.SaveChanges();
        }

        public List<CoinsStorageDto> GetCoinsStorage()
        {
            var coins = context.Coins.ToList();
            List<CoinsStorageDto> coinsStorages = new List<CoinsStorageDto>();
            foreach (var coin in coins)
            {
                var cs = context.CoinsStorage.FirstOrDefault(a => a.CoinId == coin.Id);

                coinsStorages.Add(new CoinsStorageDto
                {
                    Id = cs.Id,
                    Name = coin.Name,
                    Value = cs.Value,
                    IsLocked = cs.IsLocked
                });
            }

            return coinsStorages;
        }

        public void UpdateCoinParams(List<CoinsStorageDto> dtos)
        {
            foreach (var dto in dtos)
            {
                CoinsStorage coinsStorage = context.CoinsStorage.FirstOrDefault(s => s.Id == dto.Id);

                coinsStorage.IsLocked = dto.IsLocked;
                coinsStorage.Value = dto.Value;

                context.Update(coinsStorage);
            }
            context.SaveChanges();
        }
        public void CreateSoda(SodaStorageDto dto)
        {
            var soda = new Soda()
            {
                Img = dto.Img,
                Name = dto.Name,
                Price = dto.Price
            };
            context.Soda.Add(soda);
            context.SaveChanges();

            context.SodaStorage.Add(new SodaStorage()
            {
                Soda = soda,
                SodaId = soda.Id,
                Value = dto.Value
            });
            context.SaveChanges();
        }
        public void UpdateSodaParams(List<SodaStorageDto> dtos)
        {
            foreach (var dto in dtos)
            {
                SodaStorage sodaStorage = context.SodaStorage.FirstOrDefault(s => s.Id == dto.Id);
                sodaStorage.Value = dto.Value;

                Soda soda = context.Soda.FirstOrDefault(s => s.Id == sodaStorage.SodaId);
                soda.Img = dto.Img;
                soda.Name = dto.Name;
                soda.Price = dto.Price;

                context.Update(sodaStorage);
                context.Update(soda);
            }
            context.SaveChanges();
        }
    }
}
