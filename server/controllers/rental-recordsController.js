const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {verifyAdmin} = require("../middleware/authAdmin")
const { deleteRecord,  updateRecord,addRecord,  getRecord, getAllRecords} = require("../servicese/rental-record.services")
router.get("/", getAllRecords)
router.get("/:id", getRecord)
router.post("/:id", protect, addRecord)
router.put("/:id", protect, updateRecord)
router.delete("/:id", protect, deleteRecord)

module.exports = router;
