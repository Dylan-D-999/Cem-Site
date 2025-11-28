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
    <h1>Welcome To CEM</h1>
  </Col>
</Row>

<ButtonGroup.Root>
  <Button onclick={goToSignInPage}>Go To Login Page</Button>
  <Button onclick={goToSignInPage}>Test Button</Button>
</ButtonGroup.Root>
