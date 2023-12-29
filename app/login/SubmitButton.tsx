"use client"

import { Button } from "@/components/Button";
// Still in canary
// @ts-ignore
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const {pending} = useFormStatus();
    return <Button variant="default" className='mt-2 w-full' type="submit" disabled={pending} aria-disabled={pending}>Sign In</Button>;
}