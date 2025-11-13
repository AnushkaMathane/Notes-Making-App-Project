import React from "react";
import image from "../../assets/image.png";
import styled from "styled-components";
import { MdLock as Lock } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
`;

const Footer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

function FallbackPage() {
  return (
    <div className="fallback-page">
      {" "}
      {/* FIXED */}
      <Wrapper>
        <Main>
          <ImageContainer>
            <Image src={image} alt="background" />
          </ImageContainer>
          <h2>Pocket Notes</h2>
          <p style={{ width: "50%", textAlign: "center" }}>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
          <Footer>
            <Lock /> end-to-end encrypted
          </Footer>
        </Main>
      </Wrapper>
    </div>
  );
}

export default FallbackPage;
