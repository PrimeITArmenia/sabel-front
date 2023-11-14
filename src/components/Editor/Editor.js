import {
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
    Box,
    Stack,
} from "@mui/material";
import LexicalEditorWrapper from "./components/LexicalEditorWrapper";
import theme from "./theme";
import React, {useState} from "react";
import Tags from "@/components/Editor/tags";

function Editor({getData, data}) {
    return (
      <div className="editor-wrapper">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid
            container
            sx={{ minHeight: "100vh" }}
            flexDirection="column"
            alignItems="center"
          >
            <Grid item sx={{ width: "100%", overflow: "hidden" }}>
              <LexicalEditorWrapper getData={getData} data={data}/>
              {/* <Tags /> */}
              {/* <TextField name="upload-photo" type="file" /> */}
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
}
export default Editor
