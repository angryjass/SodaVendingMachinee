using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SodaVendingMachine.Models;
using SodaVendingMachine.Repositories;

namespace SodaVendingMachine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SodaVendingMachineController : ControllerBase
    {
        SodaVendingMachine.Repositories.SVMRepository _svmRepository;
        public SodaVendingMachineController()
        {
            _svmRepository = new SVMRepository();
        }

        [HttpGet("getsodastorage")]
        public IActionResult GetSodaStorage()
        {
            try
            {
                return Ok(_svmRepository.GetSodaStorage());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getcoinsstorage")]
        public ActionResult GetCoinsStorage()
        {
            try
            {
                return Ok(_svmRepository.GetCoinsStorage());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteSoda(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _svmRepository.DeleteSoda(id);
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updatecoinparams")]
        public ActionResult UpdateCoinParams([FromBody]List<CoinsStorageDto> dtos)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _svmRepository.UpdateCoinParams(dtos);
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("updatesodaparams")]
        public ActionResult UpdateSodaParams([FromBody]List<SodaStorageDto> dtos)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _svmRepository.UpdateSodaParams(dtos);
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("createsoda")]
        public ActionResult CreateSoda([FromBody]SodaStorageDto dto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _svmRepository.CreateSoda(dto);
                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }  
    }
}