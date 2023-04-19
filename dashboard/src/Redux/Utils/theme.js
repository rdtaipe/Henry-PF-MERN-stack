import { createContext, useState, useMemo } from "react";

import { createTheme } from "@mui/material/styles";

// color design tokens export
export const base = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414"
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509"
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922"
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f"
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632"
        }
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0"
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5"
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee"
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb"
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe"
        }
      })
});

export const picker=()=>{
  var i=2.55
  var max=100

  const fix2=(n)=>{
    var g=255
    var d=25
    var t=10

    var arr=[]
    for (let i = 0; i < t; i++) {
      arr.push(parseInt(g/d*i))

    }
    return arr[parseInt(n)]
  }


  const mix2=(a,b)=>{
    var c=a+b
    var d=c/2
    var e=d.toString(16)
    return e
  }
  const mix3=(a,b,c)=>{
    var d=a+b+c
    var e=d/3
    var f=e.toString(16)
    return f
  }
const xxx=(a,b,c,d)=>{

  var input=[a,b,c,d]

  var rgbaArr=[]

  input.map((v,x)=>{
    if(typeof v==="string"){
      switch ( v.slice(0,1)) {
        case "r":
          var f=fix2(v.slice(1))
          rgbaArr.push({n:"r",v:f})
          break;
        case "g":
          var f=fix2(v.slice(1))
          rgbaArr.push({n:"g",v:f})
          break;
        case "b":
          var f=fix2(v.slice(1))
          rgbaArr.push({n:"b",v:f})
          break;
        default:
      }
    }else if(typeof v==="number"){
      rgbaArr.push({n:"a",v:v})
    }
  })
  const fix=(v,n,e)=>{
    const IF=v.find(v=>v.n===n)
    if(IF){
      return IF.v
    }else{
      return e
    }
  }


  var r=fix(rgbaArr,"r",0)
  var g=fix(rgbaArr,"g",0)
  var b=fix(rgbaArr,"b",0)
  var a=fix(rgbaArr,"a",1)
  var rgb="rgb("+r+","+g+","+b+")"
  var rgba="rgba("+r+","+g+","+b+","+a+")"
  var gray=mix3(r,g,b)

  return [rgb,rgba,gray]

}


  const rgb=(r,g,b)=>{


    return xxx(r,g,b,1)[0]

  }
  const rgba=(r,g,b,a)=>{
    return xxx(r,g,b,a)[1]
  }
  const gray=(v,a)=>{
    var r=fix2(v)
    var g=fix2(v)
    var b=fix2(v)
    return xxx(r,g,b,a)[2]
  }
  return [rgb,rgba,gray]
}


// mui theme settings
export const themeSettings = (mode) => {
  const colors = base(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500]
            },
            secondary: {
              main: colors.greenAccent[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: colors.primary[500]
            }
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100]
            },
            secondary: {
              main: colors.greenAccent[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: "#fcfcfc"
            }
          })
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14
      }
    }
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"))
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
