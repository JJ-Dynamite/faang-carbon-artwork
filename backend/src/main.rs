use axum::{routing::{get, post}, Router, Json, response::IntoResponse};
use serde::{Deserialize, Serialize};
use tower_http::cors::{CorsLayer, Any};

#[derive(Deserialize)]
struct CodeRequest { code: String, theme: Option<String>, language: Option<String> }

async fn health_check() -> impl IntoResponse {
    Json(serde_json::json!({"status": "healthy", "service": "Carbon Artwork"}))
}

async fn generate_image(Json(req): Json<CodeRequest>) -> impl IntoResponse {
    Json(serde_json::json!({
        "success": true,
        "lines": req.code.lines().count(),
        "theme": req.theme.unwrap_or("monokai".into()),
        "image_url": format!("/code/{}.png", uuid::Uuid::new_v4())
    }))
}

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any);
    let app = Router::new()
        .route("/", get(|| async { Json(serde_json::json!({"service": "Carbon Artwork"})) }))
        .route("/health", get(health_check))
        .route("/generate", post(generate_image))
        .layer(cors);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
