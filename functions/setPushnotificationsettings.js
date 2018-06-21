/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

exports.updateNotificationSettings = functions.https.onRequest((req, res) => {
    const newData = {
        notificationSettings:{
            importantUpdates: (req.body.importantUpdates.toLowerCase() == 'true'),
            reviewSubmittedByCustomers: (req.body.reviewSubmittedByCustomers.toLowerCase() == 'true'),
            discounts: (req.body.discounts?.toLowerCase() == 'true'),
            newItemsAddedToCatalog: (req.body.newItemsAddedToCatalog?.toLowerCase() == 'true'),
            promotions: (req.body.promotions?.toLowerCase() == 'true'),
            newOrdersNotificationType: "push"
        }
      // Define your custom fields and specific data here
    };
    console.log(newData);
    // const documentRef = admin.firestore().collection('stores').doc(req.body.documentId);
    const documentRef = admin.firestore().collection('stores').doc(req.body.documentId);
    
    return documentRef.update(newData)
      .then(() => {
        res.status(200).send('Database updated successfully');
      })
      .catch((error) => {
        console.error('Error updating database:', error);
        res.status(500).send('Error updating database');
      });
  });
  