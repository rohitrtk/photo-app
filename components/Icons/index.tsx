import React from "react";
import { Icon } from "@chakra-ui/react"

export const LoginIcon = (props: any) => {
  return (
    <Icon viewBox="0 0 48 48" boxSize="2em" color="black.900" {...props}>
      <path
        fill="currentColor"
        d="M24.45 42v-3H39V9H24.45V6H39q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm-3.9-9.25L18.4 30.6l5.1-5.1H6v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
    </Icon>
  );
}

export const LogoutIcon = (props: any) => {
  return (
    <Icon viewBox="0 0 48 48" boxSize="2em" color="black.900" {...props}>
      <path
        fill="currentColor"
        d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z"
      />
    </Icon>
  );
}

export const AddIcon = (props: any) => {
  return (
    <Icon viewBox="0 0 48 48" boxSize="2em" color="black.900" {...props}>
      <path
        fill="currentColor"
        d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"
      />
    </Icon>
  );
}