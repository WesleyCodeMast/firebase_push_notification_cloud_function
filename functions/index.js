const admin = require("firebase-admin");
const functions = require("firebase-functions");

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

exports.sendStoreCatalog = functions.firestore
    .document("restaurant_products_catalog/{cid}")
    .onCreate(async (snapshot, context) => {
        const newOrderData = snapshot.data();
        const orderId = context.params.orderId;
        const shopIds = newOrderData.shopIds;
        debugger;
        if (!shopIds || shopIds.length == 0) {
            console.log("there is no user id...");
            return null;
        }
        for(var i = 0; i < shopIds.length ; i ++ )
        {
            const newNotificationData = {
                created_at: new Date(),
                data: {
                    action:"openOrderInfo",
                    isNewOrder: true,
                    orderUuid: orderId
                },
                message: "This is test",
                read: false,
                send: false,
                send_at: null,
                title: "New message from admin",
                user_type: "business",
                order_type: newOrderData?.shopType?.type,
                user_uuid: shopIds[i],
            };

            try {
                const newNotificationRef1 = admin.firestore().
                collection("test_notification").doc();
                await newNotificationRef1.set(newNotificationData);
                const newNotificationRef = admin.firestore().
                    collection("push_notifications").doc();
                await newNotificationRef.set(newNotificationData);
            } catch (error) {
                console.log("there is a error", error);
            }
        }
});

    
exports.sendNewProductCatalogNotification = functions.firestore
.document("stores_products_catalog/{catId}")
.onCreate(async (snapshot, context) => {
    const newOrderData = snapshot.data();

    const consumerId = newOrderData.consumerId;
    debugger;
    if (!consumerId) {
        console.log("there is no user id...");
        return null;
    }

    const newNotificationData = {
        created_at: new Date(),
        data: null,
        message: "This is test",
        read: false,
        send: false,
        send_at: null,
        title: "New message from admin",
        user_type: "client",
        user_uuid: consumerId,
    };
    try {
        const newNotificationRef = admin.firestore().
            collection("push_notifications").doc();
        await newNotificationRef.set(newNotificationData);
        const newNotificationRef1 = admin.firestore().
            collection("test_notification").doc();
        await newNotificationRef1.set(newNotificationData);
    } catch (error) {
        console.log("there is a error", error);
    }
});
