<script lang="ts">
    import { auth } from "$lib/firebase";
    import { onAuthStateChanged, signOut, type User } from "firebase/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";

    let user: User | null = $state(null);
    let loading = $state(true);

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            user = currentUser;
            loading = false;
            if (!currentUser) {
                goto("/login");
            }
        });

        return () => unsubscribe();
    });

    async function handleLogout() {
        try {
            await signOut(auth);
            goto("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
</script>

<div
    class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
>
    <div class="w-full max-w-md">
        <Card.Root>
            <Card.Header>
                <Card.Title class="text-2xl">Dashboard</Card.Title>
                <Card.Description>
                    Welcome to your account dashboard.
                </Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
                {#if loading}
                    <p>Loading user details...</p>
                {:else if user}
                    <div class="grid gap-2">
                        <div class="flex flex-col space-y-1">
                            <span
                                class="text-sm font-medium text-muted-foreground"
                                >Username</span
                            >
                            <span class="text-lg font-semibold"
                                >{user.displayName || "No username set"}</span
                            >
                        </div>
                        <div class="flex flex-col space-y-1">
                            <span
                                class="text-sm font-medium text-muted-foreground"
                                >Email</span
                            >
                            <span class="text-lg font-semibold"
                                >{user.email}</span
                            >
                        </div>
                        <div class="flex flex-col space-y-1">
                            <span
                                class="text-sm font-medium text-muted-foreground"
                                >User ID</span
                            >
                            <span class="text-xs font-mono bg-muted p-2 rounded"
                                >{user.uid}</span
                            >
                        </div>
                    </div>
                    <Button
                        onclick={handleLogout}
                        variant="destructive"
                        class="w-full"
                    >
                        Logout
                    </Button>
                {:else}
                    <p>Redirecting...</p>
                {/if}
            </Card.Content>
        </Card.Root>
    </div>
</div>
