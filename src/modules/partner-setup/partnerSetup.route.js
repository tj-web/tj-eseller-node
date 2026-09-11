import express from "express";
import multer from "multer";
import {
  getPartnerSetupInfo,
  saveCompanySetup,
  saveBrandSetup,
  saveProductSetup,
  savePartnerSetup,
  searchMainBrands,
  getSetupCategories,
} from "./partnerSetup.controller.js";
import {
  validateCompanyInfo,
  validateBrandDetails,
  validateProductDetails,
  validatePartnerSetup,
} from "./partnerSetup.validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// GET Partner Setup initial data & step statuses
router.get("/", getPartnerSetupInfo);

// GET Brand search for Select2 dropdown
router.get("/main-brands", searchMainBrands);

// GET Categories for Product Setup dropdown
router.get("/categories", getSetupCategories);

// POST Step 1: Company Information
router.post("/company-info", validateCompanyInfo, saveCompanySetup);

// POST Step 2: Brand Details
router.post("/brand-details", validateBrandDetails, saveBrandSetup);

// POST Step 3: Product Details (handles multipart for logo & screenshots)
router.post(
  "/product-details",
  upload.any(),
  validateProductDetails,
  saveProductSetup
);

// Unified POST / (dispatcher supporting legacy form_type submissions)
router.post("/", upload.any(), validatePartnerSetup, savePartnerSetup);

export default router;
