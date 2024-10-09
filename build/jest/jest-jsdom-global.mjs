//https://github.com/simon360/jest-environment-jsdom-global
import pkg from "../../../Serenity/node_modules/jest-environment-jsdom/build/index.js";

let JSDOMEnvironment = pkg;
if (pkg.default)
  JSDOMEnvironment = pkg.default;

export default class JSDOMEnvironmentGlobal extends JSDOMEnvironment {
  async setup() {
    await super.setup();
    this.global.jsdom = this.dom;
  }

  async teardown() {
    this.global.jsdom = undefined;
    await super.teardown();
  }
}