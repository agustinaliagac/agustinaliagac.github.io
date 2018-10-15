/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-97962561b77c03292470.js"
  },
  {
    "url": "app.7106b9c6fdd909feef5d.css"
  },
  {
    "url": "app-2c628e97cad5920cf5bd.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4158c07ead1177917d7b.js"
  },
  {
    "url": "index.html",
    "revision": "1085d7f68a9f1d8e55f00b0c33df65ed"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "9621c55a2dcd859f60e6109f52054d36"
  },
  {
    "url": "0.3c5fd8dc8e26d3cb63eb.css"
  },
  {
    "url": "component---src-pages-index-js-1bb3ec446e4c06c347bc.js"
  },
  {
    "url": "0-cee1a49f5378c1ba6db8.js"
  },
  {
    "url": "static/d/993/path---index-6a9-UkCX9bRLiQhD4pkDJQwcYt09Lw.json",
    "revision": "976c7b4825f99cf9e806ceb18a2f5f59"
  },
  {
    "url": "component---src-pages-404-js-7db2702442c72d08d460.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "49bedcc359bf15632eacca54ca3e3cd6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});