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
    <title>C.E.M</title> 
</svelte:head>



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
