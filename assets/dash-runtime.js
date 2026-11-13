/*
 * Minimal runtime for the Indian Listed REITs Tracker.
 * Provides the small `dash` API the page scripts use (data, calc, draw),
 * loading each dataset from the JSON files in /data.
 */
(function () {
  var FILES = {
    prices: 'data/prices.json',
    fundamentals: 'data/fundamentals.json',
    distributions: 'data/distributions.json',
    macro: 'data/macro.json',
    sm_reits: 'data/sm_reits.json',
    news: 'data/news.json',
    holdings: 'data/holdings.json'
  };

  var store = {};
  Object.keys(FILES).forEach(function (k) { store[k] = { status: 'loading', data: [] }; });
  var calcs = {};
  var cache = {};
  var draws = {};

  function data(id) {
    if (store[id]) return store[id];
    var c = calcs[id];
    if (!c) return { status: 'missing', data: [] };
    var ins = c.inputs.map(data);
    if (ins.some(function (s) { return s.status === 'error'; })) return { status: 'error', data: null };
    if (ins.some(function (s) { return s.status !== 'ok'; })) return { status: 'loading', data: null };
    if (!(id in cache)) {
      try {
        cache[id] = { status: 'ok', data: c.fn.apply(null, ins.map(function (s) { return s.data; })) };
      } catch (e) {
        console.error('calc ' + id, e);
        cache[id] = { status: 'error', data: null };
      }
    }
    return cache[id];
  }

  function runDraw(name) {
    var fn = draws[name];
    if (!fn) return;
    document.querySelectorAll('[data-draw="' + name + '"]').forEach(function (el) {
      try { fn(el); } catch (e) { console.error('draw ' + name, e); }
    });
  }

  function runAll() { Object.keys(draws).forEach(runDraw); }

  window.dash = {
    data: data,
    redraw: function () { runAll(); },
    calc: function (id, o) { calcs[id] = o; },
    draw: function (name, fn) {
      if (typeof fn === 'function') draws[name] = fn;
      else if (fn && fn.update) draws[name] = function (el) { fn.update(el, fn.mount ? fn.mount(el) : undefined); };
      else runDraw(name);
    },
    onData: function () {},
    loader: function () {},
    refresh: function () {},
    params: function () { return {}; },
    setParams: function () {},
    resetParams: function () {},
    setLink: function () {},
    colors: []
  };

  function load() {
    var v = Date.now();
    return Promise.all(Object.keys(FILES).map(function (k) {
      return fetch(FILES[k] + '?v=' + v)
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (rows) { store[k] = { status: 'ok', data: rows }; })
        .catch(function (e) { console.error('load ' + k, e); store[k] = { status: 'error', data: [] }; });
    })).then(function () { cache = {}; runAll(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    runAll();
    load();
    var t, w = window.innerWidth;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (window.innerWidth !== w) { w = window.innerWidth; runAll(); }
      }, 200);
    });
  });
})();
