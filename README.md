<h1 align="center">
<br/><img src="https://tada.no/wp-content/uploads/tada-logo-rgb-positiv-liten.png" width="268px"/><br/><br/>
</h1>
<p align="center">Tada <b>WordPress theme starterkit</b> and webpack build with live reload, HMR, and custom block boilerplate (ACF and/or react).</p>

## 🚚️ Prerequisites

> [Local](https://localwp.com/)<br/>
> [Mamp PRO](https://www.mamp.info/)

## ⚡️ Quick start

- Add local site in Local
- Clone boilerplate and copy files to Local install (/public)
- Change Theme name (folder, style.css and packaje.json)
- Replace `boilerplate.local` with your target in proxyTarget under `wpConfig` in `package.json`.
- Add plugins below (only ACF rquired) and activate Advanced Custom Fields Pro before changing theme in WP backend

That's all you need to know to start! 🎉

## 🔨️ Build

```sh
$ npm install
$ npm run dev
```
  - This will start an instance of webpack that builds our js and css. The build offers a live reloading and hot mudule replacement on on localhost:3000 (which proxies localhost:5000).

## 🚀 Deploy

- `npm run build`
- Deploy to WPengine (link til notion kommer)

## 📖 Project Wiki

Notion
