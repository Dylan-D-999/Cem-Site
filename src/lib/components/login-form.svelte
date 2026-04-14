<script lang="ts">
  //TypeScript Script area
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { auth } from "$lib/firebase";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from "$app/navigation";

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

  //Variables
  let email = $state("");
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  //Function for logging in with email and password using firebase auth
  async function handleLogin(e: Event) {
    e.preventDefault();
    error = "";
    loading = true;

    //Try catch block for logging in with email and password
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully");
      goto("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
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
      <form class="p-6 md:p-8" onsubmit={handleLogin}>
        <Field.Group>
          <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <p class="text-muted-foreground text-balance text-sm">
              Login to your account
            </p>
          </div>
          <Field.Field>
            <Field.Label for="email">Email</Field.Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              bind:value={email}
            />
          </Field.Field>
          <Field.Field>
            <div class="flex items-center justify-between">
              <Field.Label for="password">Password</Field.Label>
              <a
                href="/forgot-password"
                class="text-muted-foreground hover:text-primary ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
              bind:value={password}
            />
          </Field.Field>

          {#if error}
            <p class="text-destructive text-sm">{error}</p>
          {/if}

          <Field.Field>
            <Button type="submit" class="w-full" disabled={loading}>
              {#if loading}
                Logging in...
              {:else}
                Login
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
              <span class="sr-only">Sign in with Google</span>
            </Button>
          </Field.Field>
          <Field.Description class="text-center">
            Don't have an account? <button
              type="button"
              class="underline"
              onclick={onToggle}>Sign up</button
            >
          </Field.Description>
        </Field.Group>
      </form>
      <div class="bg-muted relative hidden md:block">
        <img
          src="/project.png"
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
