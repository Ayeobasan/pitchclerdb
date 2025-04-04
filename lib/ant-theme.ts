import type { ThemeConfig } from "antd"

export const theme: ThemeConfig = {
  token: {
    colorPrimary: "#9333ea", // Purple-600
    borderRadius: 6,
    colorLink: "#9333ea",
    colorLinkHover: "#7e22ce", // Purple-700
    fontFamily: "inherit",
  },
  components: {
    Button: {
      colorPrimary: "#9333ea",
    },
    Tabs: {
      colorPrimary: "#9333ea",
      itemSelectedColor: "#9333ea",
      itemHoverColor: "#a855f7", // Purple-500
    },
    Select: {
      colorPrimary: "#9333ea",
    },
    Input: {
      colorPrimary: "#9333ea",
    },
    Card: {
      colorPrimary: "#9333ea",
    },
  },
}

