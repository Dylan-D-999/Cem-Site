<script lang="ts">
  import { Container } from "@sveltestrap/sveltestrap";
  import firebase from "firebase/app";
  import "firebase/auth";
    import { onMount } from "svelte";
  onMount(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDYQsKf4EEEACHAZmBfOqjYfwhBKYaHE_0",
      authDomain: "cem-site-sda2.firebaseapp.com",
      projectId: "cem-site-sda2",
      storageBucket: "cem-site-sda2.firebasestorage.app",
      messagingSenderId: "919366559284",
      appId: "1:919366559284:web:e9a06e37f81ba3bf760c61"

    };

    firebase.initializeApp(firebaseConfig);

  }
</script>

<Container>
  <slot />
</Container>
