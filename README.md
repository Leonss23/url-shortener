# URL Shortener

## To do / Ideas

- Add documentation
- Check other URL Shortener services for ideas
- Use Cloudflare KV as cache (reduced latency)
- Use Go for Workers/Functions (WASM)
- URL deduplication
  - a URL table with the deduplicated, actual links
  - another table for the URLs a user tracks
- Features
  - Better client errors
  - URL click counter
  - URL tracking panel
- Base requirements
  - Short URL
    - [x] Creation endpoint
    - [x] Creation page
    - [x] Redirection endpoint
