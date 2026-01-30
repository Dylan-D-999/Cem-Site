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
    <h1 align="center">C.E.M</h1>
    <h2 align="center">Project Management Solution</h2>
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


