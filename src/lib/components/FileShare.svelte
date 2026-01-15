<script lang="ts">
    import { onMount } from "svelte";
    import {
        shareFileLink,
        subscribeToTeamFiles,
        deleteFile,
        type SharedFile,
    } from "$lib/files";
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card";
    import { Trash2, Link, ExternalLink } from "@lucide/svelte";
    import type { Team } from "$lib/teams";
    import type { User } from "firebase/auth";

    let { team, user }: { team: Team; user: User } = $props();

    let files: SharedFile[] = $state([]);
    let sharing = $state(false);
    let fileName = $state("");
    let fileUrl = $state("");

    onMount(() => {
        const unsubscribe = subscribeToTeamFiles(team.id, (updatedFiles) => {
            files = updatedFiles;
        });

        return () => {
            unsubscribe();
        };
    });

    async function handleShare() {
        if (!fileName.trim() || !fileUrl.trim()) return;

        sharing = true;
        try {
            await shareFileLink(fileName, fileUrl, team.id, {
                uid: user.uid,
                email: user.email || "",
            });
            fileName = "";
            fileUrl = "";
        } catch (error) {
            console.error("Share failed:", error);
            alert("Failed to share link. Please try again.");
        } finally {
            sharing = false;
        }
    }

    async function handleDelete(file: SharedFile) {
        if (!confirm(`Are you sure you want to delete ${file.name}?`)) return;
        try {
            await deleteFile(file);
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete file.");
        }
    }
</script>

<div class="space-y-4">
    <div class="space-y-4 border p-4 rounded-lg bg-card">
        <h3 class="text-lg font-semibold flex items-center gap-2">
            <Link class="h-5 w-5" />
            Share a Link
        </h3>
        <div class="flex flex-col gap-3 sm:flex-row">
            <input
                type="text"
                placeholder="File Name (e.g., Project Specs)"
                bind:value={fileName}
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <input
                type="text"
                placeholder="URL (e.g., https://example.com/file.pdf)"
                bind:value={fileUrl}
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <button
                onclick={handleShare}
                disabled={sharing || !fileName || !fileUrl}
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
                {sharing ? "Sharing..." : "Share Link"}
            </button>
        </div>
    </div>

    <div class="grid gap-4">
        {#if files.length === 0}
            <div class="text-center py-8 text-muted-foreground">
                No links shared yet.
            </div>
        {:else}
            {#each files as file}
                <div
                    class="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                >
                    <div class="flex items-center gap-3 overflow-hidden">
                        <div class="p-2 bg-primary/10 rounded-md">
                            <Link class="h-5 w-5 text-primary" />
                        </div>
                        <div class="min-w-0">
                            <a
                                href={file.url}
                                target="_blank"
                                class="font-medium truncate hover:underline flex items-center gap-1"
                            >
                                {file.name}
                                <ExternalLink class="h-3 w-3 opacity-50" />
                            </a>
                            <p class="text-xs text-muted-foreground">
                                Shared by {file.uploaderEmail}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <a
                            href={file.url}
                            target="_blank"
                            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                            <ExternalLink class="h-4 w-4" />
                        </a>
                        {#if user.uid === file.uploaderId || team.ownerId === user.uid}
                            <button
                                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 text-destructive hover:text-destructive"
                                onclick={() => handleDelete(file)}
                            >
                                <Trash2 class="h-4 w-4" />
                            </button>
                        {/if}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
