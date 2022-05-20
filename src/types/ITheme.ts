interface ITheme {
  bgPrimary: string;
  textPrimary: string;
  fontFamily: string;
  fontSize: {
    headline: string;
    body: string;
  };
  fontColor: {
    primary: string;
    secondary: string;
  };
  fontWeight: {
    regular: number;
    bold: number;
  };
}

export default ITheme;
