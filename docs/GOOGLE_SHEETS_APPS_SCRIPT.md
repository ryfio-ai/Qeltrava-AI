# Google Apps Script Setup Guide for Qeltrava AI Talent Sheet

Follow this guide to enable automatic, real-time synchronization from the Qeltrava AI web application (`/en/careers/apply`) to your Google Sheet:
**Spreadsheet URL:** `https://docs.google.com/spreadsheets/d/1HLXi5rshfjYqHQdYo3hqUIbnLNJjQ2XoaqHmrNzAGjc/edit#gid=0`

---

## Step 1: Open Apps Script Editor

1. Open your Google Sheet: `https://docs.google.com/spreadsheets/d/1HLXi5rshfjYqHQdYo3hqUIbnLNJjQ2XoaqHmrNzAGjc/edit#gid=0`.
2. Click **Extensions** → **Apps Script**.
3. Clear any default code in `Code.gs` and paste the script below.

---

## Step 2: Google Apps Script Code (`Code.gs`)

```javascript
/**
 * Qeltrava AI — Talent & Engineering Community Profile Webhook Receiver
 * Spreadsheet ID: 1HLXi5rshfjYqHQdYo3hqUIbnLNJjQ2XoaqHmrNzAGjc
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Ensure Header Row Exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Candidate Code",
        "Submitted At",
        "Full Name",
        "Email",
        "WhatsApp",
        "Location",
        "Degree",
        "Specialization",
        "College",
        "Graduation Year",
        "Current Status",
        "Primary Interest",
        "Secondary Languages",
        "Frameworks",
        "AI/ML Tech",
        "Databases",
        "Cloud/DevOps",
        "Technical Level",
        "Years Experience",
        "Built Production",
        "Worked Real Client",
        "Use AI Tools",
        "AI Tools List",
        "Weekly Hours",
        "Availability",
        "Preferred Collaboration",
        "Qeltrava Area",
        "Triage Score",
        "Recommended Track",
        "Current Status"
      ]);
      
      // Format Header Row (Dark Blue background, white bold text)
      var headerRange = sheet.getRange(1, 1, 1, 30);
      headerRange.setBackground("#1B2A4A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Append Candidate Data Row
    sheet.appendRow([
      data.candidate_code || "",
      data.submitted_at || new Date().toISOString(),
      data.full_name || "",
      data.email || "",
      data.whatsapp || "",
      data.location || "",
      data.degree || "",
      data.specialization || "",
      data.college || "",
      data.graduation_year || "",
      data.current_status || "",
      data.primary_interest || "",
      data.secondary_languages || "",
      data.frameworks || "",
      data.ai_ml_tech || "",
      data.databases || "",
      data.cloud_devops || "",
      data.technical_level || "",
      data.years_experience || "",
      data.built_production || "",
      data.worked_real_client || "",
      data.use_ai_tools || "",
      data.ai_tools || "",
      data.weekly_hours || "",
      data.availability || "",
      data.collaboration || "",
      data.qeltrava_area || "",
      data.triage_score || 0,
      data.recommended_track || "",
      data.status || "APPLIED"
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", code: data.candidate_code }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**.
2. Select type: **Web app**.
3. Configuration:
   - **Description**: `Qeltrava Talent Profile Receiver v1.0`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (so Next.js server route can POST silently).
4. Click **Deploy**.
5. Copy the generated **Web App URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

---

## Step 4: Add Webhook URL to Next.js Environment

In your `.env.local` or Vercel Environment Variables:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec
```

> [!NOTE]
> Server-side route handler `/api/talent/apply` will dispatch submissions directly to this URL. The URL remains 100% private on the server and is never exposed to the client.
