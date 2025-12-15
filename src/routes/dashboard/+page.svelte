<script lang="ts">
    import { auth } from "$lib/firebase";
    import { onAuthStateChanged, signOut, type User } from "firebase/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import {
        createTeam,
        subscribeToUserTeams,
        subscribeToPendingInvitations,
        subscribeToTeamInvitations,
        acceptInvitation,
        rejectInvitation,
        inviteMember,
        type Team,
        type Invitation,
    } from "$lib/teams";
    import {
        addTask,
        subscribeToTeamTasks,
        toggleTaskCompletion,
        deleteTask,
        type Task,
    } from "$lib/tasks";
    import Chat from "$lib/components/Chat.svelte";

    let user: User | null = $state(null);
    let loading = $state(true);

    // Team State
    let teams: Team[] = $state([]);
    let invitations: Invitation[] = $state([]); // Received invitations
    let sentInvitations: Invitation[] = $state([]); // Sent invitations for selected team
    let selectedTeam: Team | null = $state(null);
    let tasks: Task[] = $state([]); // Team tasks

    // Form State
    let newTeamName = $state("");
    let inviteEmail = $state("");
    let isCreatingTeam = $state(false);
    let isInviting = $state(false);

    // Task State
    let newTaskContent = $state("");
    let isAddingTask = $state(false);
    let assignedMemberId = $state("");
    let taskDeadline = $state("");

    onMount(() => {
        let unsubscribeTeams: () => void;
        let unsubscribeInvites: () => void;
        let unsubscribeSentInvites: () => void;
        let unsubscribeTasks: () => void;

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            user = currentUser;
            loading = false;

            // Clean up previous subscriptions if user changes or logs out
            if (unsubscribeTeams) unsubscribeTeams();
            if (unsubscribeInvites) unsubscribeInvites();
            if (unsubscribeSentInvites) unsubscribeSentInvites();

            if (!currentUser) {
                goto("/login");
            } else {
                // Subscribe to real-time updates
                unsubscribeTeams = subscribeToUserTeams(
                    currentUser.uid,
                    (updatedTeams) => {
                        teams = updatedTeams;
                        // Update selectedTeam if it exists in the new list
                        if (selectedTeam) {
                            const updatedSelected = updatedTeams.find(
                                (t) => t.id === selectedTeam!.id,
                            );
                            if (updatedSelected) {
                                selectedTeam = updatedSelected;
                            }
                        }
                    },
                );

                unsubscribeInvites = subscribeToPendingInvitations(
                    currentUser.email || "",
                    (updatedInvites) => {
                        invitations = updatedInvites;
                    },
                );
            }
        });

        // Effect to subscribe to sent invitations and tasks when selectedTeam changes
        $effect(() => {
            if (unsubscribeSentInvites) unsubscribeSentInvites();
            if (unsubscribeTasks) unsubscribeTasks();

            if (selectedTeam) {
                unsubscribeSentInvites = subscribeToTeamInvitations(
                    selectedTeam.id,
                    (invites) => {
                        sentInvitations = invites;
                    },
                );
                unsubscribeTasks = subscribeToTeamTasks(
                    selectedTeam.id,
                    (updatedTasks) => {
                        tasks = updatedTasks;
                    },
                );
            } else {
                sentInvitations = [];
                tasks = [];
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeTeams) unsubscribeTeams();
            if (unsubscribeInvites) unsubscribeInvites();
            if (unsubscribeSentInvites) unsubscribeSentInvites();
        };
    });

    async function handleCreateTeam() {
        if (!user || !newTeamName.trim()) return;
        isCreatingTeam = true;
        try {
            await createTeam(newTeamName, {
                uid: user.uid,
                email: user.email || "",
            });
            newTeamName = "";
            // Data updates automatically via subscription
        } catch (error) {
            console.error("Error creating team:", error);
        } finally {
            isCreatingTeam = false;
        }
    }

    async function handleInvite() {
        if (!selectedTeam || !user || !inviteEmail.trim()) return;
        isInviting = true;
        try {
            await inviteMember(
                selectedTeam.id,
                selectedTeam.name,
                user.uid,
                inviteEmail,
            );
            inviteEmail = "";
            alert("Invitation sent!");
        } catch (error) {
            console.error("Error sending invitation:", error);
            alert("Failed to send invitation.");
        } finally {
            isInviting = false;
        }
    }

    async function handleAcceptInvite(invite: Invitation) {
        if (!user) return;
        try {
            await acceptInvitation(invite.id, {
                uid: user.uid,
                email: user.email || "",
            });
            // Data updates automatically via subscription
        } catch (error) {
            console.error("Error accepting invite:", error);
        }
    }

    async function handleRejectInvite(invite: Invitation) {
        try {
            await rejectInvitation(invite.id);
            // Data updates automatically via subscription
        } catch (error) {
            console.error("Error rejecting invite:", error);
        }
    }
    // Handle adding tasks to the database
    async function handleAddTask() {
        if (!selectedTeam || !user || !newTaskContent.trim()) return;
        isAddingTask = true;
        try {
            let assignedTo = null;
            if (assignedMemberId) {
                const member = selectedTeam.members.find(
                    (m) => m.uid === assignedMemberId,
                );
                if (member) {
                    assignedTo = { uid: member.uid, email: member.email };
                }
            }
            await addTask(
                selectedTeam.id,
                newTaskContent,
                user.uid,
                assignedTo,
                taskDeadline || null,
            );
            newTaskContent = "";
            assignedMemberId = "";
            taskDeadline = "";
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            isAddingTask = false;
        }
    }

    async function handleToggleTask(task: Task) {
        try {
            await toggleTaskCompletion(task.id, task.isCompleted);
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    }

    //delete tasks from the database
    async function handleDeleteTask(task: Task) {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask(task.id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    async function handleLogout() {
        //Wait for firebase signout function to complete
        try {
            await signOut(auth);
            goto("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    function formatDate(dateString: string) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
</script>

<!-- HTML Markup area for defining page layout and structure -->
<div class="bg-muted flex min-h-svh flex-col items-center p-6 md:p-10">
    <div class="w-full max-w-4xl grid gap-6 md:grid-cols-2">
        <!-- User Profile & Teams List -->
        <div class="space-y-6">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Profile</Card.Title>
                </Card.Header>
                <Card.Content class="space-y-4">
                    {#if loading}
                        <p>Loading...</p>
                    {:else if user}
                        <div class="grid gap-2">
                            <div>
                                <span
                                    class="text-sm font-medium text-muted-foreground"
                                    >Email</span
                                >
                                <div class="font-semibold">{user.email}</div>
                            </div>
                            <Button
                                onclick={handleLogout}
                                variant="destructive"
                                size="sm">Logout</Button
                            >
                        </div>
                    {/if}
                </Card.Content>
            </Card.Root>

            <Card.Root>
                <Card.Header>
                    <Card.Title>Your Teams</Card.Title>
                    <Card.Description
                        >Manage your teams and collaborations.</Card.Description
                    >
                </Card.Header>
                <Card.Content class="space-y-4">
                    <div class="flex gap-2">
                        <Input
                            bind:value={newTeamName}
                            placeholder="New Team Name"
                        />
                        <Button
                            onclick={handleCreateTeam}
                            disabled={isCreatingTeam}
                        >
                            {isCreatingTeam ? "Creating..." : "Create"}
                        </Button>
                    </div>

                    <div class="space-y-2">
                        {#if teams.length === 0}
                            <p class="text-sm text-muted-foreground">
                                No teams yet.
                            </p>
                        {:else}
                            {#each teams as team}
                                <button
                                    class="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors {selectedTeam?.id ===
                                    team.id
                                        ? 'bg-accent border-primary'
                                        : ''}"
                                    onclick={() => (selectedTeam = team)}
                                >
                                    <div class="font-medium">{team.name}</div>
                                    <div class="text-xs text-muted-foreground">
                                        {team.members.length} members
                                    </div>
                                </button>
                            {/each}
                        {/if}
                    </div>
                </Card.Content>
            </Card.Root>

            {#if invitations.length > 0}
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Invitations</Card.Title>
                    </Card.Header>
                    <Card.Content class="space-y-2">
                        {#each invitations as invite}
                            <div
                                class="flex items-center justify-between p-3 border rounded-lg"
                            >
                                <div>
                                    <div class="font-medium">
                                        {invite.teamName}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        Invited by user ID: {invite.inviterId}
                                    </div>
                                </div>
                                <div class="flex gap-2">
                                    <Button
                                        size="sm"
                                        onclick={() =>
                                            handleAcceptInvite(invite)}
                                        >Accept</Button
                                    >
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onclick={() =>
                                            handleRejectInvite(invite)}
                                        >Decline</Button
                                    >
                                </div>
                            </div>
                        {/each}
                    </Card.Content>
                </Card.Root>
            {/if}
        </div>

        <!-- Team Details View -->
        <div class="space-y-6">
            {#if selectedTeam}
                <Card.Root class="h-full">
                    <Card.Header>
                        <Card.Title>{selectedTeam.name}</Card.Title>
                        <Card.Description>Team Dashboard</Card.Description>
                    </Card.Header>
                    <Card.Content class="space-y-6">
                        <div>
                            <h3 class="font-semibold mb-2">Members</h3>
                            <div class="space-y-2">
                                {#each selectedTeam.members as member}
                                    <div
                                        class="flex items-center justify-between p-2 bg-muted/50 rounded"
                                    >
                                        <div class="text-sm">
                                            <div class="font-medium">
                                                {member.email}
                                            </div>
                                            <div
                                                class="text-xs text-muted-foreground capitalize"
                                            >
                                                {member.role}
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>

                        <div class="space-y-2 pt-4 border-t">
                            <h3 class="font-semibold">Invite Member</h3>
                            <div class="flex gap-2">
                                <Input
                                    bind:value={inviteEmail}
                                    placeholder="User Email"
                                />
                                <Button
                                    onclick={handleInvite}
                                    disabled={isInviting}
                                >
                                    {isInviting ? "Sending..." : "Invite"}
                                </Button>
                            </div>
                        </div>

                        <div class="space-y-2 pt-4 border-t">
                            <h3 class="font-semibold">Team Tasks</h3>
                            <div class="flex gap-2 flex-wrap">
                                <Input
                                    bind:value={newTaskContent}
                                    placeholder="Add a new task..."
                                    class="flex-1 min-w-[200px]"
                                    onkeydown={(e) =>
                                        e.key === "Enter" && handleAddTask()}
                                />
                                <select
                                    bind:value={assignedMemberId}
                                    class="flex h-10 w-[150px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Assign to...</option>
                                    {#each selectedTeam.members as member}
                                        <option value={member.uid}
                                            >{member.email}</option
                                        >
                                    {/each}
                                </select>
                                <Input
                                    type="date"
                                    bind:value={taskDeadline}
                                    class="w-[150px]"
                                />
                                <Button
                                    onclick={handleAddTask}
                                    disabled={isAddingTask}
                                >
                                    {isAddingTask ? "Adding..." : "Add"}
                                </Button>
                            </div>

                            <div class="space-y-2 mt-4">
                                {#if tasks.length === 0}
                                    <p class="text-sm text-muted-foreground">
                                        No tasks yet.
                                    </p>
                                {:else}
                                    {#each tasks as task}
                                        <div
                                            class="flex items-center justify-between p-3 border rounded-lg {task.isCompleted
                                                ? 'bg-muted/50'
                                                : ''}"
                                        >
                                            <div
                                                class="flex items-center gap-3 flex-1"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={task.isCompleted}
                                                    onchange={() =>
                                                        handleToggleTask(task)}
                                                    class="h-4 w-4"
                                                />
                                                <div class="flex flex-col">
                                                    <span
                                                        class={task.isCompleted
                                                            ? "line-through text-muted-foreground"
                                                            : ""}
                                                    >
                                                        {task.content}
                                                    </span>
                                                    <div
                                                        class="flex gap-2 mt-1"
                                                    >
                                                        {#if task.assignedTo}
                                                            <span
                                                                class="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground"
                                                            >
                                                                {task.assignedTo
                                                                    .email}
                                                            </span>
                                                        {/if}
                                                        {#if task.deadline}
                                                            <span
                                                                class="text-xs text-muted-foreground border px-2 py-0.5 rounded-full"
                                                            >
                                                                Due: {formatDate(
                                                                    task.deadline,
                                                                )}
                                                            </span>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                class="h-8 w-8 text-destructive"
                                                onclick={() =>
                                                    handleDeleteTask(task)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="lucide lucide-trash-2"
                                                    ><path d="M3 6h18" /><path
                                                        d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                                                    /><path
                                                        d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                                                    /><line
                                                        x1="10"
                                                        x2="10"
                                                        y1="11"
                                                        y2="17"
                                                    /><line
                                                        x1="14"
                                                        x2="14"
                                                        y1="11"
                                                        y2="17"
                                                    /></svg
                                                >
                                            </Button>
                                        </div>
                                    {/each}
                                {/if}
                            </div>
                        </div>

                        {#if sentInvitations.length > 0}
                            <div class="space-y-2 pt-4 border-t">
                                <h3 class="font-semibold">
                                    Pending Invitations
                                </h3>
                                <div class="space-y-2">
                                    {#each sentInvitations as invite}
                                        <div
                                            class="flex items-center justify-between p-2 bg-muted/50 rounded"
                                        >
                                            <div class="text-sm">
                                                <div class="font-medium">
                                                    {invite.inviteeEmail}
                                                </div>
                                                <div
                                                    class="text-xs text-muted-foreground"
                                                >
                                                    Status: {invite.status}
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        {#if user}
                            <div class="pt-4 border-t">
                                <Chat teamId={selectedTeam.id} {user} />
                            </div>
                        {/if}
                    </Card.Content>
                </Card.Root>
            {:else}
                <div
                    class="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl p-12"
                >
                    Select a team to view details
                </div>
            {/if}
        </div>
    </div>
</div>
