from fastapi import FastAPI

from .api.login import router as login_router
from .api.v1 import api_router as v1_router
from .settings import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.URL_PREFIX}/openapi.json",
)

if settings.BACKEND_CORS_ORIGINS:
    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(login_router, prefix=settings.URL_PREFIX)
app.include_router(v1_router, prefix=settings.URL_PREFIX + "/v1")
