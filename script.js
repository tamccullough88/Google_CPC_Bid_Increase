function main() {
  var SPREADSHEET_URL = 'Google_Sheet_URL'; // Replace with your Google Sheet URL
  var SHEET_NAME = 'From_GAD'; // Replace with the specific sheet name
  
  var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME); // Get the specific sheet by name
  
if (!sheet) {
    Logger.log("Sheet with name '" + SHEET_NAME + "' not found. Please check the sheet name.");
    return;
  }
  
  sheet.clear(); // Clear existing data in the sheet
  
  // Add headers to the sheet
  var headers = [
    "Campaign", "Ad group", "keyword", "Criterion Type", "Mac CPC", "Current Keyword Max CPC", 
    "Clicks", "Cost", "Impressions", "CTR", 
    "Avg. CPC", "Impr. (Abs. Top) %", "Conversions", "Cost / conv.", 
    "Conv. rate", "Conv. value", "ROAS"
  ];
  sheet.appendRow(headers);
  
  var report = AdsApp.report(
    'SELECT CampaignName, AdGroupName, Criteria, KeywordMatchType, CpcBid, ' +
    'Clicks, Cost, Impressions, Ctr, AverageCpc, ' +
    'AbsoluteTopImpressionPercentage, Conversions, CostPerConversion, ConversionRate, ' +
    'ConversionValue ' +
    'FROM KEYWORDS_PERFORMANCE_REPORT ' +
    'WHERE Impressions > 0 ' +
    'DURING LAST_30_DAYS'
  );
  
  var rows = report.rows();
  var dataExists = false;
  
  while (rows.hasNext()) {
    dataExists = true;
    var row = rows.next();
    
    // Retrieve relevant data
    var maxCpc = parseFloat(row['CpcBid']);
    var clicks = row['Clicks'];
    var convRate = parseFloat(row['ConversionRate']);
    var costPerConv = parseFloat(row['CostPerConversion']);
    var ctr = parseFloat(row['Ctr']);
    var imprAbsTop = parseFloat(row['AbsoluteTopImpressionPercentage']);
    var conversionValue = row['ConversionValue'].replace(/,/g, '');
    var cost = row['Cost'].replace(/,/g, '');
    var roas = cost > 0 ? (conversionValue/cost) : 0; // Avoid division by zero
    
    // Initialize new bid with current maxCpc
    var newBid = maxCpc;
    
    // Apply bid adjustment based on conditions
    if (clicks === 0) {
      newBid = maxCpc + 0.25; // Increase bid by 0.25 if no clicks
    } else if (convRate > 0.02 && costPerConv < 75 && ctr > 0.03 && imprAbsTop > .50 && roas > 4) {
      newBid = maxCpc * 1.15; // Increase bid by 15%
    } else if (convRate < 0.02 || costPerConv > 75 || ctr < 0.02 || imprAbsTop < .30 || roas < 3) {
      newBid = maxCpc * 0.85; // Decrease bid by 15%
    }
    
    // Append data to sheet
    sheet.appendRow([
      row['CampaignName'],
      row['AdGroupName'],
      row['Criteria'],
      row['KeywordMatchType'],
      newBid.toFixed(2), // Add the calculated new bid
      maxCpc.toFixed(2),
      clicks,
      row['Cost'],
      row['Impressions'],
      ctr.toFixed(2),
      row['AverageCpc'],
      imprAbsTop.toFixed(2),
      row['Conversions'],
      row['CostPerConversion'],
      convRate.toFixed(2),
      row['ConversionValue'],
      roas.toFixed(2) // Add the ROAS calculation here, rounding to 2 decimals
      
    ]);
  }
  
  if (!dataExists) {
    Logger.log('No data found for the selected criteria.');
  } else {
    Logger.log('Data and bid adjustments successfully exported to Google Sheet: ' + SHEET_NAME);
  }
}
