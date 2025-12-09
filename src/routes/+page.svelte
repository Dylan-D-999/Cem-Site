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
    <h1>C.E.M</h1>
    <h2>Project Management Solution</h2>
  </Col>
</Row>

<ButtonGroup.Root>
  <Button onclick={goToSignInPage}>Login</Button>
  <Button onclick={goToSignInPage}>Sign up</Button>
</ButtonGroup.Root>


<Row>
  <Col>
 
  </Col>
</Row>