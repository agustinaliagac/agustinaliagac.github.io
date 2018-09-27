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
    "url": "webpack-runtime-eeb086a44e08d2eec2ac.js"
  },
  {
    "url": "app.9a7baedc07bfac42f7a0.css"
  },
  {
    "url": "app-b6119059c7a3e715441c.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-bffc6b86eb8cc230e9bf.js"
  },
  {
    "url": "index.html",
    "revision": "5e827eb10ed33c15e3cd63525c2881d2"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "955c5ecfe0c5e0d48473706511c450ec"
  },
  {
    "url": "0.36758773931b0511fda0.css"
  },
  {
    "url": "component---src-pages-index-js-465394106d6d49541372.js"
  },
  {
    "url": "0-28287cbace278555d893.js"
  },
  {
    "url": "static/d/856/path---index-6a9-OwYqtIGDJbC5jZTOMnJFzBHU5M.json",
    "revision": "ec0150e4055d852aeaf3285683ea5e52"
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
    "revision": "f822e577a0d0e230822d096c9e84fbef"
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