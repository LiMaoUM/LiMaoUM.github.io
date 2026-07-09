/* Progressive enhancement for the research network.
   The SVG is already in the DOM (rendered by bin/build_network.py) and is a
   complete, readable figure with JS off. This adds: hover-isolate a thread,
   click/keyboard to open a paper, drag to rearrange, and an optional "Explore"
   force relaxation. Vanilla JS, no dependencies. */
(function () {
  "use strict";
  var svg = document.getElementById("network");
  if (!svg || typeof svg.querySelectorAll !== "function") return;

  var nodes = Array.prototype.slice.call(svg.querySelectorAll(".node"));
  var edges = Array.prototype.slice.call(svg.querySelectorAll(".edge"));
  var labels = Array.prototype.slice.call(svg.querySelectorAll(".node-label, .node-sub"));
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- adjacency, keyed by node id ----
  var pos = {};          // id -> {x, y}
  var adj = {};          // id -> Set(neighbor id)
  var edgeByPair = [];   // {el, from, to}
  nodes.forEach(function (n) {
    var id = n.getAttribute("data-id");
    var m = /translate\(([-\d.]+)\s+([-\d.]+)\)/.exec(n.getAttribute("transform") || "");
    pos[id] = m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
    adj[id] = {};
  });
  edges.forEach(function (e) {
    var f = e.getAttribute("data-from"), t = e.getAttribute("data-to");
    edgeByPair.push({ el: e, from: f, to: t });
    if (adj[f]) adj[f][t] = true;
    if (adj[t]) adj[t][f] = true;
  });

  function labelOwner(el) { return el.parentNode; } // labels live inside their node <g>

  // ---- hover isolate ----
  function isolate(id) {
    var keep = {};
    keep[id] = true;
    Object.keys(adj[id] || {}).forEach(function (k) { keep[k] = true; });
    nodes.forEach(function (n) {
      n.classList.toggle("faded", !keep[n.getAttribute("data-id")]);
    });
    edgeByPair.forEach(function (e) {
      var on = e.from === id || e.to === id;
      e.el.classList.toggle("faded", !on);
    });
  }
  function clearIsolate() {
    nodes.forEach(function (n) { n.classList.remove("faded"); });
    edges.forEach(function (e) { e.classList.remove("faded"); });
  }

  // ---- geometry helpers ----
  function moveNode(n, x, y) {
    var id = n.getAttribute("data-id");
    pos[id] = { x: x, y: y };
    n.setAttribute("transform", "translate(" + x + " " + y + ")");
    edgeByPair.forEach(function (e) {
      if (e.from === id) { e.el.setAttribute("x1", x); e.el.setAttribute("y1", y); }
      if (e.to === id) { e.el.setAttribute("x2", x); e.el.setAttribute("y2", y); }
    });
  }
  function clientToSvg(evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    var ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }

  // ---- per-node wiring ----
  var dragging = null;
  nodes.forEach(function (n) {
    var id = n.getAttribute("data-id");
    var href = n.getAttribute("data-href");

    n.addEventListener("mouseenter", function () { if (!dragging) isolate(id); });
    n.addEventListener("mouseleave", function () { if (!dragging) clearIsolate(); });

    if (href) {
      n.addEventListener("click", function (e) {
        if (n._moved) { n._moved = false; return; }
        window.open(href, "_blank", "noopener");
      });
      n.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); window.open(href, "_blank", "noopener"); }
      });
    }

    n.addEventListener("pointerdown", function (e) {
      dragging = { n: n, id: id };
      n._moved = false;
      isolate(id);
      if (n.setPointerCapture) { try { n.setPointerCapture(e.pointerId); } catch (_) {} }
    });
    n.addEventListener("pointermove", function (e) {
      if (!dragging || dragging.n !== n) return;
      var p = clientToSvg(e);
      if (!p) return;
      n._moved = true;
      moveNode(n, Math.round(p.x), Math.round(p.y));
    });
    var end = function () {
      if (dragging && dragging.n === n) { dragging = null; clearIsolate(); }
    };
    n.addEventListener("pointerup", end);
    n.addEventListener("pointercancel", end);
  });

  // ---- optional "Explore" force relaxation ----
  var toggle = document.getElementById("explore-toggle");
  var sim = null;
  var home = {};
  nodes.forEach(function (n) { var id = n.getAttribute("data-id"); home[id] = { x: pos[id].x, y: pos[id].y }; });

  function step() {
    var ids = Object.keys(pos);
    var fx = {}, fy = {};
    ids.forEach(function (i) { fx[i] = 0; fy[i] = 0; });
    // repulsion between all node pairs
    for (var a = 0; a < ids.length; a++) {
      for (var b = a + 1; b < ids.length; b++) {
        var i = ids[a], j = ids[b];
        var dx = pos[i].x - pos[j].x, dy = pos[i].y - pos[j].y;
        var d2 = dx * dx + dy * dy || 1;
        var f = 2600 / d2;
        var d = Math.sqrt(d2);
        fx[i] += f * dx / d; fy[i] += f * dy / d;
        fx[j] -= f * dx / d; fy[j] -= f * dy / d;
      }
    }
    // springs along edges + gentle pull home (keeps the curated shape recognizable)
    edgeByPair.forEach(function (e) {
      var i = e.from, j = e.to;
      var dx = pos[j].x - pos[i].x, dy = pos[j].y - pos[i].y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var k = 0.012 * (d - 150);
      fx[i] += k * dx / d; fy[i] += k * dy / d;
      fx[j] -= k * dx / d; fy[j] -= k * dy / d;
    });
    var moved = 0;
    ids.forEach(function (i) {
      if (dragging && dragging.id === i) return;
      fx[i] += (home[i].x - pos[i].x) * 0.02;
      fy[i] += (home[i].y - pos[i].y) * 0.02;
      var nx = pos[i].x + Math.max(-6, Math.min(6, fx[i]));
      var ny = pos[i].y + Math.max(-6, Math.min(6, fy[i]));
      var el = svg.querySelector('.node[data-id="' + i + '"]');
      moveNode(el, Math.round(nx), Math.round(ny));
      moved += Math.abs(nx - pos[i].x) + Math.abs(ny - pos[i].y);
    });
    if (sim) sim = requestAnimationFrame(step);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var on = toggle.getAttribute("aria-pressed") === "true";
      if (on) {
        toggle.setAttribute("aria-pressed", "false");
        if (sim) { cancelAnimationFrame(sim); sim = null; }
        // snap back to the curated layout
        nodes.forEach(function (n) { var id = n.getAttribute("data-id"); moveNode(n, home[id].x, home[id].y); });
      } else {
        toggle.setAttribute("aria-pressed", "true");
        if (!reduceMotion) sim = requestAnimationFrame(step);
      }
    });
  }
})();
