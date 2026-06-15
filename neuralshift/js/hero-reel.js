(function () {
  var video = document.getElementById('heroReel');
  var btn = document.getElementById('heroReelUnmute');
  if (!video || !btn) return;

  btn.addEventListener('click', function () {
    var nowUnmuted = video.muted;
    video.muted = !nowUnmuted;
    btn.setAttribute('aria-pressed', String(nowUnmuted));
    btn.setAttribute('aria-label', nowUnmuted ? 'Mute reel' : 'Unmute reel');
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  });
})();
