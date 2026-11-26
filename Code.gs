const TOKEN = '123456'; // Dat chuoi bi mat giong GSHEET_TOKEN trong src/main.cpp

function doPost(e) {
  if (!e || !e.parameter || e.parameter.token !== TOKEN) {
    return ContentService.createTextOutput('ERR_TOKEN');
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = e.parameter.action || '';
  const body = (e.postData && e.postData.contents) ? e.postData.contents.trim() : '';
  const lines = body ? body.split(/\r?\n/).filter(l => l.trim().length > 0) : [];

  if (action === 'students') {
    let sh = ss.getSheetByName('HocSinh') || ss.insertSheet('HocSinh');
    sh.clear();
    sh.appendRow(['Ma HS', 'Ho ten']);
    lines.forEach(line => {
      const i = line.indexOf(',');
      if (i > 0) sh.appendRow([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    });
    return ContentService.createTextOutput('OK');
  }

  if (action === 'attend') {
    let sh = ss.getSheetByName('DiemDanh') || ss.insertSheet('DiemDanh');
    if (sh.getLastRow() === 0) sh.appendRow(['Thoi gian', 'Ma HS', 'Ho ten', 'Buoi']);
    lines.forEach(line => {
      const p = line.split(',');
      if (p.length >= 4) sh.appendRow([p[0].trim(), p[1].trim(), p.slice(2, -1).join(',').trim(), p[p.length - 1].trim()]);
    });
    return ContentService.createTextOutput('OK');
  }

  return ContentService.createTextOutput('ERR_ACTION');
}
