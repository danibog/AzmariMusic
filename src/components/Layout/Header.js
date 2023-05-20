import { Button, Flex, Image } from "theme-ui";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Chevron from "../../Images/left-arrow-svgrepo-com.svg";

const StyledButton = styled(Button)`
  cursor: pointer;
  transition: all 0.12s;
  margin: 0 4px;

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: ${props.theme.buttons.primary.bg};
      color: ${props.theme.buttons.primary.color};

      &:hover {
        color: white;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: ${props.theme.buttons.secondary.bg};
      color: ${props.theme.buttons.secondary.color};
      &:hover {
        background-color: "rgba(255, 255, 255, 0.884)";
      }
    `} 
    &:hover {
    transform: scale(1.09);
  }
  &:disabled,
  &:disabled:hover {
    background-color: gray;
    transform: none;
  }
`;

const StyledIcon = styled(Image)`
  align-self: center;
  border-radius: 50%;
  font-size: 10px;
  height: 3rem;
  padding: 1rem;
  padding-right: 1rem;
  ${(props) =>
    css`
      src: ${props.src};
      background-color: ${props.theme.colors.black4};
    `}
  &:hover {
    background-color: #ffffffc4;
    transform: scale(0.95);
  }
`;

const Header = () => {
  return (
    <Flex
      sx={{
        position: "fixed",
        justifyContent: "space-between",
        padding: "1rem",
        paddingLeft: "16rem",
        zIndex: "100",
        width: "100%",
        bg: "black3",
      }}
    >
      <StyledIcon src={Chevron}></StyledIcon>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <StyledButton variant="primary" disabled={true}>
          Login
        </StyledButton>
        <StyledButton variant="secondary">Logout</StyledButton>
      </Flex>
    </Flex>
  );
};

export default Header;