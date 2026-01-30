<script lang="ts">
    import { Progress as ProgressPrimitive } from "bits-ui";
    import { cn } from "$lib/utils";

    let {
        ref = $bindable(null),
        value = 0,
        max = 100,
        class: className,
        ...restProps
    }: ProgressPrimitive.RootProps = $props();
</script>

<ProgressPrimitive.Root
    bind:ref
    {value}
    {max}
    class={cn(
        "bg-secondary relative h-4 w-full overflow-hidden rounded-full",
        className,
    )}
    {...restProps}
>
    <div
        class="bg-primary h-full w-full flex-1 transition-all"
        style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 100)}%)`}
    ></div>
</ProgressPrimitive.Root>
