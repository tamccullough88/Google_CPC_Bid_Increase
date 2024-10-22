# Google Ads Script: Dynamic Bid Adjustment with Performance Metrics

This Google Ads Script retrieves keyword performance data from your Google Ads account and exports it to a specified Google Sheet. It calculates the Return on Ad Spend (ROAS) and dynamically adjusts keyword bids based on custom performance conditions, such as clicks, conversion rate, cost per conversion, and other key metrics. The new bids are calculated and exported along with the performance data to the Google Sheet.

## Features

- **Exports Google Ads keyword performance data**: Retrieves key performance metrics such as Clicks, Cost, Impressions, CTR, Conversion Rate, ROAS, and more.
- **Calculates ROAS**: Automatically calculates ROAS (Return on Ad Spend) for each keyword based on conversion value and cost.
- **Dynamic Bid Adjustments**: Adjusts keyword bids based on custom conditions:
  - Increases bid by 0.25 if no clicks have been recorded.
  - Increases bid by 15% if high-performance conditions are met (high Conversion Rate, low Cost per Conversion, high CTR, etc.).
  - Decreases bid by 15% if performance metrics fall below certain thresholds (low Conversion Rate, high Cost per Conversion, low CTR, etc.).
- **Data export to Google Sheets**: All data, including the calculated ROAS and adjusted keyword bids, are exported to a specified Google Sheet.

## Prerequisites

Before running the script, ensure the following:

1. You have a Google Ads account with access to Google Ads Scripts.
2. You have a Google Sheet where the data will be exported. The URL and sheet name need to be specified in the script.

## Installation

1. **Clone or download the project**:  
   Download or clone this repository to your local machine.

2. **Google Ads Script Setup**:
   - Go to your [Google Ads account](https://ads.google.com/).
   - Navigate to `Tools & Settings` > `Scripts` under the `Bulk Actions` section.
   - Click the `+` button to create a new script.
   - Copy the provided script into the script editor.

3. **Google Sheets Setup**:
   - Create a Google Sheet and note the URL.
   - In the script, replace the `SPREADSHEET_URL` variable with the URL of your Google Sheet.
   - Ensure the sheet name is correct (default is `'From_GAD'`), or update the `SHEET_NAME` variable to match your sheet name.

4. **Authorize the Script**:  
   When you run the script for the first time, Google will ask for authorization to access your Google Ads data and Google Sheets. Grant the necessary permissions.

## Usage

1. Open the script in your Google Ads account.
2. Click `Run` to execute the script.
3. The script will:
   - Retrieve data from your Google Ads account.
   - Calculate ROAS for each keyword.
   - Adjust bids based on performance metrics.
   - Export the data, including the calculated ROAS and new bids, to the specified Google Sheet.

## Logic for Bid Adjustments

- **No Clicks (Clicks = 0)**: Increase the bid by 0.25.
- **High Performance**: Increase the bid by 15% if the following conditions are met:
  - Conversion Rate > 0.02
  - Cost per Conversion < 75
  - CTR > 0.03
  - Impressions (Abs. Top %) > 50%
  - ROAS > 4
- **Low Performance**: Decrease the bid by 15% if any of the following conditions are met:
  - Conversion Rate < 0.02
  - Cost per Conversion > 75
  - CTR < 0.02
  - Impressions (Abs. Top %) < 30%
  - ROAS < 3

## Example Output

The script will generate a Google Sheet with the following columns:

| Campaign | Ad group | Keyword | Criterion Type | New Bid | Current Keyword Max CPC | Clicks | Cost | Impressions | CTR | Avg. CPC | Impr. (Abs. Top) % | Conversions | Cost / conv. | Conv. rate | Conv. value | ROAS |
| -------- | -------- | ------- | -------------- | ------- | ----------------------- | ------ | ---- | ----------- | --- | -------- | ------------------ | ----------- | ------------- | ---------- | ----------- | ---- |
| ExampleCampaign1 | ExampleAdGroup1 | ExampleKeyword1 | Exact | 2.88 | 2.50 | 100 | 150.00 | 10000 | 1.00% | 1.50 | 60% | 5 | 30.00 | 0.05 | 150.00 | 1.00 |
| ExampleCampaign2 | ExampleAdGroup2 | ExampleKeyword2 | Broad | 2.01 | 1.75 | 0 | 0.00 | 0 | 0.00% | 0.00 | 0% | 0 | 0.00 | 0.00 | 0.00 | 0.00 |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out to [Your Name] at [Your Email].
