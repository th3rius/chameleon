import css from "styled-jsx/css";

export default css.global`
  @import "sanitize.css";
  @import "sanitize.css/forms.css";
  @import "sanitize.css/typography.css";
  @import "@fontsource/iosevka-aile";

  :root {
    font-family: "Iosevka Aile", sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
  }
`;
