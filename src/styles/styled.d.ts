import "styled-components";

// extend original declarations
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
      tertiary: string;
    };
  }
}
