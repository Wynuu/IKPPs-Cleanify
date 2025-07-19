
import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { EventContext } from 'firebase-functions/v1';

export const autoDeleteOldTasks = functions.pubsub.schedule('every 24 hours').onRun(async (context: EventContext) => {
  const db = admin.firestore();
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - 60); // 60 hari ke belakang

  const snapshot = await db.collection('tasks').where('createdAt', '<', admin.firestore.Timestamp.fromDate(threshold)).get();

  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));

  await batch.commit();

  console.log(`Deleted ${snapshot.size} old tasks`);
});
