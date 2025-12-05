<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Field from "$lib/components/ui/field/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    //Page for handling password reset yet to be implemented will need to get back to this
</script>

<div
    class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
>
    <div class="w-full max-w-sm">
        <Card.Root>
            <Card.Header>
                <Card.Title class="text-2xl">Reset Password</Card.Title>
                <Card.Description>
                    Enter your email address and we'll send you a link to reset
                    your password.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <form>
                    <div class="grid gap-4">
                        <div class="grid gap-2">
                            <Field.Label for="email">Email</Field.Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <Button type="submit" class="w-full">
                            Send Reset Link
                        </Button>
                    </div>
                    <div class="mt-4 text-center text-sm">
                        <a href="/login" class="underline"> Back to Login </a>
                    </div>
                </form>
            </Card.Content>
        </Card.Root>
    </div>
</div>
