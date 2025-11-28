<script lang="ts">
  import SignupForm from "$lib/components/signup-form.svelte";
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { auth } from "$lib/firebase";

  async function loginWithGoogle() {
    //Google Login Logic
    console.log("Logging in with Google...");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);
    } catch (e) {
      console.error("Login error:", e);
    }
  }
  async function loginWithMeta() {
    //Probably wont add Meta just as a test for func calls
    console.log("Logging in with Meta...");
  }
</script>

<div
  class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
>
  <div class="w-full max-w-sm md:max-w-4xl">
    <SignupForm onGoogleLogin={loginWithGoogle} onMetaLogin={loginWithMeta} />
  </div>
</div>
