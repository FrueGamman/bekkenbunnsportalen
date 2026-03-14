/**
 * Directus response cache using localStorage (stale-while-revalidate).
 * - On cache hit: returns cached data immediately (stale), then revalidates in background
 * - TTL: 5 minutes before forcing a fresh fetch
 * - Gracefully handles unavailable localStorage (private mode, SSR, quota errors)
 */

const CACHE_TTL_MS = 1 * 60 * 1000; // 1 minute

interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

function readCache<T>(key: string): T | null {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const entry: CacheEntry<T> = JSON.parse(raw);
        return entry.data ?? null;
    } catch {
        return null;
    }
}

function writeCache<T>(key: string, data: T): void {
    try {
        const entry: CacheEntry<T> = { data, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(entry));
    } catch {
        // Quota exceeded or unavailable — ignore silently
    }
}

function isCacheStale(key: string): boolean {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return true;
        const entry: CacheEntry<unknown> = JSON.parse(raw);
        return Date.now() - entry.timestamp > CACHE_TTL_MS;
    } catch {
        return true;
    }
}

/**
 * Stale-while-revalidate fetch helper.
 *
 * @param key       Cache key (use a stable unique string per query)
 * @param fetcher   Async function that calls the Directus API
 * @param onData    Callback invoked with data — may be called twice:
 *                    1st with cached data (instantly), 2nd with fresh data (after network)
 * @param onLoading Called with `true` only when there is no cached data at all
 * @returns cleanup function (call on component unmount)
 */
export function fetchWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    onData: (data: T) => void,
    onLoading: (loading: boolean) => void,
): () => void {
    let cancelled = false;

    const cached = readCache<T>(key);

    if (cached !== null) {
        // Instant: serve stale data right away — no loading spinner
        onLoading(false);
        onData(cached);

        if (!isCacheStale(key)) {
            // Not yet stale — skip revalidation
            return () => { cancelled = true; };
        }
        // Stale: revalidate silently in background (no loading spinner)
        (async () => {
            try {
                const fresh = await fetcher();
                if (!cancelled && fresh !== null && fresh !== undefined) {
                    writeCache(key, fresh);
                    onData(fresh);
                }
            } catch {
                // Ignore — stale data stays
            }
        })();
    } else {
        // No cache at all — show loading state and fetch
        onLoading(true);
        (async () => {
            try {
                const fresh = await fetcher();
                if (!cancelled && fresh !== null && fresh !== undefined) {
                    writeCache(key, fresh);
                    onData(fresh);
                }
            } catch (err) {
                console.error(`[directusCache] fetch error for key "${key}":`, err);
            } finally {
                if (!cancelled) onLoading(false);
            }
        })();
    }

    return () => { cancelled = true; };
}
