// import { $getRoot, $getSelection } from "lexical";
// import { useEffect } from "react";

// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { MuiContentEditable, placeHolderSx } from "./styles";
// import { Box, Divider } from "@mui/material";
// import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
// import LexicalEditorTopBar from "../LexicalEditorTopBar";
// import TreeViewPlugin from "../CustomPlugins/TreeViewPlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
// import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
// import ImagesPlugin from "../CustomPlugins/ImagePlugin";
// import FloatingTextFormatToolbarPlugin from "../CustomPlugins/FloatingTextFormatPlugin";

// function LexicalEditorWrapper({getData}) {
//   console.log('getData', getData)
//   return (
//     <LexicalComposer initialConfig={lexicalEditorConfig}>
//       <LexicalEditorTopBar />
//       <Divider />
//       <Box sx={{ position: "relative", background: "white" }}>
//         <RichTextPlugin
//           contentEditable={<MuiContentEditable />}
//           placeholder={<Box sx={placeHolderSx}>Text</Box>}
//           ErrorBoundary={LexicalErrorBoundary}
//         />
//         <TreeViewPlugin/>
//         <OnChangePlugin onChange={onChange} getData = {getData}/>
//         <HistoryPlugin />
//         <ListPlugin />
//         <LinkPlugin />
//         <ImagesPlugin captionsEnabled={false} />
//         <FloatingTextFormatToolbarPlugin />
//       </Box>
//     </LexicalComposer>
//   );
// }

// function onChange(editorState) {
//   editorState.read(() => {
//     // Read the contents of the EditorState here.
//     const root = $getRoot();
//     const selection = $getSelection();

//     console.log(root, selection);
//     // getData(root)
//   });
// }

// // Lexical React plugins are React components, which makes them
// // highly composable. Furthermore, you can lazy load plugins if
// // desired, so you don't pay the cost for plugins until you
// // actually use them.
// function MyCustomAutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus();
//   }, [editor]);

//   return null;
// }

// export default LexicalEditorWrapper;
import {$generateNodesFromDOM} from '@lexical/html';
import {$getRoot, $getSelection} from 'lexical';
import {$generateHtmlFromNodes} from '@lexical/html';
import {useEffect} from 'react';
import { useState } from 'react';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
// import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
// import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { lexicalEditorConfig } from "../../config/lexicalEditorConfig";
import LexicalEditorTopBar from "../LexicalEditorTopBar";
import { Box, Divider } from "@mui/material";
import TreeViewPlugin from "../CustomPlugins/TreeViewPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../CustomPlugins/ImagePlugin";
import FloatingTextFormatToolbarPlugin from "../CustomPlugins/FloatingTextFormatPlugin";
import { MuiContentEditable, placeHolderSx } from "./styles";
import { ContentPasteSearchOutlined } from '@mui/icons-material';

const theme = {

}

function OnChangePlugin({ onChange, getData }) {
  // console.log(getData)
  const [editor] = useLexicalComposerContext();
  editor.update(() => {
    const htmlStrimg = $generateHtmlFromNodes(editor)
    // console.log('htmlStrimg', htmlStrimg);
    // getData(htmlStrimg);
  })
  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  console.error(error);
}

export default function Editor({getData, data}) {
  if (!data?.content) {
    return <p>Loading...</p>;
  }
  let content;
  // const state = {"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"New Text","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}
  // console.log(JSON.stringify(state))

  // console.log('data.content', data.content)
  if (data.content) {
    content = JSON.parse(data.content);
  }

  const initialConfig = {
    ...lexicalEditorConfig,
    // editorState: JSON.stringify(state)
    editorState: JSON.stringify(content)
  };

  const [editorState, setEditorState] = useState();
  getData(editorState)
  function onChange(editorState) {
    const editorStateJSON = editorState.toJSON();
    // console.log('editorStateJSON', JSON.stringify(editorStateJSON))
    setEditorState(JSON.stringify(editorStateJSON));
  }
  
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalEditorTopBar />
      <Divider />
      <Box sx={{ position: "relative", background: "white" }}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}  // ???
          placeholder={<div>Enter some text...</div>}
          // placeholder={<Box sx={placeHolderSx}>Text</Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* <TreeViewPlugin/> */}
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MyCustomAutoFocusPlugin />
        <OnChangePlugin onChange={onChange} getData={getData}/>
        <ImagesPlugin captionsEnabled={false} />
        <FloatingTextFormatToolbarPlugin />
      </Box>
    </LexicalComposer>
  );
}


