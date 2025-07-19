/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.autoDeleteOldTasks = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const db = admin.firestore();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - 30); // 30 hari ke belakang

  const snapshot = await db.collection("tasks").where("createdAt", "<", admin.firestore.Timestamp.fromDate(threshold)).get();

  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));

  await batch.commit();

  console.log(`Deleted ${snapshot.size} old tasks`);
});
