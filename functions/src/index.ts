/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const clockodoHook = onRequest(
    {
        cors: ["https://clockodo.com"],
        region: "europe-west3",
    }, async (req, res) => {


        // Ensure the request is a POST request.
        if (req.method !== "POST") {
            res.status(405).send("Method Not Allowed");
            return;
        }

        try {
            // Firebase automatically parses incoming requests with a
            // 'Content-Type: application/json' header. The parsed JSON object
            // is available on the `request.body` property.
            const data = req.body;
            logger.info("Successfully parsed JSON payload:", { structuredData: true, data });


            // You can now access properties from the parsed JSON.
            // For this example, we'll look for a 'name' property.
            const entryId = data.payload.entry.id || "?";

            logger.info(`entry id: ${entryId}`);
            // Send a success response back to the client.
            res.status(200).json({
                message: `parsed ${entryId}`,
                receivedData: data,
            });

        } catch (error) {
            // Log any errors that occur during processing.
            logger.error("Error processing request", { error });

            // Send a generic server error response.
            res.status(500).send("Internal Server Error");
        }
    });
