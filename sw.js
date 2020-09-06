importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`WorkBox2 of uber-verif loaded🎉`);
  // workbox.routing.registerRoute(
  //   new RegExp('/*'), //cached all files
  //   new workbox.strategies.StaleWhileRevalidate()
  // );
  workbox.precaching.precacheAndRoute([]);

} else {console.log(`Boo! Workbox2 didn't load 😬`);}