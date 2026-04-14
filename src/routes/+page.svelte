<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let isLoaded = false;
  onMount(() => {
    isLoaded = true;
  });

  function goToLogin() {
    goto("/login");
  }

  function goToSignup() {
    goto("/login?mode=signup");
  }
</script>

<div class="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200 overflow-hidden relative selection:text-black">
  <!-- Subtle decorative background -->
  <div class="absolute inset-0 flex justify-center mt-[-10%] pointer-events-none">
    <div class="w-[800px] h-[400px] bg-gradient-to-b from-zinc-100 to-transparent blur-3xl rounded-full opacity-50"></div>
  </div>

  <!-- Navbar -->
  <header class="w-full flex justify-between items-center px-6 py-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
    <div class="text-xl font-bold tracking-tighter flex items-center gap-2">
      <div class="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center text-white font-bold">C</div>
      <span>C.E.M</span>
    </div>
    <div class="flex gap-4 items-center">
      <button onclick={goToLogin} class="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Log in</button>
      <button onclick={goToSignup} class="text-sm font-medium bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-zinc-800 transition-all shadow-sm">Sign up</button>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-screen-2xl mx-auto px-6 md:px-12 pt-16 md:pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16 relative z-10">
    
    <!-- Left Column: Copy & Actions -->
    <div class="flex-1 space-y-10" style="opacity: {isLoaded ? 1 : 0}; transform: translateY({isLoaded ? '0' : '20px'}); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-zinc-500"></span>
          Project Management Reimagined
        </div>
        
        <h1 class="text-5xl lg:text-[5rem] font-bold tracking-tighter leading-[1.05] text-zinc-950 mt-4 mb-4 pb-2">
          Organize your team's <span class="text-zinc-500 line-through decoration-zinc-300 decoration-4 block sm:inline">chaos</span> structure
        </h1>
        
        <p class="text-lg lg:text-xl text-zinc-500 leading-relaxed max-w-xl">
          A deeply minimal, highly competent project management system. Designed in a sleek fashion so you can get on with work without fighting a chunky UI.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-4">
        <button onclick={goToSignup} class="h-14 px-8 text-base bg-zinc-900 text-white hover:bg-zinc-800 rounded-full transition-all active:scale-95 font-medium shadow-xl shadow-zinc-900/10 flex items-center gap-2">
          Start for free
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
        <button onclick={goToLogin} class="h-14 px-8 text-base border border-zinc-200 hover:bg-zinc-50 rounded-full transition-all active:scale-95 text-zinc-700 font-medium">
          Log in
        </button>
      </div>

      <!-- Features snippet -->
      <div class="pt-10 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 class="text-zinc-900 font-semibold mb-2">Purpose Built</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">Competent system for teams big and small.</p>
        </div>
        <div>
          <h3 class="text-zinc-900 font-semibold mb-2">Sleek Design</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">Modern design allowing fast workflows.</p>
        </div>
        <div>
          <h3 class="text-zinc-900 font-semibold mb-2">Simple Onboarding</h3>
          <p class="text-sm text-zinc-500 leading-relaxed">Streamlined set for immediate utilisation.</p>
        </div>
      </div>
    </div>

    <!-- Right Column: Image Grid -->
    <div class="flex-1 w-full max-w-xl lg:max-w-none relative" style="opacity: {isLoaded ? 1 : 0}; transform: translateX({isLoaded ? '0' : '20px'}); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;">
      
      <!-- Grid layout for images -->
      <div class="grid grid-cols-2 gap-4 auto-rows-fr">
        
        <!-- Large Image -->
        <div class="col-span-2 rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 group aspect-[16/10] relative hover:shadow-2xl transition-all duration-500">
          <img 
            src="/collaborating.png" 
            alt="Collaborating" 
            class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
          />
        </div>

        <!-- Smaller Image 1 -->
        <div class="rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 group aspect-square relative mt-2 hover:shadow-xl transition-all duration-500">
          <img 
            src="/project.png" 
            alt="Project execution" 
            class="w-full h-full object-cover object-center p-2 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>

        <!-- Decorative / Placeholder Image -->
        <div class="rounded-3xl border border-zinc-100 bg-zinc-50 flex flex-col items-center justify-center p-6 text-center gap-3 aspect-square mt-2 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div class="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:text-zinc-600 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <p class="text-sm text-zinc-500 font-medium">Add your own<br/>workspace imagery</p>
        </div>
        
      </div>
      
    </div>
    
  </main>
</div>
