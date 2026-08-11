# Google Apps Script Setup Guide for Qeltrava AI Talent Sheet (5-Layer Architecture)

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
 * Qeltrava AI — Talent & Engineering Community Operating System Receiver
 * Spreadsheet ID: 1HLXi5rshfjYqHQdYo3hqUIbnLNJjQ2XoaqHmrNzAGjc
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Ensure Header Row Exists with complete 5-layer columns (No duplicates)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Candidate Code",
        "Submitted At",
        "Full Name",
        "Email",
        "WhatsApp",
        "Location",
        "LinkedIn",
        "GitHub",
        "Portfolio",
        "Degree",
        "Specialization",
        "College",
        "Graduation Year",
        "Current Education Status",
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
        "Triage Score (0-100)",
        "Recommended Track",
        "Reviewer Name",
        "Profile Review Score (/20)",
        "Reviewer Decision",
        "Reviewer Notes",
        "Task ID",
        "Task Title",
        "Task Status",
        "Task Repo URL",
        "Task Demo URL",
        "Task Score (/45)",
        "Interview Date",
        "Technical Understanding (/20)",
        "Communication Score (/10)",
        "Ownership Score (/5)",
        "Interview Score (/35)",
        "Final Score (/100)",
        "Talent Tier",
        "Talent Pool Status",
        "Assigned Project",
        "Assigned Role",
        "WhatsApp Contacted",
        "Canonical Lifecycle Status"
      ]);
      
      // Format Header Row (Dark Blue background, white bold text)
      var headerRange = sheet.getRange(1, 1, 1, 54);
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
      data.linkedin || "",
      data.github || "",
      data.portfolio || "",
      data.degree || "",
      data.specialization || "",
      data.college || "",
      data.graduation_year || "",
      data.current_status_education || data.current_status || "",
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
      data.reviewer_name || "",
      data.profile_review_score || "",
      data.reviewer_decision || "",
      data.reviewer_notes || "",
      data.task_id || "",
      data.task_title || "",
      data.task_status || "",
      data.task_repository_url || "",
      data.task_demo_url || "",
      data.task_score || "",
      data.interview_date || "",
      data.technical_understanding_score || "",
      data.communication_score || "",
      data.ownership_score || "",
      data.interview_score || "",
      data.final_score || "",
      data.talent_tier || "",
      data.talent_pool_status || "",
      data.assigned_project || "",
      data.assigned_role || "",
      data.whatsapp_contacted ? "Yes" : "No",
      data.canonical_status || data.status || "APPLIED"
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
   - **Description**: `Qeltrava Talent System Receiver v2.0`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Copy the generated **Web App URL** into `.env.local` as `GOOGLE_SHEETS_WEBHOOK_URL`.
