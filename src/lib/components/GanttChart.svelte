<script lang="ts">
    import type { Task } from "$lib/tasks";

    let { tasks = [] }: { tasks: Task[] } = $props();

    function getDaysBetween(start: Date, end: Date) {
        const diffTime = end.getTime() - start.getTime();
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
    }

    function formatDate(date: Date) {
        return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
    }

    let parsedTasks = $derived.by(() => {
        return tasks.map(t => {
            let start = new Date();
            if (t.startDate) {
                start = new Date(t.startDate);
            } else if (t.createdAt?.toDate) {
                start = t.createdAt.toDate();
            } else if (t.createdAt?.seconds) {
                start = new Date(t.createdAt.seconds * 1000);
            }
            start.setHours(0, 0, 0, 0);

            let end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            if (t.deadline) {
                end = new Date(t.deadline);
            }
            end.setHours(0, 0, 0, 0);

            if (end.getTime() <= start.getTime()) {
                end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            }

            return { ...t, parsedStart: start, parsedEnd: end };
        });
    });

    let minDate = $derived.by(() => {
        if (parsedTasks.length === 0) return new Date();
        const startDates = parsedTasks.map(t => t.parsedStart.getTime());
        const date = new Date(Math.min(...startDates));
        date.setDate(date.getDate() - 2);
        return date;
    });

    let maxDate = $derived.by(() => {
        if (parsedTasks.length === 0) return new Date();
        const endDates = parsedTasks.map(t => t.parsedEnd.getTime());
        const date = new Date(Math.max(...endDates));
        date.setDate(date.getDate() + 4);
        return date;
    });

    let timelineDays = $derived.by(() => {
        if (parsedTasks.length === 0) return [];
        const daysCount = getDaysBetween(minDate, maxDate);
        return Array.from({ length: Math.max(7, daysCount + 1) }, (_, i) => {
            const d = new Date(minDate);
            d.setDate(d.getDate() + i);
            return d;
        });
    });

    function getTaskStyle(task: any) {
        let startIdx = getDaysBetween(minDate, task.parsedStart);
        let duration = getDaysBetween(task.parsedStart, task.parsedEnd);
        
        // Ensure values are within safe boundaries just in case
        if (startIdx < 0) startIdx = 0;
        if (duration < 1) duration = 1;

        return `grid-column: ${startIdx + 1} / span ${duration};`;
    }
</script>

<div class="overflow-x-auto border rounded-xl bg-card text-card-foreground shadow w-full">
    {#if tasks.length === 0}
        <div class="p-8 text-center text-muted-foreground">
            No tasks to display in Gantt view.
        </div>
    {:else}
        <div class="p-4 inline-block min-w-full">
            <div class="grid relative border-b border-l border-t" style="grid-template-columns: repeat({timelineDays.length}, minmax(48px, 1fr));">
                <!-- Header -->
                {#each timelineDays as day}
                    <div class="text-[10px] font-medium text-muted-foreground text-center border-r border-b pb-2 pt-2 truncate bg-muted/30">
                        {formatDate(day)}
                    </div>
                {/each}

                <!-- Rows -->
                {#each parsedTasks as task, index}
                    <!-- Background grid lines for the row -->
                    <div class="col-span-full grid" style="grid-template-columns: repeat({timelineDays.length}, minmax(48px, 1fr));">
                        {#each timelineDays as _, i}
                            <div class="h-12 border-r border-b border-muted/50 {i % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'} hover:bg-muted/30 transition-colors"></div>
                        {/each}
                    </div>

                    <!-- Task Bar Container -->
                    <div class="row-span-1 h-12 -mt-12 relative flex items-center col-span-full grid" style="grid-template-columns: repeat({timelineDays.length}, minmax(48px, 1fr)); pointer-events: none;">
                        <div 
                            class="h-8 rounded text-xs font-semibold px-2 truncate flex items-center shadow-sm relative pointer-events-auto cursor-default {task.isCompleted ? 'bg-muted-foreground line-through opacity-80 text-background' : 'bg-primary text-primary-foreground hover:ring-2 ring-primary/50'}"
                            style={getTaskStyle(task)}
                            title="{task.content}"
                        >
                            {task.content}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
