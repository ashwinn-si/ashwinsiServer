# Internal Mark Analytics Endpoint Changes

Date: 2026-03-14

## Summary
The internal mark analytics payload now supports student category and detailed split-up fields for each PT.

## Updated Endpoint: `POST /internalMark/addMark`
This endpoint now accepts new fields in addition to existing fields.

### Request Body (updated)
```json
{
  "mark": "87",
  "nptel": "yes",
  "bonus": "no",
  "category": "HOPE Elite",
  "pt1": {
    "attendance": 5,
    "assignment": 10,
    "quiz": 8
  },
  "pt2": {
    "attendance": 5,
    "assignment": 9,
    "quiz": 10
  },
  "pt3": {
    "attendance": 5,
    "assignment": 10,
    "quiz": 9
  },
  "m1Mark": 28,
  "m2Mark": 26,
  "m3Mark": 27
}
```

### New fields
- `category`: student profile selected by user.
  - Allowed values: `HOPE Elite`, `PEP`, `General`
  - Default fallback on backend: `General` (if omitted/invalid)
- `pt1`, `pt2`, `pt3`: object-based split-up for each PT criteria.
  - Backend stores these as flexible objects.

## Updated Endpoint: `GET /internalMark/count/date?date=YYYY-MM-DD`
Response now includes category analytics and PT split-up analytics.

### Existing fields retained
- `viewsData`
- `nptelData`
- `bonusData`
- `markData`
- `length`

### New response fields
- `categoryData`
  - Count split by category: `HOPE Elite`, `PEP`, `General`
  - Legacy records without `category` are counted under `General`
- `pt1Data`, `pt2Data`, `pt3Data`
  - `entries`: raw PT split-up objects for filtered date
  - `criteriaTotals`: numeric totals aggregated by each criteria key
  - `withDataCount`: number of records where PT object is present and non-empty
  - `withoutDataCount`: number of records where PT object is missing/empty (legacy-safe)

### Response shape (updated)
```json
{
  "status": "success",
  "viewsData": [{ "time": "14:22:11" }],
  "nptelData": { "pass": 10, "fail": 4 },
  "bonusData": { "pass": 3, "fail": 11 },
  "markData": [78, 84, 90],
  "categoryData": {
    "HOPE Elite": 4,
    "PEP": 5,
    "General": 5
  },
  "pt1Data": {
    "entries": [{ "attendance": 5, "assignment": 10, "quiz": 8 }],
    "criteriaTotals": { "attendance": 45, "assignment": 89, "quiz": 73 }
  },
  "pt2Data": {
    "entries": [{ "attendance": 5, "assignment": 9, "quiz": 10 }],
    "criteriaTotals": { "attendance": 43, "assignment": 82, "quiz": 79 }
  },
  "pt3Data": {
    "entries": [{ "attendance": 5, "assignment": 10, "quiz": 9 }],
    "criteriaTotals": { "attendance": 44, "assignment": 87, "quiz": 76 }
  },
  "length": 14
}
```

## Compatibility Notes for Frontend
- Existing clients can continue sending old payloads; backend applies defaults.
- New frontend should send `category`, `pt1`, `pt2`, `pt3` for complete analytics.
- Mixed datasets are supported: old records without new fields will not break analytics.
- Frontend dashboard can render both:
  - category distribution from `categoryData`
  - PT criteria charts from `pt1Data/pt2Data/pt3Data.criteriaTotals`
  - PT data coverage using `withDataCount` and `withoutDataCount`

## Additional Fix Included
- `GET /internalMark/getCount` runtime issue fixed (undefined model reference). Endpoint now returns valid count response.
