# XE_FrameworkSPA_Vue

XE Framework SPA Vue - Session 16-10-2020

This repo contains [slides](assets/slides.pdf) and demo [app](App.vue) for my [XE](https://www.xedotnet.org/) online session about [SPA Frameworks](https://www.xedotnet.org/eventi/online-meeting-spa-framework-a-confronto/) where I talk about [Vue.js](https://v3.vuejs.org)

## Initial setup project

I used latest [official release](https://github.com/vuejs/vue-next/releases/tag/v3.0.0) version of **Vue 3** and used [VITE](https://github.com/vitejs/vite) for easy setup the solution:

```bash
yarn init -y
yarn add vite
yarn add vue@next vue-router@next
```

I also decide to use the **great** [TypeScript](https://www.typescriptlang.org) support to develop all the solution, you can find more about the new SFC syntax that I used here:

- `<script setup>` [read more](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)
- `<style vars>` [read more](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md)

## Try it

To try my project you have to

```bash
git clone https://github.com/dmorosinotto/XE_FrameworkSPA_Vue
cd XE_FrameworkSPA_Vue
yarn install
yarn run basics
yarm vite

-- OR SIMPLY RUN IT WITH
npm start
```

Open your browser pointing to [http://localhost:3000](http://localhost:3000) and enjoy the code 🤓

---

## Your first Vue+Vite app:

If you want to experiment and create you first app use these startup files:

index.html

```html
<html>
  <body>
    <div id="app">Welcome to {{msg}}</div>
    <script type="module" src="index.js"></script>
  </body>
</html>
```

index.js

```js
import { createApp, ref } from "vue/dist/vue.esm-browser.js";
window.myapp = createApp({
  setup() {
    const msg = ref("XE Vue");
    return { msg };
  },
}).mount("#app");
```

Or if want to create both files with commands run this on your terminal:

```bash
echo '<html><body><div id="app">Welcome to {{msg}}</div><script type="module" src="index.js"></script></body></html>' >> index.html

echo 'import { createApp, ref } from "vue/dist/vue.esm-browser.js";' >> index.js

echo 'window.myapp = createApp({setup() { const msg = ref("XE Vue"); return { msg }; }}).mount("#app");' >> index.js
```

And then you can execute the app with

```bash
yarn vite
```

to see it in the browser go to `http://localhost:3000`

When you change `index.js` you'll get instant reload/update in your browser thanks to HMR support by Vite 🚀

Another thing you can try is open F12 browser Console and just type `myapp.msg="Hello World"` 🤯

---

### References

If you need more details about Vue3 take a look at:

- Official Vue3 [docs](https://v3.vuejs.org)
- Great free intro course by [VueMastery](https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3)
- And so many in-deep insight about Vue [Reactivity](https://www.vuemastery.com/courses/vue3-deep-dive-with-evan-you/vue3-overview) system explained by Evan You and Gregg Pollack
- [Evan You](@yyx990803) global Vue3 announcement [video](https://youtu.be/Vp5ANvd88x0?t=343)
- [Tim Benniks](@timbenniks) [talk](https://www.youtube.com/watch?v=gojCkw5Ih7E) about Vite & VitePress
- Same code sample by [Lachlan Miller](lmiller1990) free Vue3 [course](https://www.udemy.com/course/complete-vuejs-3-crash-course-composition-api-vue-router-vuex/?couponCode=029EF9F9B2CA89B7D862&s=03)
