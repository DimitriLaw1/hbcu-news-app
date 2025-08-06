const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const axios = require("axios");

const BREVO_KEY = defineSecret("BREVO_KEY");

exports.subscribeToNewsletter = onRequest(
    {
      secrets: [BREVO_KEY],
      cors: true,
    },
    async (req, res) => {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }

      const {email, SCHOOL, OPTIONS, MAJOR, CLASSIFICATION, INSTAGRAM} =
      req.body;

      const data = {
        email,
        attributes: {SCHOOL, OPTIONS, MAJOR, CLASSIFICATION, INSTAGRAM},
        listIds: [4],
        updateEnabled: true,
      };

      try {
        const brevoRes = await axios.post(
            "https://api.brevo.com/v3/contacts",
            data,
            {
              headers: {
                "api-key": BREVO_KEY.value(),
                "Content-Type": "application/json",
              },
            },
        );
        console.log(
            "🔑 BREVO_KEY starts with:",
            BREVO_KEY.value().substring(0, 5),
        );

        console.log("✅ Brevo response:", brevoRes.data);
        return res.status(201).send("Successfully subscribed");
      } catch (error) {
        console.error(
            "❌ Brevo Error Response:",
            error.response?.data || error.message,
        );
        return res.status(500).send("Subscription failed");
      }
    },
);
