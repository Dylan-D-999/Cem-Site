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

<ButtonGroup.Root>
  <Button onclick={goToSignInPage}>Login</Button>
  <Button href="/login?mode=signup">Sign up</Button>
</ButtonGroup.Root>
<div class="images">
<img src="/collaborating.png" alt="Collaborating Image" />
<img src="/project.png" alt="Team members collaborating..." />

</div>
<Row>
  <Col>
 
  </Col>
</Row>