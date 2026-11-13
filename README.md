# Indian Listed REITs Tracker

An educational tool by 1 Finance that tracks every listed Indian Real Estate Investment Trust (REIT) in one page: unit prices, distribution yields, NAV, payouts, portfolio metrics, debt, tax notes and the latest news.

SEBI RIA Registration No: INA000017523 | 1 Finance Private Limited

## What the page shows

The page is split into six tabs so each view stays uncluttered.

- **Overview:** four headline numbers, a card for each REIT (yield, price to NAV, occupancy, what it owns and where) and the three latest news items.
- **Holdings:** pick a REIT to see every property it owns, with city, type, area, occupancy and share of portfolio value, plus value split by city and by asset type.
- **Compare:** a sortable table of price, market cap, trailing yield, spread over the G-sec, price to NAV, occupancy, WALE and LTV, with yield and price-to-NAV charts.
- **Payouts:** quarterly distribution per unit, the dividend, interest and debt repayment mix, and an income estimator.
- **News:** results, payouts, deals, debt, index changes, rules and tax, filterable by REIT and topic, each linked to its source.
- **Learn:** rates backdrop, SM REITs, definitions, tax notes, 2026 changes and sources.

Each tab has its own link, for example `index.html#holdings`.

REITs covered: Embassy Office Parks REIT, Mindspace Business Parks REIT, Brookfield India Real Estate Trust, Nexus Select Trust, Knowledge Realty Trust and Bagmane Prime Office REIT, plus the listed SM REIT schemes.

## Files

| Path | What it holds |
|---|---|
| `index.html` | The page, its styles and the scripts that draw it |
| `assets/dash-runtime.js` | Small loader that reads the JSON files and draws the page |
| `assets/theme.css` | Brand fonts and colour tokens (light and dark) |
| `fonts/` | Fira Sans, under the SIL Open Font License |
| `data/prices.json` | Unit price, price date, 52-week high and low per REIT |
| `data/fundamentals.json` | NAV, GAV, LTV, occupancy, WALE, area, rating, latest payout and its mix, guidance, source link |
| `data/distributions.json` | Distribution per unit for each quarter since FY26 |
| `data/macro.json` | RBI repo rate and 10-year G-sec yield |
| `data/news.json` | News items: date, REIT, topic, headline, summary, source, link |
| `data/sm_reits.json` | SM REIT schemes, listed and filed |
| `data/holdings.json` | Every property per REIT: city, type, completed and total area, occupancy, WALE, share of value, hotel keys or solar MW, notes |

Yields, market cap, price to NAV and the other derived figures are worked out in the page from these files, so updating a JSON file updates every chart and table that uses it.

## Run it locally

The page loads its data with `fetch`, so open it through a local web server rather than by double-clicking the file:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

In the repository settings, open **Pages**, choose **Deploy from a branch**, pick `main` and the root folder, and save. The site appears at `https://<your-username>.github.io/<repository-name>/`.

## Data and sources

Figures as of 30 September 2026 come from each REIT's Q2 FY27 earnings presentation or press release (linked in `data/fundamentals.json` and on the page). Earlier quarterly payouts come from each REIT's quarterly press releases. Unit prices were taken on 12 November 2026 from INDmoney and Screener.in. Rates come from the RBI and market reports. News summaries are written in our own words and link to the original source.

The Claude dashboard version of this tracker refreshes its data every weekday evening. This repository holds a snapshot unless the JSON files are updated here too.

## Disclaimer

This tool is for education and information only. It is not investment advice or a recommendation to buy or sell any security. Distributions are not guaranteed and unit prices can fall. Tax notes are general and may not suit individual situations. Please speak to a Qualified Financial Advisor before you invest.
