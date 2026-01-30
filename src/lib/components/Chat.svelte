<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import * as Card from "$lib/components/ui/card";
    import {
        sendMessage,
        subscribeToTeamMessages,
        type Message,
    } from "$lib/chat";
    import type { User } from "firebase/auth";

    export let teamId: string;
    export let user: User;

    let messages: Message[] = [];
    let newMessage = "";
    let unsubscribe: () => void;
    let chatContainer: HTMLElement;
    let sending = false;

    // Subscribe to messages when teamId changes
    $: if (teamId) {
        if (unsubscribe) unsubscribe();
        unsubscribe = subscribeToTeamMessages(teamId, (updatedMessages) => {
            messages = updatedMessages;
            scrollToBottom();
        });
    }

    onMount(() => {
        return () => {
            if (unsubscribe) unsubscribe();
        };
    });

    afterUpdate(() => {
        scrollToBottom();
    });

    //auto scroll
    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    //sending messages
    async function handleSendMessage() {
        if (!newMessage.trim() || !user || !teamId) return;

        sending = true;
        try {
            await sendMessage(
                teamId,
                { uid: user.uid, email: user.email || "" },
                newMessage,
            );
            newMessage = "";
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            sending = false;
        }
    }

    function formatTime(timestamp: any) {
        if (!timestamp) return "";
        // Firestore timestamp to date
        const date = timestamp.toDate
            ? timestamp.toDate()
            : new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
</script>

<Card.Root class="h-[500px] flex flex-col">
    <Card.Header class="pb-3">
        <Card.Title>Team Chat</Card.Title>
    </Card.Header>
    <Card.Content class="flex-1 overflow-hidden flex flex-col gap-4">
        <div
            class="flex-1 overflow-y-auto space-y-4 pr-2"
            bind:this={chatContainer}
        >
            {#if messages.length === 0}
                <div
                    class="h-full flex items-center justify-center text-muted-foreground text-sm"
                >
                    No messages yet. Start the conversation!
                </div>
            {:else}
                {#each messages as message}
                    <div
                        class="flex flex-col {message.senderId === user.uid
                            ? 'items-end'
                            : 'items-start'}"
                    >
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs text-muted-foreground">
                                {message.senderId === user.uid
                                    ? "You"
                                    : message.senderEmail}
                            </span>
                            <span class="text-[10px] text-muted-foreground/70">
                                {formatTime(message.createdAt)}
                            </span>
                        </div>
                        <div
                            class="px-3 py-2 rounded-lg max-w-[80%] text-sm {message.senderId ===
                            user.uid
                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                : 'bg-muted rounded-tl-none'}"
                        >
                            {message.content}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="flex gap-2 pt-2 mt-auto">
            <Input
                bind:value={newMessage}
                placeholder="Type a message..."
                onkeydown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={sending}
            />
            <Button
                onclick={handleSendMessage}
                disabled={sending || !newMessage.trim()}
                size="icon"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-send"
                    ><path d="m22 2-7 20-4-9-9-4Z" /><path
                        d="M22 2 11 13"
                    /></svg
                >
            </Button>
        </div>
    </Card.Content>
</Card.Root>
