# Google Sheets RSVP Setup Guide

## Step 1: Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank spreadsheet**
3. Name it something like "Wedding RSVP"

## Step 2: Add Headers

In the first row, add these headers:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| **Timestamp** | **Name** | **Email** | **Attending** | **Guests** | **Dietary** | **Comments** |

## Step 3: Add the Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any code that's there
3. Copy the code from `GOOGLE_SHEETS_API_SCRIPT.js` in your project
4. Paste it into the Apps Script editor
5. Click the **Save** icon (floppy disk)

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → select **Web app**
3. Fill in the fields:
   - **Description**: "RSVP Form API"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web app URL** (it looks like: `https://script.google.com/macros/s/.../exec`)

## Step 5: Add URL to Your Project

1. Open your `.env` file in the project
2. Paste the URL you copied:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbzzxX5l0vuzlk_GTuE12PIetruYzca9Zbi9tT82LYVudvcpL5V1PkvF61j8jQbQ8rTp/exec
```

3. Save the file

## Step 6: Restart the Dev Server

1. Stop the current server (Ctrl+C in terminal)
2. Run `npm run dev`
3. Open http://localhost:XXXX in your browser

## Step 7: Test It!

1. Go to the RSVP page on your website
2. Fill out the form and submit
3. Check your Google Sheet — a new row should appear!

---

## Troubleshooting

### "RSVP form is not yet configured"
- Make sure you restarted the dev server after adding the URL to `.env`
- Check that the URL in `.env` matches the Web app URL exactly

### Form submits but no data appears in Google Sheet
- Go to Apps Script → **Deployments** → Check the status is "Active"
- Make sure you selected "Anyone" for "Who has access"
- Check the script has no errors (click **Run** in Apps Script to test)

### Want to change the sheet later?
- The script writes to the active sheet — just make sure the correct sheet is open
- No need to redeploy, the data will go to whatever sheet is active

### Need to update the script?
1. Make changes in Apps Script
2. Deploy → New deployment → Web app
3. Select **New** in "Version" (not "Latest")
4. Deploy — you'll get a new URL
5. Update `.env` with the new URL
