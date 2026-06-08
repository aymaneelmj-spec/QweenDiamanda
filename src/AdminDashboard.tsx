import { useEffect } from 'react';

const dashboardHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#C9A84C;--gold2:#E8C96A;--gold3:#A07830;
  --bg:#0A0A0B;--bg2:#111114;--bg3:#18181C;--bg4:#1F1F25;
  --border:#2A2A32;--border2:#3A3A45;
  --text:#F0EDE8;--text2:#A09890;--text3:#605850;
  --red:#C94040;--green:#40A870;--amber:#C9A040;--blue:#4070C9;
}
.light{
  --bg:#F8F5F0;--bg2:#FFFFFF;--bg3:#F0EDE8;--bg4:#E8E5DF;
  --border:#D8D5CF;--border2:#C8C5BF;
  --text:#1A1814;--text2:#706860;--text3:#A09890;
  --red:#A03030;--green:#2A7850;--amber:#907030;--blue:#2050A0;
}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;font-size:14px;line-height:1.5;overflow-x:hidden}
.screen{display:none;width:100%;min-height:100vh}
.screen.active{display:flex}
#screen-login{align-items:center;justify-content:center;flex-direction:column;min-height:100vh;position:relative;overflow:hidden}
.login-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%,rgba(201,168,76,.07) 0%,transparent 60%),radial-gradient(ellipse at 70% 70%,rgba(201,168,76,.04) 0%,transparent 50%);pointer-events:none}
.login-card{position:relative;width:360px;background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:40px;box-shadow:0 32px 80px rgba(0,0,0,.4)}
.login-logo{text-align:center;margin-bottom:32px}
.login-logo .diamond-icon{font-size:28px;display:block;margin-bottom:8px}
.login-logo h1{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--gold);letter-spacing:.12em;text-transform:uppercase}
.login-logo p{font-size:11px;color:var(--text3);letter-spacing:.2em;text-transform:uppercase;margin-top:2px}
.form-group{margin-bottom:16px}
.form-group label{display:block;font-size:11px;font-weight:600;color:var(--text3);letter-spacing:.15em;text-transform:uppercase;margin-bottom:6px}
.form-group input{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s}
.form-group input:focus{border-color:var(--gold)}
.pw-wrap{position:relative}
.pw-wrap input{padding-right:40px}
.pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:0;line-height:1}
.capslock-warn{font-size:11px;color:var(--amber);margin-top:4px;display:none}
.pw-strength{display:flex;gap:3px;margin-top:6px;height:3px}
.pw-strength span{flex:1;border-radius:2px;background:var(--border);transition:background .3s}
.login-attempts{font-size:11px;color:var(--red);text-align:center;margin-bottom:12px;min-height:16px}
.lockout-timer{font-size:13px;color:var(--amber);text-align:center;margin-bottom:12px}
.btn-login{width:100%;padding:12px;background:linear-gradient(135deg,var(--gold3),var(--gold),var(--gold2));color:#0A0806;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;transition:opacity .2s;margin-top:4px}
.btn-login:hover{opacity:.9}
.btn-login:disabled{opacity:.4;cursor:not-allowed}
.security-note{text-align:center;font-size:11px;color:var(--text3);margin-top:16px;display:flex;align-items:center;justify-content:center;gap:4px}
.topbar{display:flex;align-items:center;background:var(--bg2);border-bottom:1px solid var(--border);padding:0 24px;height:56px;gap:16px;flex-shrink:0;position:sticky;top:0;z-index:100}
.topbar-logo{font-family:'Cormorant Garamond',serif;font-weight:600;color:var(--gold);font-size:15px;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.topbar-nav{display:flex;gap:2px;flex:1;justify-content:center}
.nav-btn{background:none;border:none;color:var(--text2);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:6px 14px;border-radius:8px;cursor:pointer;transition:all .2s;white-space:nowrap}
.nav-btn:hover{color:var(--text);background:var(--bg3)}
.nav-btn.active{color:var(--gold);background:var(--bg4)}
.topbar-actions{display:flex;align-items:center;gap:8px;margin-left:auto}
.session-timer{font-size:11px;color:var(--text3);background:var(--bg4);padding:4px 10px;border-radius:20px;font-weight:500}
.session-timer.warn{color:var(--amber)}
.btn-icon{background:none;border:1px solid var(--border);border-radius:8px;color:var(--text2);cursor:pointer;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .2s}
.btn-icon:hover{border-color:var(--gold);color:var(--gold)}
.btn-logout{background:none;border:1px solid var(--border);border-radius:8px;color:var(--text2);cursor:pointer;padding:6px 12px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;transition:all .2s}
.btn-logout:hover{border-color:var(--red);color:var(--red)}
.main-content{flex:1;overflow-y:auto;padding:24px;min-height:0}
.tab{display:none}
.tab.active{display:block}
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px}
.stat-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold3),var(--gold))}
.stat-label{font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px}
.stat-value{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:var(--gold)}
.stat-sub{font-size:11px;color:var(--text2);margin-top:4px}
.section-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;margin-bottom:16px;color:var(--text);display:flex;align-items:center;gap:8px}
.section-title::after{content:'';flex:1;height:1px;background:var(--border)}
.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
.panel{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:20px}
.panel h3{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px}
.activity-item{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px}
.activity-item:last-child{border-bottom:none}
.activity-dot{width:6px;height:6px;border-radius:50%;margin-top:4px;flex-shrink:0}
.activity-dot.green{background:var(--green)}
.activity-dot.red{background:var(--red)}
.activity-dot.amber{background:var(--amber)}
.activity-dot.blue{background:var(--blue)}
.activity-time{color:var(--text3);font-size:11px}
.products-toolbar{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.search-input{flex:1;min-width:160px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:8px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s}
.search-input:focus{border-color:var(--gold)}
.filter-select{background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;cursor:pointer}
.btn{padding:8px 16px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;border:1px solid transparent;transition:all .2s}
.btn-primary{background:linear-gradient(135deg,var(--gold3),var(--gold));color:#0A0806;border-color:transparent}
.btn-primary:hover{opacity:.9}
.btn-secondary{background:var(--bg2);border-color:var(--border);color:var(--text2)}
.btn-secondary:hover{border-color:var(--gold);color:var(--gold)}
.btn-danger{background:var(--bg2);border-color:var(--border);color:var(--red)}
.btn-danger:hover{background:var(--red);color:#fff;border-color:var(--red)}
.btn-sm{padding:5px 10px;font-size:12px}
.view-toggle{display:flex;background:var(--bg2);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.view-btn{padding:7px 12px;background:none;border:none;color:var(--text3);cursor:pointer;font-size:15px;transition:all .2s}
.view-btn.active{background:var(--bg4);color:var(--gold)}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
.product-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:border-color .2s;position:relative}
.product-card:hover{border-color:var(--border2)}
.product-card.hidden-prod{opacity:.5}
.product-card .img-area{height:160px;background:var(--bg3);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.product-card .img-placeholder{font-size:40px;color:var(--border2)}
.product-card .badge{position:absolute;top:8px;left:8px;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em}
.badge-bestseller{background:var(--gold);color:#0A0806}
.badge-new{background:var(--green);color:#fff}
.badge-hidden{background:var(--red);color:#fff}
.product-card .card-body{padding:12px}
.product-card .card-title{font-weight:600;font-size:13px;margin-bottom:4px;line-height:1.3}
.product-card .card-price{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold);font-weight:600}
.card-actions{display:flex;gap:6px;margin-top:10px}
.select-check{position:absolute;top:8px;right:8px;width:20px;height:20px;border-radius:4px;border:2px solid var(--border2);background:var(--bg2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .2s}
.select-check.checked{background:var(--gold);border-color:var(--gold);color:#0A0806}
.products-list{display:none}
.products-list table{width:100%;border-collapse:collapse}
.products-list table th{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;padding:10px 12px;text-align:left;border-bottom:1px solid var(--border)}
.products-list table td{padding:12px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle}
.products-list table tr:hover td{background:var(--bg3)}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;align-items:center;justify-content:center;padding:20px}
.modal-overlay.open{display:flex}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:16px;width:100%;max-width:500px;padding:28px;position:relative;max-height:90vh;overflow-y:auto}
.modal h2{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--border)}
.modal-close{position:absolute;top:16px;right:16px;background:none;border:none;color:var(--text3);font-size:20px;cursor:pointer;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:6px}
.modal-close:hover{background:var(--bg4);color:var(--text)}
.modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.mform-group{margin-bottom:12px}
.mform-group label{display:block;font-size:11px;font-weight:600;color:var(--text3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px}
.mform-group input,.mform-group select,.mform-group textarea{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s}
.mform-group input:focus,.mform-group select:focus,.mform-group textarea:focus{border-color:var(--gold)}
.upload-area{border:2px dashed var(--border2);border-radius:10px;padding:24px;text-align:center;cursor:pointer;transition:border-color .2s;position:relative}
.upload-area:hover{border-color:var(--gold)}
.upload-area input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer}
.upload-icon{font-size:28px;margin-bottom:6px}
.upload-text{font-size:12px;color:var(--text3)}
.media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px}
.media-item{background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .2s;aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}
.media-item:hover{border-color:var(--gold)}
.media-item .media-icon{font-size:32px;color:var(--border2)}
.media-item .media-name{font-size:10px;color:var(--text3);text-align:center;padding:0 6px 6px;position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,var(--bg2))}
.media-upload{border:2px dashed var(--border2);position:relative}
.media-upload:hover{border-color:var(--gold)}
.media-upload input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.orders-list{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.order-row{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--border);font-size:13px;transition:background .15s}
.order-row:last-child{border-bottom:none}
.order-row:hover{background:var(--bg3)}
.order-status{padding:3px 8px;border-radius:20px;font-size:11px;font-weight:600}
.status-new{background:rgba(64,168,112,.15);color:var(--green)}
.status-pending{background:rgba(201,160,64,.15);color:var(--amber)}
.status-done{background:rgba(64,112,201,.15);color:var(--blue)}
.settings-section{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:22px;margin-bottom:16px}
.settings-section h3{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--border)}
.setting-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}
.setting-row:last-child{border-bottom:none}
.setting-row label{flex:1;font-size:13px;font-weight:500;color:var(--text)}
.setting-row p{font-size:12px;color:var(--text3);margin-top:2px}
.setting-input{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none;transition:border-color .2s;width:200px}
.setting-input:focus{border-color:var(--gold)}
.log-list{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.log-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);font-size:12px}
.log-row:last-child{border-bottom:none}
.log-icon{font-size:14px;width:24px;text-align:center}
.log-action{flex:1;color:var(--text)}
.log-time{color:var(--text3);white-space:nowrap}
.log-type{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap}
.log-login{background:rgba(64,168,112,.12);color:var(--green)}
.log-edit{background:rgba(64,112,201,.12);color:var(--blue)}
.log-delete{background:rgba(201,64,64,.12);color:var(--red)}
.log-fail{background:rgba(201,160,64,.12);color:var(--amber)}
.bulk-bar{display:none;align-items:center;gap:10px;background:var(--bg4);border:1px solid var(--border2);border-radius:10px;padding:10px 14px;margin-bottom:14px}
.bulk-bar.show{display:flex}
.bulk-count{font-size:13px;font-weight:600;color:var(--gold)}
.confirm-text{font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:4px}
.confirm-warn{font-size:13px;color:var(--red);margin-top:8px;font-weight:500}
.toast-container{position:fixed;top:16px;right:16px;z-index:2000;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{background:var(--bg2);border:1px solid var(--border2);border-radius:10px;padding:12px 16px;font-size:13px;display:flex;align-items:center;gap:8px;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,.3);animation:slideIn .3s ease;pointer-events:all}
.toast.success{border-left:3px solid var(--green)}
.toast.error{border-left:3px solid var(--red)}
.toast.info{border-left:3px solid var(--gold)}
@keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes fadeOut{to{opacity:0;transform:translateX(20px)}}
.main-content::-webkit-scrollbar{width:4px}.main-content::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
</style>
</head>
<body>
<div class="toast-container" id="toasts"></div>

<div class="screen active" id="screen-login">
  <div class="login-bg"></div>
  <div class="login-card">
    <div class="login-logo">
      <span class="diamond-icon">&#9830;</span>
      <h1>Queen Diamanda</h1>
      <p>Secure Admin Portal</p>
    </div>
    <div id="attempts-msg" class="login-attempts"></div>
    <div id="lockout-msg" class="lockout-timer" style="display:none"></div>
    <div class="form-group">
      <label>Email Address</label>
      <input type="email" id="login-email" placeholder="admin@queendiamanda.ma" autocomplete="username">
    </div>
    <div class="form-group">
      <label>Password</label>
      <div class="pw-wrap">
        <input type="password" id="login-pw" placeholder="Your password" autocomplete="current-password" oninput="checkPwStrength(this.value)" onkeydown="checkCaps(event)" onkeyup="checkCaps(event)">
        <button class="pw-toggle" type="button" onclick="togglePw('login-pw',this)">&#128065;</button>
      </div>
      <div id="caps-warn" class="capslock-warn">Caps Lock is ON</div>
      <div class="pw-strength" id="pw-strength">
        <span id="s1"></span><span id="s2"></span><span id="s3"></span><span id="s4"></span>
      </div>
    </div>
    <button class="btn-login" id="btn-login" onclick="attemptLogin()">Enter Dashboard</button>
    <div class="security-note">Secured &middot; Desktop Only &middot; 30-min Session</div>
  </div>
</div>

<div class="screen" id="screen-dash">
  <div style="display:flex;flex-direction:column;width:100%;min-height:100vh">
    <div class="topbar">
      <span class="topbar-logo">&#9830; Queen Diamanda</span>
      <div class="topbar-nav">
        <button class="nav-btn active" onclick="showTab('overview',this)">Overview</button>
        <button class="nav-btn" onclick="showTab('products',this)">Products</button>
        <button class="nav-btn" onclick="showTab('media',this)">Media</button>
        <button class="nav-btn" onclick="showTab('orders',this)">Orders</button>
        <button class="nav-btn" onclick="showTab('settings',this)">Settings</button>
        <button class="nav-btn" onclick="showTab('security',this)">Security Log</button>
      </div>
      <div class="topbar-actions">
        <span class="session-timer" id="session-display">30:00</span>
        <button class="btn-icon" onclick="toggleTheme()" title="Toggle theme">&#9680;</button>
        <button class="btn-logout" onclick="logout()">Sign Out</button>
      </div>
    </div>
    <div class="main-content" style="flex:1">

      <!-- OVERVIEW -->
      <div class="tab active" id="tab-overview">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">Good morning, Admin</h2>
            <p style="font-size:12px;color:var(--text3);margin-top:2px" id="current-date"></p>
          </div>
          <button class="btn btn-primary" onclick="openAddProduct()">+ Add Product</button>
        </div>
        <div class="stat-grid">
          <div class="stat-card"><div class="stat-label">Total Products</div><div class="stat-value" id="stat-products">4</div><div class="stat-sub">Active in catalog</div></div>
          <div class="stat-card"><div class="stat-label">WhatsApp Orders</div><div class="stat-value">12</div><div class="stat-sub">This week</div></div>
          <div class="stat-card"><div class="stat-label">Revenue Est.</div><div class="stat-value">2,850</div><div class="stat-sub">DH this month</div></div>
          <div class="stat-card"><div class="stat-label">Media Files</div><div class="stat-value" id="stat-media">6</div><div class="stat-sub">In library</div></div>
        </div>
        <div class="quick-grid">
          <div class="panel">
            <h3>Recent Activity</h3>
            <div id="activity-feed">
              <div class="activity-item"><div class="activity-dot green"></div><div><div>Admin logged in</div><div class="activity-time">Just now</div></div></div>
              <div class="activity-item"><div class="activity-dot blue"></div><div><div>Product edited</div><div class="activity-time">Yesterday 14:30</div></div></div>
              <div class="activity-item"><div class="activity-dot amber"></div><div><div>New WhatsApp order received</div><div class="activity-time">2 days ago</div></div></div>
              <div class="activity-item"><div class="activity-dot red"></div><div><div>Login attempt failed</div><div class="activity-time">3 days ago</div></div></div>
            </div>
          </div>
          <div class="panel">
            <h3>Quick Actions</h3>
            <div style="display:flex;flex-direction:column;gap:8px">
              <button class="btn btn-secondary" style="text-align:left" onclick="openAddProduct()">+ Add New Product</button>
              <button class="btn btn-secondary" style="text-align:left" onclick="showTab('media',document.querySelectorAll('.nav-btn')[2])">Upload Media</button>
              <button class="btn btn-secondary" style="text-align:left" onclick="showTab('orders',document.querySelectorAll('.nav-btn')[3])">View Orders</button>
              <button class="btn btn-secondary" style="text-align:left" onclick="showTab('settings',document.querySelectorAll('.nav-btn')[4])">Store Settings</button>
              <button class="btn btn-secondary" style="text-align:left" onclick="showTab('security',document.querySelectorAll('.nav-btn')[5])">Security Log</button>
            </div>
          </div>
        </div>
        <div class="section-title">Top Products</div>
        <div id="overview-products" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px"></div>
      </div>

      <!-- PRODUCTS -->
      <div class="tab" id="tab-products">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">Product Management</h2>
          <button class="btn btn-primary" onclick="openAddProduct()">+ Add Product</button>
        </div>
        <div class="products-toolbar">
          <input class="search-input" type="text" placeholder="Search products..." id="search-input" oninput="renderProducts()">
          <select class="filter-select" id="filter-badge" onchange="renderProducts()">
            <option value="">All Badges</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Nouveau">Nouveau</option>
            <option value="none">No Badge</option>
          </select>
          <select class="filter-select" id="filter-status" onchange="renderProducts()">
            <option value="">All Status</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
          <div class="view-toggle">
            <button class="view-btn active" id="view-grid-btn" onclick="setView('grid')">&#8862;</button>
            <button class="view-btn" id="view-list-btn" onclick="setView('list')">&#9776;</button>
          </div>
        </div>
        <div class="bulk-bar" id="bulk-bar">
          <span class="bulk-count" id="bulk-count">0 selected</span>
          <button class="btn btn-sm btn-secondary" onclick="bulkHide()">Hide Selected</button>
          <button class="btn btn-sm btn-danger" onclick="bulkDelete()">Delete Selected</button>
          <button class="btn btn-sm btn-secondary" onclick="clearSelection()" style="margin-left:auto">Clear</button>
        </div>
        <div class="products-grid" id="products-grid"></div>
        <div class="products-list" id="products-list">
          <table><thead><tr><th></th><th>Image</th><th>Name</th><th>Price</th><th>Badge</th><th>Status</th><th>Actions</th></tr></thead><tbody id="products-table-body"></tbody></table>
        </div>
      </div>

      <!-- MEDIA -->
      <div class="tab" id="tab-media">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">Media Library</h2>
          <span style="font-size:12px;color:var(--text3)" id="media-count">6 files</span>
        </div>
        <div class="media-grid" id="media-grid"></div>
      </div>

      <!-- ORDERS -->
      <div class="tab" id="tab-orders">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">WhatsApp Orders Tracker</h2>
          <button class="btn btn-primary" onclick="openAddOrder()">+ Log Order</button>
        </div>
        <div class="orders-list" id="orders-list"></div>
      </div>

      <!-- SETTINGS -->
      <div class="tab" id="tab-settings">
        <div style="margin-bottom:20px"><h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">Store Settings</h2></div>
        <div class="settings-section">
          <h3>Store Information</h3>
          <div class="setting-row"><div><label>Store Name</label><p>Display name across the website</p></div><input class="setting-input" value="Queen Diamanda" id="set-name"></div>
          <div class="setting-row"><div><label>WhatsApp Number</label><p>For order notifications</p></div><input class="setting-input" value="212784854164" id="set-wa"></div>
          <div class="setting-row"><div><label>Currency</label><p>Displayed on product prices</p></div><input class="setting-input" value="DH" id="set-currency"></div>
          <div style="text-align:right;margin-top:12px"><button class="btn btn-primary" onclick="saveSettings()">Save Changes</button></div>
        </div>
        <div class="settings-section">
          <h3>Change Password</h3>
          <div class="mform-group"><label>Current Password</label><input type="password" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none" id="cur-pw"></div>
          <div class="mform-group"><label>New Password</label>
            <input type="password" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none" id="new-pw" oninput="checkPwStrength2(this.value)">
            <div class="pw-strength" style="margin-top:6px" id="pw-strength2"><span id="s21"></span><span id="s22"></span><span id="s23"></span><span id="s24"></span></div>
          </div>
          <div class="mform-group"><label>Confirm New Password</label><input type="password" style="width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:13px;outline:none" id="conf-pw"></div>
          <div style="text-align:right;margin-top:12px"><button class="btn btn-primary" onclick="changePassword()">Update Password</button></div>
        </div>
      </div>

      <!-- SECURITY LOG -->
      <div class="tab" id="tab-security">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600">Security Log</h2>
          <button class="btn btn-secondary btn-sm" onclick="clearLog()">Clear Log</button>
        </div>
        <div class="log-list" id="security-log"></div>
      </div>

    </div>
  </div>
</div>

<!-- PRODUCT MODAL -->
<div class="modal-overlay" id="modal-product">
  <div class="modal">
    <button class="modal-close" onclick="closeModal('modal-product')">&#10005;</button>
    <h2 id="modal-product-title">Add New Product</h2>
    <div class="mform-group"><label>Product Name</label><input type="text" id="p-name" placeholder="e.g. Bracelet Diamant Rose"></div>
    <div class="form-row">
      <div class="mform-group"><label>Price (DH)</label><input type="number" id="p-price" placeholder="149"></div>
      <div class="mform-group"><label>Badge</label><select id="p-badge"><option value="">None</option><option value="Bestseller">Bestseller</option><option value="Nouveau">Nouveau</option></select></div>
    </div>
    <div class="mform-group"><label>Product Image Path</label><input type="text" id="p-image" placeholder="/images/product.png"></div>
    <div class="mform-group">
      <label>Upload Image (max 8MB)</label>
      <div class="upload-area">
        <input type="file" accept="image/*" onchange="handleImageUpload(this)">
        <div class="upload-icon">&#128247;</div>
        <div class="upload-text">Click or drag image here<br><span style="color:var(--text3)">PNG, JPG, WebP - max 8MB</span></div>
        <div id="upload-preview" style="margin-top:8px;font-size:12px;color:var(--green)"></div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal('modal-product')">Cancel</button>
      <button class="btn btn-primary" onclick="saveProduct()">Save Product</button>
    </div>
  </div>
</div>

<!-- CONFIRM MODAL -->
<div class="modal-overlay" id="modal-confirm">
  <div class="modal" style="max-width:380px">
    <h2 id="confirm-title">Confirm Action</h2>
    <p class="confirm-text" id="confirm-text"></p>
    <p class="confirm-warn" id="confirm-warn"></p>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal('modal-confirm')">Cancel</button>
      <button class="btn btn-danger" id="confirm-btn">Confirm</button>
    </div>
  </div>
</div>

<!-- ORDER MODAL -->
<div class="modal-overlay" id="modal-order">
  <div class="modal" style="max-width:420px">
    <button class="modal-close" onclick="closeModal('modal-order')">&#10005;</button>
    <h2>Log WhatsApp Order</h2>
    <div class="mform-group"><label>Customer Name</label><input type="text" id="o-name" placeholder="Fatima El Amrani"></div>
    <div class="mform-group"><label>City</label><input type="text" id="o-city" placeholder="Casablanca"></div>
    <div class="mform-group"><label>Product</label><select id="o-product"></select></div>
    <div class="mform-group"><label>Status</label><select id="o-status"><option value="new">New</option><option value="pending">Pending</option><option value="done">Delivered</option></select></div>
    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="closeModal('modal-order')">Cancel</button>
      <button class="btn btn-primary" onclick="saveOrder()">Save Order</button>
    </div>
  </div>
</div>

<script>
var CORRECT_EMAIL='admin@queendiamanda.ma';
var CORRECT_PW='QueenDiamanda@2025!';
var attempts=0;
var locked=false;
var lockTimer=null;
var sessionInterval=null;
var sessionLeft=30*60;
var currentEditId=null;
var selectedIds=new Set();
var isDark=true;

var products=[
  {id:1,name:'Set de Bracelets Rouge Royal',price:149,image:'/images/1.png',badge:'Bestseller',hidden:false},
  {id:2,name:'Bracelet Trefle Arc-en-Ciel',price:89,image:'/images/2.png',badge:'Nouveau',hidden:false},
  {id:3,name:'Bracelet Vague de Cristaux',price:75,image:'/images/3.png',badge:null,hidden:false},
  {id:4,name:'Bracelet Corde H Colore',price:65,image:'/images/4.png',badge:null,hidden:false},
];

var mediaFiles=[
  {name:'hero_diamond.png',icon:'&#128444;'},
  {name:'1.png',icon:'&#128444;'},
  {name:'2.png',icon:'&#128444;'},
  {name:'3.png',icon:'&#128444;'},
  {name:'4.png',icon:'&#128444;'},
  {name:'logo.svg',icon:'&#128196;'},
];

var orders=[
  {id:1,name:'Yasmine Berrada',city:'Casablanca',product:'Set de Bracelets Rouge Royal',status:'done',date:'Jun 5 2026'},
  {id:2,name:'Nadia El Fassi',city:'Rabat',product:'Bracelet Trefle Arc-en-Ciel',status:'pending',date:'Jun 6 2026'},
  {id:3,name:'Fatima Zahra',city:'Marrakech',product:'Bracelet Vague de Cristaux',status:'new',date:'Jun 7 2026'},
];

var securityLog=[
  {type:'login',icon:'OK',action:'Successful login from Admin',time:'Today 09:00'},
  {type:'edit',icon:'ED',action:'Product price updated',time:'Yesterday 14:30'},
  {type:'fail',icon:'FL',action:'Failed login attempt: wrong password',time:'Jun 5 13:12'},
  {type:'delete',icon:'DL',action:'Media file removed',time:'Jun 4 10:44'},
];

var el=document.getElementById('current-date');
if(el) el.textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

function toggleTheme(){
  isDark=!isDark;
  document.body.classList.toggle('light',!isDark);
}

function togglePw(id,btn){
  var inp=document.getElementById(id);
  inp.type=inp.type==='password'?'text':'password';
  btn.textContent=inp.type==='password'?'Show':'Hide';
}

function checkCaps(e){
  var warn=document.getElementById('caps-warn');
  if(warn) warn.style.display=(e.getModifierState&&e.getModifierState('CapsLock'))?'block':'none';
}

function getStrength(pw){
  var s=0;
  if(pw.length>=8)s++;
  if(/[A-Z]/.test(pw))s++;
  if(/[0-9]/.test(pw))s++;
  if(/[^A-Za-z0-9]/.test(pw))s++;
  return s;
}

var colors=['var(--red)','var(--amber)','#8BC34A','var(--green)'];
function checkPwStrength(pw){
  var s=getStrength(pw);
  for(var i=1;i<=4;i++){
    var e2=document.getElementById('s'+i);
    if(e2) e2.style.background=i<=s?colors[s-1]:'var(--border)';
  }
}
function checkPwStrength2(pw){
  var s=getStrength(pw);
  for(var i=1;i<=4;i++){
    var e2=document.getElementById('s2'+i);
    if(e2) e2.style.background=i<=s?colors[s-1]:'var(--border)';
  }
}

function attemptLogin(){
  if(locked) return;
  var email=document.getElementById('login-email').value.trim();
  var pw=document.getElementById('login-pw').value;
  var msg=document.getElementById('attempts-msg');
  if(email===CORRECT_EMAIL&&pw===CORRECT_PW){
    attempts=0;
    addLog('login','OK','Admin logged in successfully','Just now');
    enterDash();
  } else {
    attempts++;
    addLog('fail','FL','Failed login attempt ('+attempts+'/5)','Just now');
    if(attempts>=5){
      locked=true;
      document.getElementById('btn-login').disabled=true;
      var countdown=30;
      var lo=document.getElementById('lockout-msg');
      lo.style.display='block';
      msg.textContent='';
      lockTimer=setInterval(function(){
        countdown--;
        lo.textContent='Too many attempts. Try again in '+countdown+'s';
        if(countdown<=0){
          clearInterval(lockTimer);
          locked=false;
          attempts=0;
          lo.style.display='none';
          document.getElementById('btn-login').disabled=false;
        }
      },1000);
    } else {
      msg.textContent='Invalid credentials - '+attempts+'/5 attempts';
    }
  }
}

document.getElementById('login-pw').addEventListener('keydown',function(e){if(e.key==='Enter')attemptLogin();});
document.getElementById('login-email').addEventListener('keydown',function(e){if(e.key==='Enter')document.getElementById('login-pw').focus();});

function enterDash(){
  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-dash').classList.add('active');
  startSession();
  renderAll();
}

function startSession(){
  sessionLeft=30*60;
  clearInterval(sessionInterval);
  sessionInterval=setInterval(function(){
    sessionLeft--;
    var m=Math.floor(sessionLeft/60);
    var s=sessionLeft%60;
    var disp=document.getElementById('session-display');
    var str=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    if(disp){
      disp.textContent=str;
      disp.className='session-timer'+(sessionLeft<300?' warn':'');
    }
    if(sessionLeft<=0){logout();}
  },1000);
}

function logout(){
  clearInterval(sessionInterval);
  document.getElementById('screen-dash').classList.remove('active');
  document.getElementById('screen-login').classList.add('active');
  document.getElementById('login-pw').value='';
  addLog('login','OK','Session ended / Admin signed out','Just now');
  showToast('Signed out successfully','info');
}

function showTab(id,btn){
  document.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.nav-btn').forEach(function(b){b.classList.remove('active');});
  document.getElementById('tab-'+id).classList.add('active');
  if(btn) btn.classList.add('active');
  if(id==='products') renderProducts();
}

function renderAll(){
  renderProducts();
  renderMedia();
  renderOrders();
  renderLog();
  renderOverviewProducts();
  updateStats();
}

function getFilteredProducts(){
  var q=(document.getElementById('search-input')||{value:''}).value.toLowerCase();
  var badge=(document.getElementById('filter-badge')||{value:''}).value;
  var status=(document.getElementById('filter-status')||{value:''}).value;
  return products.filter(function(p){
    var nm=p.name.toLowerCase().includes(q);
    var bm=!badge||(badge==='none'?!p.badge:p.badge===badge);
    var sm=!status||(status==='hidden'?p.hidden:!p.hidden);
    return nm&&bm&&sm;
  });
}

function renderProducts(){
  var list=getFilteredProducts();
  var grid=document.getElementById('products-grid');
  var table=document.getElementById('products-table-body');
  if(!grid) return;
  grid.innerHTML='';
  if(table) table.innerHTML='';
  list.forEach(function(p){
    var sel=selectedIds.has(p.id);
    var card=document.createElement('div');
    card.className='product-card'+(p.hidden?' hidden-prod':'');
    card.innerHTML='<div class="img-area"><div class="img-placeholder">&#128142;</div>'+(p.badge?'<span class="badge '+(p.badge==='Bestseller'?'badge-bestseller':'badge-new')+'">'+p.badge+'</span>':'')+(p.hidden?'<span class="badge badge-hidden" style="top:30px">Hidden</span>':'')+'<div class="select-check '+(sel?'checked':'')+'" onclick="toggleSelect('+p.id+',event)">'+(sel?'&#10003;':(p.id?'':''))+'</div></div><div class="card-body"><div class="card-title">'+p.name+'</div><div class="card-price">'+p.price+' DH</div><div class="card-actions"><button class="btn btn-sm btn-secondary" onclick="openEditProduct('+p.id+')">Edit</button><button class="btn btn-sm btn-secondary" onclick="toggleHide('+p.id+')">'+(p.hidden?'Show':'Hide')+'</button><button class="btn btn-sm btn-danger" onclick="confirmDelete('+p.id+')">Delete</button></div></div>';
    grid.appendChild(card);
    if(table){
      var tr=document.createElement('tr');
      tr.innerHTML='<td><input type="checkbox" '+(sel?'checked':'')+' onchange="toggleSelect('+p.id+',event)" style="cursor:pointer"></td><td><div style="width:40px;height:40px;background:var(--bg4);border-radius:6px;display:flex;align-items:center;justify-content:center">&#128142;</div></td><td style="font-weight:500">'+p.name+'</td><td style="font-family:\'Cormorant Garamond\',serif;font-size:16px;color:var(--gold)">'+p.price+' DH</td><td>'+(p.badge?'<span class="badge '+(p.badge==='Bestseller'?'badge-bestseller':'badge-new')+'">'+p.badge+'</span>':'-')+'</td><td><span style="font-size:11px;padding:2px 8px;border-radius:10px;'+(p.hidden?'background:rgba(201,64,64,.12);color:var(--red)':'background:rgba(64,168,112,.12);color:var(--green)')+'\">'+(p.hidden?'Hidden':'Visible')+'</span></td><td style="display:flex;gap:6px"><button class="btn btn-sm btn-secondary" onclick="openEditProduct('+p.id+')">Edit</button><button class="btn btn-sm btn-secondary" onclick="toggleHide('+p.id+')">'+(p.hidden?'Show':'Hide')+'</button><button class="btn btn-sm btn-danger" onclick="confirmDelete('+p.id+')">Delete</button></td>';
      table.appendChild(tr);
    }
  });
  var bulk=document.getElementById('bulk-bar');
  var bc=document.getElementById('bulk-count');
  if(bulk) bulk.classList.toggle('show',selectedIds.size>0);
  if(bc) bc.textContent=selectedIds.size+' selected';
  renderOverviewProducts();
  updateStats();
}

function setView(v){
  var grid=document.getElementById('products-grid');
  var list=document.getElementById('products-list');
  var gb=document.getElementById('view-grid-btn');
  var lb=document.getElementById('view-list-btn');
  if(grid) grid.style.display=v==='grid'?'grid':'none';
  if(list) list.style.display=v==='list'?'block':'none';
  if(gb) gb.classList.toggle('active',v==='grid');
  if(lb) lb.classList.toggle('active',v==='list');
}

function toggleSelect(id,e){
  e.stopPropagation();
  if(selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
  renderProducts();
}

function clearSelection(){selectedIds.clear();renderProducts();}

function toggleHide(id){
  var p=products.find(function(x){return x.id===id;});
  if(!p) return;
  p.hidden=!p.hidden;
  addLog('edit','ED','Product "'+p.name+'" '+(p.hidden?'hidden':'shown'),'Just now');
  showToast('Product '+(p.hidden?'hidden':'shown'),'info');
  renderProducts();
}

function confirmDelete(id){
  var p=products.find(function(x){return x.id===id;});
  if(!p) return;
  document.getElementById('confirm-title').textContent='Delete Product';
  document.getElementById('confirm-text').textContent='Delete "'+p.name+'"?';
  document.getElementById('confirm-warn').textContent='This action cannot be undone.';
  document.getElementById('confirm-btn').onclick=function(){deleteProduct(id);};
  document.getElementById('modal-confirm').classList.add('open');
}

function deleteProduct(id){
  var p=products.find(function(x){return x.id===id;});
  if(p) addLog('delete','DL','Product "'+p.name+'" deleted','Just now');
  products=products.filter(function(x){return x.id!==id;});
  selectedIds.delete(id);
  closeModal('modal-confirm');
  showToast('Product deleted','error');
  renderProducts();
}

function bulkHide(){
  selectedIds.forEach(function(id){var p=products.find(function(x){return x.id===id;});if(p)p.hidden=true;});
  addLog('edit','ED','Bulk hide: '+selectedIds.size+' products','Just now');
  showToast(selectedIds.size+' products hidden','info');
  clearSelection();
}

function bulkDelete(){
  document.getElementById('confirm-title').textContent='Bulk Delete';
  document.getElementById('confirm-text').textContent='Delete '+selectedIds.size+' selected products?';
  document.getElementById('confirm-warn').textContent='This cannot be undone.';
  document.getElementById('confirm-btn').onclick=function(){
    var ids=Array.from(selectedIds);
    ids.forEach(function(id){deleteProduct(id);});
    closeModal('modal-confirm');
  };
  document.getElementById('modal-confirm').classList.add('open');
}

function openAddProduct(){
  currentEditId=null;
  document.getElementById('modal-product-title').textContent='Add New Product';
  document.getElementById('p-name').value='';
  document.getElementById('p-price').value='';
  document.getElementById('p-badge').value='';
  document.getElementById('p-image').value='';
  document.getElementById('upload-preview').textContent='';
  document.getElementById('modal-product').classList.add('open');
  showTab('products',document.querySelectorAll('.nav-btn')[1]);
}

function openEditProduct(id){
  var p=products.find(function(x){return x.id===id;});
  if(!p) return;
  currentEditId=id;
  document.getElementById('modal-product-title').textContent='Edit Product';
  document.getElementById('p-name').value=p.name;
  document.getElementById('p-price').value=p.price;
  document.getElementById('p-badge').value=p.badge||'';
  document.getElementById('p-image').value=p.image;
  document.getElementById('upload-preview').textContent='';
  document.getElementById('modal-product').classList.add('open');
}

function handleImageUpload(input){
  var file=input.files[0];
  if(!file) return;
  if(file.size>8*1024*1024){showToast('Image too large (max 8MB)','error');return;}
  document.getElementById('upload-preview').textContent='Ready: '+file.name;
  document.getElementById('p-image').value='/images/'+file.name;
  mediaFiles.push({name:file.name,icon:'&#128444;'});
  renderMedia();
}

function saveProduct(){
  var name=document.getElementById('p-name').value.trim();
  var price=parseFloat(document.getElementById('p-price').value);
  var badge=document.getElementById('p-badge').value||null;
  var image=document.getElementById('p-image').value||'/images/product.png';
  if(!name||!price){showToast('Please fill name and price','error');return;}
  if(currentEditId){
    var p=products.find(function(x){return x.id===currentEditId;});
    if(p){p.name=name;p.price=price;p.badge=badge;p.image=image;}
    addLog('edit','ED','Product "'+name+'" updated','Just now');
    showToast('Product updated','info');
  } else {
    products.push({id:Date.now(),name:name,price:price,badge:badge,image:image,hidden:false});
    addLog('login','OK','New product "'+name+'" added','Just now');
    showToast('Product added','success');
  }
  closeModal('modal-product');
  renderProducts();
}

function renderMedia(){
  var grid=document.getElementById('media-grid');
  var count=document.getElementById('media-count');
  if(!grid) return;
  grid.innerHTML='';
  var up=document.createElement('div');
  up.className='media-item media-upload';
  up.innerHTML='<input type="file" accept="image/*" onchange="addMedia(this)"><div class="media-icon">+</div>';
  grid.appendChild(up);
  mediaFiles.forEach(function(f){
    var el2=document.createElement('div');
    el2.className='media-item';
    el2.innerHTML='<div class="media-icon">'+f.icon+'</div><div class="media-name">'+f.name+'</div>';
    grid.appendChild(el2);
  });
  if(count) count.textContent=mediaFiles.length+' files';
  updateStats();
}

function addMedia(input){
  var file=input.files[0];
  if(!file) return;
  if(file.size>8*1024*1024){showToast('File too large','error');return;}
  mediaFiles.push({name:file.name,icon:'&#128444;'});
  showToast('Media uploaded','success');
  addLog('edit','ED','Media uploaded: '+file.name,'Just now');
  renderMedia();
}

function renderOrders(){
  var list=document.getElementById('orders-list');
  if(!list) return;
  list.innerHTML='';
  orders.forEach(function(o){
    var div=document.createElement('div');
    div.className='order-row';
    div.innerHTML='<div style="font-size:18px">&#128100;</div><div style="flex:1"><div style="font-weight:500">'+o.name+'</div><div style="font-size:11px;color:var(--text3)">'+o.city+'</div></div><div style="flex:1;font-size:13px;color:var(--text2)">'+o.product+'</div><div style="flex:0 0 100px"><span class="order-status status-'+o.status+'">'+(o.status==='new'?'New':o.status==='pending'?'Pending':'Delivered')+'</span></div><div style="font-size:11px;color:var(--text3)">'+o.date+'</div><select onchange="updateOrderStatus('+o.id+',this.value)" style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:4px 8px;color:var(--text);font-size:12px;cursor:pointer"><option '+(o.status==='new'?'selected':'')+' value="new">New</option><option '+(o.status==='pending'?'selected':'')+' value="pending">Pending</option><option '+(o.status==='done'?'selected':'')+' value="done">Delivered</option></select>';
    list.appendChild(div);
  });
}

function openAddOrder(){
  var sel=document.getElementById('o-product');
  if(sel){sel.innerHTML='';products.forEach(function(p){var op=document.createElement('option');op.value=p.name;op.textContent=p.name;sel.appendChild(op);});}
  document.getElementById('o-name').value='';
  document.getElementById('o-city').value='';
  document.getElementById('modal-order').classList.add('open');
}

function saveOrder(){
  var name=document.getElementById('o-name').value.trim();
  var city=document.getElementById('o-city').value.trim();
  var product=document.getElementById('o-product').value;
  var status=document.getElementById('o-status').value;
  if(!name||!city){showToast('Fill name and city','error');return;}
  orders.unshift({id:Date.now(),name:name,city:city,product:product,status:status,date:new Date().toLocaleDateString('en-GB',{month:'short',day:'numeric',year:'numeric'})});
  addLog('edit','ED','New order logged for '+name,'Just now');
  showToast('Order logged','success');
  closeModal('modal-order');
  renderOrders();
}

function updateOrderStatus(id,status){
  var o=orders.find(function(x){return x.id===id;});
  if(o){o.status=status;addLog('edit','ED','Order status updated to '+status,'Just now');}
  renderOrders();
}

function saveSettings(){
  addLog('edit','ED','Store settings updated','Just now');
  showToast('Settings saved','success');
}

function changePassword(){
  var cur=document.getElementById('cur-pw').value;
  var np=document.getElementById('new-pw').value;
  var conf=document.getElementById('conf-pw').value;
  if(cur!==CORRECT_PW){showToast('Current password incorrect','error');return;}
  if(np!==conf){showToast('Passwords do not match','error');return;}
  if(getStrength(np)<3){showToast('Password too weak','error');return;}
  CORRECT_PW=np;
  addLog('edit','ED','Password changed successfully','Just now');
  showToast('Password updated','success');
  document.getElementById('cur-pw').value='';
  document.getElementById('new-pw').value='';
  document.getElementById('conf-pw').value='';
}

function addLog(type,icon,action,time){
  securityLog.unshift({type:type,icon:icon,action:action,time:time});
  if(securityLog.length>50) securityLog.pop();
  renderLog();
  addActivity(action,time,type);
}

function renderLog(){
  var list=document.getElementById('security-log');
  if(!list) return;
  list.innerHTML='';
  securityLog.forEach(function(l){
    var row=document.createElement('div');
    row.className='log-row';
    row.innerHTML='<div class="log-icon" style="font-size:11px;font-weight:700;padding:2px 4px;border-radius:4px;background:var(--bg4)">'+l.icon+'</div><div class="log-action">'+l.action+'</div><span class="log-type log-'+l.type+'">'+l.type+'</span><div class="log-time">'+l.time+'</div>';
    list.appendChild(row);
  });
}

function clearLog(){securityLog=[];renderLog();showToast('Log cleared','info');}

function addActivity(text,time,type){
  var feed=document.getElementById('activity-feed');
  if(!feed) return;
  var dot=type==='delete'?'red':type==='fail'?'amber':type==='login'?'green':'blue';
  var item=document.createElement('div');
  item.className='activity-item';
  item.innerHTML='<div class="activity-dot '+dot+'"></div><div><div>'+text+'</div><div class="activity-time">'+time+'</div></div>';
  feed.insertBefore(item,feed.firstChild);
  while(feed.children.length>6) feed.removeChild(feed.lastChild);
}

function renderOverviewProducts(){
  var c=document.getElementById('overview-products');
  if(!c) return;
  c.innerHTML='';
  products.slice(0,4).forEach(function(p){
    var d=document.createElement('div');
    d.style.cssText='background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;';
    d.innerHTML='<div style="font-size:28px;margin-bottom:8px">&#128142;</div><div style="font-weight:600;font-size:13px;margin-bottom:4px">'+p.name+'</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;color:var(--gold)">'+p.price+' DH</div>';
    c.appendChild(d);
  });
}

function updateStats(){
  var sp=document.getElementById('stat-products');
  var sm=document.getElementById('stat-media');
  if(sp) sp.textContent=products.filter(function(p){return !p.hidden;}).length;
  if(sm) sm.textContent=mediaFiles.length;
}

function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(function(m){
  m.addEventListener('click',function(e){if(e.target===m)m.classList.remove('open');});
});

function showToast(msg,type){
  if(!type) type='info';
  var c=document.getElementById('toasts');
  var t=document.createElement('div');
  t.className='toast '+type;
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(function(){t.style.animation='fadeOut .3s forwards';setTimeout(function(){if(t.parentNode)t.remove();},300);},2800);
}

renderMedia();
<\/script>
</body>
</html>`;

export default function AdminDashboard() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <iframe
      srcDoc={dashboardHTML}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
      }}
      title="Queen Diamanda Admin Dashboard"
    />
  );
}