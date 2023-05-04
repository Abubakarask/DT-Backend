# API Documentation

This API is used to create and manage nudge for events.

## Object Data Model

```js
const mongoose = require("mongoose");

const nudgeSchema = new mongoose.Schema({
  event_id: Number,
  title: { type: String, maxlength: 60 },
  image: String,
  schedule: Date,
  description: String,
  icon: String,
  invitation: String,
});

module.exports = mongoose.model("Nudge", nudgeSchema);
```

## API Structure
The following table provides the structure of the API, including the types of requests, the base URL, API endpoints, payload, and description of each endpoint.

| Request Type | Base URL         | API Endpoint        | Payload                                                       | Description                                            |
|--------------|-----------------|---------------------|----------------------------------------------------------------|--------------------------------------------------------|
| POST         | /api/v1/nudge   | /create             | event_id (required), title (required, max 60 chars), image (optional), schedule (required), description (required), icon (optional), invitation (optional) | Creates a new nudge for the specified event.           |
| GET          | /api/v1/nudge   | /                   | -                                                              | Retrieves all nudges.                                  |
| GET          | /api/v1/nudge   | /:nudgeId           | -                                                              | Retrieves a specific nudge by its ID.                   |
| PUT          | /api/v1/nudge   | /:nudgeId/update   | event_id (optional), title (optional, max 60 chars), image (optional), schedule (optional), description (optional), icon (optional), invitation (optional)   | Updates an existing nudge by its ID.                    |
| DELETE       | /api/v1/nudge   | /:nudgeId/delete   | -                                                              | Deletes an existing nudge by its ID.                    |

## Payload

The following is a description of the expected payload for each endpoint:

### Create a new nudge
- event_id (required): The ID of the event for which to create the nudge.
- title (required, max 60 chars): The title of the nudge.
- image (optional): The image to be displayed as the cover for the nudge.
- schedule (required): The time at which to send the nudge.
- description (required): The description of the nudge.
- icon (optional): The icon to be displayed along with the nudge.
- invitation (optional): The one-line invitation to be displayed along with the nudge.

### Update an existing nudge
- event_id (optional): The ID of the event associated with the nudge.
- title (optional, max 60 chars): The title of the nudge.
- image (optional): The image to be displayed as the cover for the nudge.
- schedule (optional): The time at which to send the nudge.
- description (optional): The description of the nudge.
- icon (optional): The icon to be displayed along with the nudge.
- invitation (optional): The one-line invitation to be displayed along with the nudge.

## Response

The API will respond with a JSON object containing the following fields:

Field | Type | Description
----- | ---- | -----------
success | boolean | Whether the request was successful or not.
message | string | A message indicating the status of the request.
nudge | object | The nudge object that was created/updated/deleted.
error | object | An object containing details about any errors that occur.

### Success Response

**POST /api/nudges**

If the request to create a nudge is successful, the API will respond with a JSON object containing the newly created nudge.

```js
{
  "success": true,
  "message": "Nudge created successfully",
  "nudge": {
    "_id": "60d2b74245cc930024f15b45",
    "event_id": "60d2b73c45cc930024f15b44",
    "title": "Join our event!",
    "image": "https://example.com/image.png",
    "schedule": "2022-06-25T18:30:00.000Z",
    "description": "Don't miss out on this amazing event!",
    "icon": "https://example.com/icon.png",
    "invitation": "You're invited to our event!"
  }
}
```

**GET /api/nudges/:nudgeId**

If the request to retrieve a nudge by ID is successful, the API will respond with a JSON object containing the nudge information.

```js
{
  "success": true,
  "nudge": {
    "_id": "60d2b74245cc930024f15b45",
    "event_id": "60d2b73c45cc930024f15b44",
    "title": "Join our event!",
    "image": "https://example.com/image.png",
    "schedule": "2022-06-25T18:30:00.000Z",
    "description": "Don't miss out on this amazing event!",
    "icon": "https://example.com/icon.png",
    "invitation": "You're invited to our event!"
  }
}
```

**PUT /api/nudges/:nudgeId**

If the request to update a nudge is successful, the API will respond with a JSON object containing the updated nudge.

```js
{
  "success": true,
  "message": "Nudge updated successfully",
  "nudge": {
    "_id": "60d2b74245cc930024f15b45",
    "event_id": "60d2b73c45cc930024f15b44",
    "title": "Updated nudge title",
    "image": "https://example.com/updated-image.png",
    "schedule": "2022-06-25T18:30:00.000Z",
    "description": "Updated nudge description",
    "icon": "https://example.com/updated-icon.png",
    "invitation": "Updated nudge invitation"
  }
}
```

**DELETE /api/nudges/:nudgeId**

If the request to delete a nudge is successful, the API will respond with a JSON object containing the ID of the deleted nudge.

```js
{
  "success": true,
  "message": "Nudge deleted successfully",
  "nudge": "<deleted nudge ID>"
}
``` 

## Error Response

The API may respond with an error message in the following JSON format:

```js
{
  "success": false,
  "message": "An error occurred while processing the request",
  "error": {
    "code": 400,
    "message": "Bad request"
  }
}
```

The error object may contain additional details about the error that occurred.

The API may return the following errors:

| Error Code | Error Message  | Description                                                 |
| ---------- | --------------| ----------------------------------------------------------- |
| 400        | Bad request   | The request was malformed or missing required parameters.   |
| 401        | Unauthorized  | The request did not include valid authentication credentials or the provided credentials were invalid.   |
| 404        | Not found     | The requested resource was not found.                       |
| 500        | Internal server error | An error occurred while processing the request.         |

**Authentication**
This API does not require authentication for any of its endpoints.

**Rate Limiting**
This API does not have rate limiting implemented.

**Conclusion**
This API is designed to create, retrieve, update and delete nudges for events. It uses a MongoDB database and Mongoose for object modeling. The API is RESTful and returns responses in JSON format.
