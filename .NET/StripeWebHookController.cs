using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{

    [Route("webhook")]
    [ApiController]
    public class WebhookController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            const string secret = "whsec_eb7f219e296840d3efebc6f35888c7aad0da5691eddec72aabd9b49ddce0004f";

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                  json,
                  Request.Headers["Stripe-Signature"],
                  secret
                );
                var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                // Handle the checkout.session.completed event
                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                   

                    // Fulfill the purchase...
                    FulfillOrder(session);
                }


                switch (stripeEvent.Type)
                {
                    case Events.CheckoutSessionCompleted:
                        session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                        // Save an order in your database, marked as 'awaiting payment'
                        CreateOrder(session);

                        // Check if the order is paid (for example, from a card payment)
                        //
                        // A delayed notification payment will have an `unpaid` status, as
                        // you're still waiting for funds to be transferred from the customer's
                        // account.
                        var orderPaid = session.PaymentStatus == "paid";
        
            if (orderPaid)
                        {
                            // Fulfill the purchase
                            FulfillOrder(session);
                        }

                        break;
                    case Events.CheckoutSessionAsyncPaymentSucceeded:
                        session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                        // Fulfill the purchase
                        FulfillOrder(session);

                        break;
                    case Events.CheckoutSessionAsyncPaymentFailed:
                        session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                        // Send an email to the customer asking them to retry their order
                        EmailCustomerAboutFailedPayment(session);

                        break;
                }

                return Ok();
            }
            catch (StripeException e)
            {
                return BadRequest();
            }
        }

        private void FulfillOrder(Stripe.Checkout.Session session)
        {
            // TODO: fill me in
        }

        private void CreateOrder(Stripe.Checkout.Session session)
        {
            // TODO: fill me in
        }

        private void EmailCustomerAboutFailedPayment(Stripe.Checkout.Session session)
        {
            // TODO: fill me in
        }
    }
}
