// Google Apps Script Web App — backend for group-maker/index.html.
// This file is a reference copy. Deploying it means pasting it into the
// Apps Script editor bound to the roster Google Sheet — see README.md.
// Editing this file in the repo does NOT update the live deployment.

const SHEET_NAME = 'Roster';
const CLEAR_PIN = 'CHANGE_ME_BEFORE_DEPLOYING';

function doGet(e) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1).filter(r => r[0]); // skip header, skip blanks
  const students = rows.map(r => ({ name: String(r[0]), gender: String(r[1]), ts: r[2] }));
  return jsonOutput({ ok: true, students });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); }
  catch (err) { return jsonOutput({ ok: false, error: 'Bad request' }); }

  const sheet = getSheet();

  if (body.action === 'add') {
    const name = (body.name || '').toString().trim();
    const gender = (body.gender || '').toString().trim();
    if (!name || !gender) return jsonOutput({ ok: false, error: 'Missing name or gender' });
    sheet.appendRow([name, gender, new Date()]);
    return jsonOutput({ ok: true });
  }

  if (body.action === 'clear') {
    if (body.pin !== CLEAR_PIN) return jsonOutput({ ok: false, error: 'Wrong PIN' });
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) sheet.getRange(2, 1, lastRow - 1, 3).clearContent();
    return jsonOutput({ ok: true });
  }

  return jsonOutput({ ok: false, error: 'Unknown action' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Name', 'Gender', 'Timestamp']);
  }
  return sheet;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
