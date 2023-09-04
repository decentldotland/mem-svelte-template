<script lang="ts">
  import { onMount } from "svelte";
  let count: number = 0;

  onMount(async () => {
    readState();
  });

  const readState = async () => {
    try {
      const response = await fetch("/api/contract").then((res) => res.json());
      count = response.data || count;
    } catch (err) {
      console.log(err);
    }
  };

  const incrementState = async () => {
    try {
      await fetch("/api/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          function: "increment",
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
</script>

<div class="main">
  <div class="content">
    Count: {count}
    <button on:click={incrementState}>Increment</button>
  </div>
</div>
