const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUserAsAdmin = functions.https.onCall(async (data, context) => {
  // 1. Verifica que esté autenticado
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Debe iniciar sesión.");
  }

  // 2. Verifica que tenga rol admin en Firestore
  const uid = context.auth.uid;
  const userDoc = await admin.firestore().collection("users").doc(uid).get();
  const userData = userDoc.data();

  if (!userData || userData.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "No tienes permisos.");
  }

  // 3. Crear nuevo usuario
  const { email, password, role } = data;

  if (!email || !password) {
    throw new functions.https.HttpsError("invalid-argument", "Faltan datos.");
  }

  try {
    const newUser = await admin.auth().createUser({
      email,
      password,
    });

    // 4. Guarda el nuevo usuario en Firestore
    await admin.firestore().collection("users").doc(newUser.uid).set({
      email,
      role: role || "user",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { message: "Usuario creado correctamente", uid: newUser.uid };
  } catch (err) {
    throw new functions.https.HttpsError("internal", err.message);
  }
});
