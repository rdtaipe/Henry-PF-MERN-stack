import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export default function ScrollAnimate({ footer }) {
    const [footerStyle, setFooterStyle] = useState({ bottom: "-100%" });
    const footerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        function scrollFooter(scrollY, heightFooter) {
            if (scrollY >= heightFooter) {
                setFooterStyle({ bottom: "0px" });
            } else {
                setFooterStyle({ bottom: `-${heightFooter}px` });
            }
        }

        const footerHeight = footerRef.current.offsetHeight-5
        containerRef.current.style.height = `${footerHeight}px`;
        scrollFooter(window.scrollY, footerHeight);

        function handleScroll() {

            const scroll = window.scrollY;
            containerRef.current.style.top = `-${scroll}px`;
            scrollFooter(scroll, 0);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [footerRef, containerRef]);

    return (

        <Container ref={containerRef}>
            <Footer style={footerStyle} ref={footerRef}>
                {footer}
            </Footer>
        </Container>

    );
}

const Footer = styled.footer`
  width: 100%;
  height: auto;
  position: fixed;
  z-index: -9!important;
`;

const Container = styled.footer`
  position: relative;
  z-index: -9!important;
  transition: all 0.5s ease-in-out;
`;