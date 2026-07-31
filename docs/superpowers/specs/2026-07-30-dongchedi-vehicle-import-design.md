# Dongchedi Vehicle Import Design

## Goal

Add a safe external vehicle-series ingestion layer for Dongchedi data without weakening the existing Carality recommendation model.

## Approach

Dongchedi data will be stored as an external raw data source first. The current `Vehicle` table remains the recommendation source of truth. A later promotion or curation step can use the external table to improve vehicle coverage, add images and prices, and guide manual scoring.

## Data Model

Add `ExternalVehicleSeries` with one row per Dongchedi series:

- `source`: fixed source key, initially `dongchedi`.
- `sourceSeriesId`: Dongchedi `series[].id`.
- `sourceBrandId`: Dongchedi `brand_id`.
- `brandName`: Dongchedi `brand_name`.
- `seriesName`: Dongchedi `outter_name`.
- `coverUrl`: Dongchedi `cover_url`.
- `carIds`: raw `car_ids` array as JSON.
- `dcarScore`: Dongchedi `dcar_score`.
- `dealerPriceText`, `officialPriceText`, `prePriceText`, `subsidyPriceText`: original price strings.
- `hasDealerPrice`, `hasOfficialPrice`, `hasPrePrice`, `hasSubsidyPrice`: original boolean flags.
- `businessStatus`, `newCarTag`, `seriesPicCount`, `concernId`: original numeric metadata.
- `topTag`, `rankInfo`, `categoryPic`, `rawPayload`: JSON fields for source fidelity.
- `lastSyncedAt`, `createdAt`, `updatedAt`: sync metadata.

The unique key is `(source, sourceSeriesId)` so the sync script is idempotent.

## Sync Script

Create a Nest API workspace script that:

- Reads request configuration from environment variables, not source code.
- Fetches pages using `page` and `limit`.
- Stops when `series.length === 0` or `series.length < limit`, unless a max page range ends first.
- Parses and validates only the fields needed for the external table.
- Upserts rows into `ExternalVehicleSeries`.
- Supports `--dry-run` to validate parsing without writing.

Required environment variables:

- `DONGCHEDI_SERIES_ENDPOINT`
- `DONGCHEDI_COOKIE`

Optional environment variables:

- `DONGCHEDI_QUERY_STRING`
- `DONGCHEDI_USER_AGENT`
- `DONGCHEDI_REFERER`
- `DONGCHEDI_ORIGIN`

## Error Handling

The script fails fast when required config is missing. Network failures and non-success API payloads are reported with page number and message. The script does not log cookies or other sensitive headers.

## Testing

Unit tests cover:

- Parsing a successful `data.series[]` response.
- Rejecting failed API responses.
- Building paginated request URLs and form bodies.
- Stopping pagination when the final page is shorter than `limit`.

## Out of Scope

This change does not crawl car detail pages and does not automatically convert raw Dongchedi series into recommendation-ready `Vehicle` rows. That comes after the external table is populated.
