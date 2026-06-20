import stripe
from app.config import get_settings

settings = get_settings()
stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeClient:
    async def create_checkout_session(self, customer_id: str, price_id: str, success_url: str, cancel_url: str, metadata: dict | None = None) -> dict:
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            mode="subscription",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata or {},
            subscription_data={"trial_period_days": 14},
        )
        return {"session_id": session.id, "url": session.url}

    async def create_customer(self, email: str, name: str | None = None, metadata: dict | None = None) -> str:
        customer = stripe.Customer.create(email=email, name=name, metadata=metadata or {})
        return customer.id

    async def create_portal(self, customer_id: str, return_url: str) -> str:
        session = stripe.billing_portal.Session.create(customer=customer_id, return_url=return_url)
        return session.url

    def verify_webhook(self, payload: bytes, sig_header: str) -> dict:
        return stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
