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

.columns-container {
  display: flex;
  gap: 3rem;
  max-width: 1000px;
  margin: auto;
  position: fixed;
  bottom: 10px;
  left: 25%;
}



</style>

<Row>
  <Col>
    <h1 align="center">C.E.M</h1>
    <h2 align="center">Project Management Solution</h2>
  </Col>
</Row>

<div class="flex flex row justify-center mt-6">
<ButtonGroup.Root>
  <Button onclick={goToSignInPage}>Login</Button>
  <Button href="/login?mode=signup">Sign up</Button>
  </div>


<div class = "columns-container">
    
  <p>
        <b>ⓘ Purpose Built </b> <br>
        A competent and modern <br>
        project management <br>
         system for teams <br> 
         big and small </p>

        <p> <b>ⓘ Sleek Design</b> <br>
          Designed in a sleek modern <br>
          fashion allowing you to get on with <br>
          work without having too fight a <br>
          chunky UI. </p>

          <p> <b>ⓘ Simple Onboarding </b> <br> 
            Simple design and a streamlined <br>
          feature set allows fast onboarding <br>
        and utilisation in your team. </p>
  
</div>
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


