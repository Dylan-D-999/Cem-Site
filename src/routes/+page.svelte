<script lang="ts">
  //Typescript script section
  import { Row, Col } from "@sveltestrap/sveltestrap";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";
    import SignupForm from "$lib/components/signup-form.svelte";
  //Function to go to sign in page defined in /src/routes/login
  function goToSignInPage() {
    console.log("Changing to login page");
    goto("/login");
  }

</script>

<svelte:head>
    <title>C.E.M - Project Management Solutions</title> 
</svelte:head>

<style>

h1{
  font-size: 35px;
  text-align: center;
}
h2 {
  font-size: 20px;
  text-align: center;
}

</style>

<Row>
  <Col>
    <h1>C.E.M</h1>
    <h2>Project Management Solution</h2>
  </Col>
</Row>
<div class="flex flex row justify-center mt-6">
<ButtonGroup.Root>
  <Button onclick={goToSignInPage}>Login</Button>
  <Button href="/login?mode=signup">Sign up</Button>
</ButtonGroup.Root>
</div>
<div class="flex flex row images gap-1 justify-center mt-6">
<img src="/collaborating.png" alt="Collaborating Image" class="w-75" h="auto" />
<img src="/project.png" alt="Team members collaborating..." class="w-75" h="auto" />

</div>
<Row>
  <Col>
 
  </Col>
</Row>