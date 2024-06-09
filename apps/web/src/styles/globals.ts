import css from "styled-jsx/css";

export default css.global`
  @import "sanitize.css";
  @import "sanitize.css/forms.css";
  @import "sanitize.css/typography.css";
  @import "@fontsource/iosevka-aile";
  @import "@fontsource/iosevka-aile/500.css";
  @import "@fontsource/iosevka-aile/700.css";

  :root {
    font-family: "Iosevka Aile", sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }
`;
