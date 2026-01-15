import express from "express";
import { PORT, BASE_URL } from "./config/server-config.js";
import { errorHandler } from "./helpers/common/errorHandler.js";
import dbConnect from "./config/db-config.js";
import { userRoutes } from "./routes/user-routes.js";
import { requisitionRoutes } from "./routes/requisition-routes.js";
import { jobRoutes } from "./routes/job-routes.js";
import { candidateRoutes } from "./routes/candidate-routes.js";
import { applicationRoutes } from "./routes/application-routes.js";

const app = express();

app.use(express.json());
app.use(`${BASE_URL}/user`, userRoutes);
app.use(`${BASE_URL}/requisitions`, requisitionRoutes);
app.use(`${BASE_URL}/jobs`, jobRoutes);
app.use(`${BASE_URL}/candidates`, candidateRoutes);
app.use(`${BASE_URL}/applications`, applicationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is started on port ${PORT} \n context path: ${BASE_URL}`);
});
