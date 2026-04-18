import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import bookRoutes from "./interface/routes/book.routes";
import { errorHandler } from "./interface/middlewares/error-handler";
import { generalLimiter } from "./interface/middlewares/rate-limiter";
import { swaggerSpec } from "./infrastructure/docs/swagger";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  // Swagger UI requer inline scripts e styles — aplicado apenas na rota /docs
  app.use("/docs", (_req, _res, next) => {
    next();
  });

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "same-origin" },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
        },
      },
    })
  );

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origem não permitida: ${origin}`));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );

  app.use(express.json({ limit: "50kb" }));

  app.use(generalLimiter);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (_req, res) => res.json(swaggerSpec));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/books", bookRoutes);
  app.use(errorHandler);

  return app;
}
