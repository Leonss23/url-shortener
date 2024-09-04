/** @jsxImportSource solid-js */

import { createSignal } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";

export default function UrlForm() {
  let input!: HTMLInputElement;

  const [shortUrl, setShortUrl] = createSignal("");
  const [error, setError] = createSignal("");

  async function handleSubmit(
    e: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement;
      target: DOMElement;
    },
  ) {
    e.preventDefault();
    const url = input.value;
    const registeredUrl = await registerURL(url);
    if (!registeredUrl) return setError("Failed to register URL");
    setShortUrl(registeredUrl);
  }

  return (
    <>
      <div class="sm:text-xl md:text-2xl flex flex-col items-center container">
        <form
          onSubmit={handleSubmit}
          class="shadow bg-white rounded-lg overflow-hidden flex justify-between w-fit"
        >
          <div>
            <input
              class="p-2 outline outline-red-600 sm:min-w-80 md:min-w-96"
              type="url"
              value="https://leonardo-gatti.pages.dev"
              ref={input}
            />
          </div>
          <button class="p-2 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-600 duration-50">
            Shorten
          </button>
        </form>
        <div class="p-4 font-medium">
          <p
            class="border p-2 border-green-400 bg-green-50 rounded-lg"
            classList={{ invisible: !shortUrl() }}
          >
            Short URL:{" "}
            <a href={shortUrl()} class="text-indigo-600">
              {shortUrl()}{" "}
            </a>
          </p>
          <p
            class="p-2 border border-red-400 rounded-lg bg-red-50"
            classList={{ invisible: !error() }}
          >
            <span class="text-red-500">Error: </span> {error()}
          </p>
        </div>
      </div>
    </>
  );
}

async function registerURL(url: string) {
  try {
    const data = await fetch("/api/urls", {
      body: JSON.stringify({ url }),
      headers: { "content-type": "application/json" },
      method: "post",
    }).then((v) => v.json());
    const { shortUrl }: any = data;
    if (typeof shortUrl != "string")
      throw new Error("failed to parse url from response");
    return shortUrl;
  } catch (error) {
    console.error({ error });
  }
}
