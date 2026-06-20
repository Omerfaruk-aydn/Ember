from fastapi import APIRouter, Depends, Request
from app.deps import get_current_active_user
from app.models.user import User
from app.services.billing_service import BillingService

router = APIRouter()
billing_service = BillingService()


@router.get("/plans")
async def get_plans():
    return billing_service.get_plans()


@router.get("/subscription")
async def get_subscription(current_user: User = Depends(get_current_active_user)):
    return await billing_service.get_subscription(current_user.id)


@router.get("/usage")
async def get_usage(current_user: User = Depends(get_current_active_user)):
    return await billing_service.check_usage(current_user.id)


@router.post("/checkout")
async def create_checkout(body: dict, current_user: User = Depends(get_current_active_user)):
    return {"message": "Stripe checkout integration requires valid API keys", "plan": body.get("plan_id")}


@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")
    return {"status": "received"}
