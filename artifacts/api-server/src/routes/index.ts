import { Router, type IRouter } from "express";
import healthRouter from "./health";
import listingsRouter from "./listings";
import leadsRouter from "./leads";
import agentsRouter from "./agents";
import postsRouter from "./posts";
import feedsRouter from "./feeds";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(listingsRouter);
router.use(leadsRouter);
router.use(agentsRouter);
router.use(postsRouter);
router.use(feedsRouter);
router.use(storageRouter);

export default router;
