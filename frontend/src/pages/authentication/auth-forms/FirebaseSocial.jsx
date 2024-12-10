import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// assets
import Google from "../../../assets/icons/google.svg";
import Twitter from "../../../assets/icons/twitter.svg";
import Facebook from "../../../assets/icons/facebook.svg";
import { fromPairs } from "lodash";

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  // @ts-ignore
  const googleHandler = async () => {
    // login || singup
  };

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      justifyContent={{ xs: "space-around", sm: "space-between" }}
      sx={{
        "& .MuiButton-startIcon": {
          mr: { xs: 0, sm: 1 },
          ml: { xs: 0, sm: -0.5 },
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      ></Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
      ></Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      ></Button>
    </Stack>
  );
}
