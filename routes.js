// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from '@layer0/core/router'
import { nextRoutes } from '@layer0/next'
import {CustomCacheKey} from "@layer0/core/router";

// Remove this line to suppress Next's default behavior of removing trailing slashes via a redirect.
// If trailingSlash: true is set in next.config.js, removing this line will remove the redirect that adds the trailing slash.
nextRoutes.setEnforceTrailingSlash(true)

const cacheConfig = {
    browser: {
        maxAgeSeconds: 0, // disabled
        serviceWorkerSeconds: 60, // 1 minute

    },
    edge : {
        maxAgeSeconds: 60 * 60 * 2, // 2 hours
        staleWhileRevalidateSeconds: 60 * 60 * 4,  // 4 hours
    }
};

export default new Router()

// This route generates regex in "__layer0__/cache-manifest.js" which catches all prefetch requests
// but doesn't have set cache config with serviceWorkerSeconds so onlyCachePrefetches will be set to true
.match('/:path*', ({ setResponseHeader }) => {
    setResponseHeader('x-xss-protection', ' 1; mode=block')
})

.match('/api/shop/:slug*', ({ cache }) => {
    cache(cacheConfig);
})

.match('/api/img/:id', ({ cache }) => {
    cache(cacheConfig);
})

.match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
})
.use(nextRoutes) // automatically adds routes for all files under /pages
