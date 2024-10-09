import pkg from "../../../Serenity/node_modules/jest-environment-jsdom/build/index.js";

const JSDOMEnvironment = pkg.default || pkg.JSDOMEnvironment || pkg;

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