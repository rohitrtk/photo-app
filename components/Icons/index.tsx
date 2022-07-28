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

export const HeartIcon = (props: any) => {

  const { filled } = props;
  const onClick = props.onClick;

  return (
    <Icon viewBox="0 0 48 48" boxSize="1.25em" color="black.900" onClick={onClick}>
      <path
        fill="currentColor"
        d={filled ?
          // Filled
          "m24 38.5-.85-.8Q18.2 33.2 15 29.975q-3.2-3.225-5.075-5.65-1.875-2.425-2.6-4.35Q6.6 18.05 6.6 16.15q0-3.5 2.375-5.875T14.85 7.9q2.7 0 5.025 1.5T24 13.8q1.9-2.95 4.175-4.425Q30.45 7.9 33.15 7.9q3.5 0 5.875 2.375T41.4 16.15q0 1.9-.725 3.825-.725 1.925-2.6 4.35T33 29.975Q29.8 33.2 24.85 37.7Z" :
          // Unfilled
          "m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1ZM24 38q5.05-4.65 8.325-7.975 3.275-3.325 5.2-5.825 1.925-2.5 2.7-4.45.775-1.95.775-3.9 0-3.3-2.1-5.425T33.5 8.3q-2.55 0-4.75 1.575T25.2 14.3h-2.45q-1.3-2.8-3.5-4.4-2.2-1.6-4.75-1.6-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 1.95.775 3.925.775 1.975 2.7 4.5Q12.4 26.8 15.7 30.1 19 33.4 24 38Zm0-14.85Z"
        }
      />
    </Icon>
  );
}