import {assertEquals} from "@std/assert";
import {MINOR, type Version, from, isUnstable, compare, next} from "./index.ts";


Deno.test("from", () => {
  const x = from("v1.2.3.4");
  assertEquals(x?.toString(), "1.2.3+4");
});


Deno.test("isUnstable", () => {
  const x = from("0.2");
  assertEquals(isUnstable(x as Version), true);
});


Deno.test("compare", () => {
  const x = from("1.2");
  const y = from("1.2.3");
  assertEquals(compare(x as Version, y as Version), -3);
});


Deno.test("next", () => {
  const x = from("1.2");
  const y = next(x as Version, MINOR);
  assertEquals(y?.toString(), "1.3.0");
});
