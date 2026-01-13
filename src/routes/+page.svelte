<script lang="ts">
  //Typescript script section
  import { Row, Col } from "@sveltestrap/sveltestrap";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";

  //Function to go to sign in page defined in /src/routes/login
  function goToSignInPage() {
    console.log("Changing to login page");
    goto("/login");
  }

</script>

<svelte:head>
    <title>C.E.M</title> 
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
  .info-section {
    margin: 40px 0;
    padding: 20px;
    border-top: 1px solid #ddd;
  }

  .column {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .page-container { 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column;
    justify-content: flex-end; 
    padding: 2rem; 
  }
  .info-row { 
    display: flex; 
    gap: 2rem; 
    padding: 40px 0;
    justify-content: center;
  }
  .info-section { 
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

<div class="page-container">
<div class="info-row">
  <div class="column">
    <section class="info-section">
      <h2> Purpose Built </h2>
      <p> A competent and modern <br>
        project management solution <br>
        built for teams of all sized </p>
    </section>
  </div>
  <div class="column">
    <section class="info-section">
      <h2> Minimalistic Design </h2>
      <p> Designed in a minimalist style <br>
        with user experience in mind <br>
        for maximum productivity </p>
    </section>
  </div>
  <div class="column">
    <section class="info-section">
      <h2> Simple Onboarding </h2>
      <p> Simple design and a streamlined <br>
        feature set that allows fast onboarding <br>
        and utilisation in teams </p>
    </section>
  </div>
</div>
</div>


  
