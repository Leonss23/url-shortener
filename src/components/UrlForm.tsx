import { createResource, createSignal, Match, Switch } from "solid-js";

export default function UrlForm() {
  const [url, setUrl] = createSignal<string>();
  const [shortUrl] = createResource(url, fetchLink);

  let input!: HTMLInputElement;

  return (
    <div class="sm:text-xl md:text-2xl flex flex-col items-center container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(input.value);
        }}
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
        <button
          disabled={shortUrl.loading}
          class="p-2 bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-600 duration-50 disabled:bg-neutral-600"
        >
          Shorten
        </button>
      </form>
      <div class="p-4 font-medium [&>*]:p-2 [&>*]:border [&>*]:rounded-lg">
        <Switch fallback={<div class="invisible">fallback</div>}>
          <Match when={shortUrl.loading}>
            <div class="border-neutral-400 bg-neutral-200">Hold on...</div>
          </Match>
          <Match when={shortUrl.state == "errored"}>
            <div class="border-red-400 bg-red-50">
              {shortUrl.error.toString()}
            </div>
          </Match>
          <Match when={shortUrl.state == "ready"}>
            <div class="border-green-400 bg-green-50 ">
              Shortened URL:{" "}
              <a href={shortUrl()} class="text-indigo-600 font-bold">
                {shortUrl()}
              </a>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
}

const fetchLink = async (url: string) => {
  const response = await fetch(new URL("/api/urls", window.location.href), {
    body: JSON.stringify({ url }),
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    method: "post",
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response), {
      cause: response,
    });
  }
  const json = await response.json();
  console.log({ json });
  return json.shortUrl as string;
};

async function getErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type")!;

  switch (contentType) {
    case "application/json":
      return (await response.json()).error as string;
    case "text/plain":
      return await response.text();
    default:
      return response.statusText;
  }
}
