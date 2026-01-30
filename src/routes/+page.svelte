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

<Row>
  <Col>
    <div class="text-center text-4xl">
    <h1> <b>  C.E.M</b> </h1>
  </div>
  <div class = "text-center text-xl">
    <h3>Project Managment Solution</h3>
  </div>
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

<div class="flex gap-12 max-w-3xl mx-auto fixed bottom-2.5 left-1/4">
    
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



