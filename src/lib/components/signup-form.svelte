<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    class: className,
    onGoogleLogin,
    onMetaLogin,
    onToggle,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    onGoogleLogin?: () => void | Promise<void>;
    onMetaLogin?: () => void | Promise<void>;
    onToggle?: () => void;
  } = $props();

  import { auth } from "$lib/firebase";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { goto } from "$app/navigation";

  //Variables
  let email = $state("");
  let username = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let error = $state("");
  let loading = $state(false);

  //Function for handling  using firebase auth
  async function handleSignup(e: Event) {
    e.preventDefault();
    error = "";

    //Check if passwords match
    if (password !== confirmPassword) {
      error = "Passwords do not match";
      return;
    }

    //Set loading state to true
    loading = true;

    try {
      //Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //Update user profile with username
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      //Print success message to console and redirect to dashboard
      console.log("User created successfully");
      goto("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<!-- HTML Markup area for defining page layout and structure -->
<div class={cn("flex flex-col gap-6", className)} {...restProps}>
  <Card.Root class="overflow-hidden p-0">
    <Card.Content class="grid p-0 md:grid-cols-2">
      <form class="p-6 md:p-8" onsubmit={handleSignup}>
        <Field.Group>
          <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">Create your account</h1>
            <p class="text-muted-foreground text-balance text-sm">
              Enter your email below to create your account
            </p>
          </div>
          <Field.Field>
            <Field.Label for="username">Username</Field.Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              required
              bind:value={username}
            />
          </Field.Field>
          <Field.Field>
            <Field.Label for="email">Email</Field.Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              bind:value={email}
            />
            <Field.Description>
              We'll use this to contact you. We will not share your email with
              anyone else.
            </Field.Description>
          </Field.Field>
          <Field.Field>
            <Field.Field class="grid grid-cols-2 gap-4">
              <Field.Field>
                <Field.Label for="password">Password</Field.Label>
                <Input
                  id="password"
                  type="password"
                  required
                  bind:value={password}
                />
              </Field.Field>
              <Field.Field>
                <Field.Label for="confirm-password"
                  >Confirm Password</Field.Label
                >
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  bind:value={confirmPassword}
                />
              </Field.Field>
            </Field.Field>
            <Field.Description
              >Must be at least 8 characters long.</Field.Description
            >
          </Field.Field>
          <Field.Field>
            {#if error}
              <p class="text-destructive text-sm">{error}</p>
            {/if}
            <Button type="submit" disabled={loading}>
              {#if loading}
                Creating Account...
              {:else}
                Create Account
              {/if}
            </Button>
          </Field.Field>
          <Field.Separator
            class="*:data-[slot=field-separator-content]:bg-card"
          >
            Or continue with
          </Field.Separator>
          <Field.Field class="grid grid-cols-1 gap-4">
            <Button variant="outline" type="button" onclick={onGoogleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <span class="sr-only">Sign up with Google</span>
            </Button>
          </Field.Field>
          <Field.Description class="text-center">
            Already have an account? <button
              type="button"
              class="underline"
              onclick={onToggle}>Sign in</button
            >
          </Field.Description>
        </Field.Group>
      </form>
      <div class="bg-muted relative hidden md:block">
        <img
          src="/meeting.png"
          alt=""
          class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </Card.Content>
  </Card.Root>
  <Field.Description class="px-6 text-center">
    By clicking continue, you agree to our <a href="/terms">Terms of Service</a>
    and <a href="/privacy">Privacy Policy</a>.
  </Field.Description>
</div>
