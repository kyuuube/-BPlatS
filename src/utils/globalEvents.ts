import EventEmitter from "events";

/**
 * @name 全局事件events
 *
 * ```ts
 import globalEvents from "utils/globalEvents";
 globalEvents.on("message", function(text) {
    console.warn("message", text);
  });
 globalEvents.once("message", function(text) {
    console.warn("message", text);
  });
 globalEvents.emit("message", "hello world");
 globalEvents.removeListener(event, fn)
 * ```
 */
const globalEvents = new EventEmitter();
export default globalEvents;
