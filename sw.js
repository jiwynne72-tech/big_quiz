// ======================================================
// JW BrainBox Academy
// Service Worker
// Version 1.0
// ======================================================

const CACHE_NAME = "jw-brainbox-v1";

// Files to cache
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",

  "./World_Flags_Quiz_Full(2).html",
  "./World_Geography_Trainer_50(2).html",
  "./mental_math_refresher_game.html",
  "./Ultimate_Bard_Quiz_Round2.html",
  "./Crown To Coffin.html",
  "./Famous_Latin_Sayings_Game_60(1).html",
  "./Greek_Master_v3(1).html",
  "./50 Bard.html",
  "./Call My Bluff.html",
  "./rompicapo.html"
];

// -------------------------------------
// Install
// -------------------------------------

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                console.log("Caching files...");

                return cache.addAll(FILES_TO_CACHE);

            })

    );

});

// -------------------------------------
// Activate
// -------------------------------------

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys =>

                Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                )

            )

    );

    self.clients.claim();

});

// -------------------------------------
// Fetch
// -------------------------------------

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                if (response) {

                    return response;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        return caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(event.request, networkResponse.clone());

                                return networkResponse;

                            });

                    });

            })

    );

});