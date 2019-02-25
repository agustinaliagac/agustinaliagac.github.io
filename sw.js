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

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

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
    "url": "webpack-runtime-1ce37777c6fa055ae4ae.js"
  },
  {
    "url": "app.59193f867c89c229b2e5.css"
  },
  {
    "url": "app-3e472ceb66a42d15a20f.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-0e4b4288b1c39336918e.js"
  },
  {
    "url": "index.html",
    "revision": "5e1ff7007b787c39ac4f2ebf60ffaa56"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "6fce966da893df606d954e1e0d9fce66"
  },
  {
    "url": "0.6740875e7f9f337d555e.css"
  },
  {
    "url": "component---src-pages-index-js-41d6dd6d9e218ced072f.js"
  },
  {
    "url": "0-4a6c1edcb8f8f2a9758a.js"
  },
  {
    "url": "static/d/349/path---index-6a9-BH2sp8pmt8QeZS3qCtmvXXONltw.json",
    "revision": "5e4c0c1d3cacaf1d805fdbfaaffa65c4"
  },
  {
    "url": "component---src-pages-404-js-238ccf6503f5e8c181d4.js"
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