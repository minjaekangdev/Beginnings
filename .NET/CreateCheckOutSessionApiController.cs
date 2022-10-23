using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace Sabio.Web.Api.Controllers
{
    [Route("create-checkout-session")]
    [ApiController]
    public class CheckoutApiController : Controller
    {
        [HttpPost]
        public ActionResult Create(SessionCreateOptions options)
        {
            //var domain = "http://localhost:50001";
            //var options = new SessionCreateOptions
            //{
            //    LineItems = new List<SessionLineItemOptions>
            //    {
            //      new SessionLineItemOptions
            //      {
            //        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            //        Price = "price_1LhLiwEEphuayzqjLQ6HOwbo",
            //        Quantity = 1,
            //      },
            //    },
            //    Mode = "payment",
            //    SuccessUrl = domain + "?success=true",
            //    CancelUrl = domain + "?canceled=true",
            //    AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true }
            //};

            var service = new SessionService();
            Session session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
        }
    }
}
