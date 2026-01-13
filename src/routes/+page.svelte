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

  h1 {
    font-size: 35px;
    text-align: center;
  }

  .sub-heading {
    font-size: 25px;
  }

h2 {
  font-size: 20px;
  text-align: center;
}
p {
  
}

.button-container {
  text-align: center;
  align-items: center;
}



</style>

<Row>
  <Col>
    <h1>C.E.M</h1>
    <h2>Project Management Solution</h2>
  </Col>
</Row>
    


<div class="button-container"> 
  <Button onclick={goToSignInPage}>Login</Button>
  <Button href="/login?mode=signup">Sign up</Button>
  </div>

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

<Row>
  <Col>
 
  </Col>
</Row>


