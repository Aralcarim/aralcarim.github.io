/**
 * Google Apps Script for RSVP Form Submissions
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Deploy → New deployment → Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Copy the Web app URL and add it to your .env file
 */

function doPost(e) {
  // Handle missing event object (e.g., direct URL access or CORS preflight)
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: 'No data received' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Wait up to 10 seconds for the lock

    // Parse incoming data - handles both JSON and form-urlencoded
    let data;
    const contentType = e.postData.type || '';
    const contents = e.postData.contents;

    if (contentType.includes('application/json')) {
      data = JSON.parse(contents);
    } else {
      // Parse form-urlencoded or form-data
      data = e.parameter;
    }

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attending', 'Guests', 'Dietary Restrictions', 'Comments']);
    }

    // Add a row with the form data and timestamp
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.attending || '',
      data.guests || '',
      data.dietary || '',
      data.comments || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP received' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error for debugging
    console.error('RSVP Error:', error);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Handle GET requests (e.g., if someone opens the URL directly)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'RSVP service is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Add this to handle CORS preflight requests
function doOptions(e) {
  const output = ContentService.createTextOutput('');
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
