import {
  Button,
  LoadingIndicator,
  Rows,
  Tab,
  TabList, TabPanel, TabPanels,
  Tabs,
  Text,
  Title
} from "@canva/app-ui-kit";
// @ts-ignore
import styles from "styles/components.css";
import React, {useState} from "react";
import axios from "axios";
import { requestExport } from "@canva/design";

export const App = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canva_backend_resp, setCanvaBackendResp] = useState({"content": ""})

  async function onClick() {
    setLoading(true);
    const response = await requestExport({
      acceptedFileTypes: ["PNG"],
    });

    if (response.status === "COMPLETED") {
      console.log(response); // => { status: "COMPLETED", title: "My design", exportBlobs: [{ url: "https://example.com/image.png" }] }
      await axios.post(
          "https://canva-f7fkbwddfre8g4b3.eastus2-01.azurewebsites.net/canva-design/eval",
          {
            "blob_url": response.exportBlobs[0].url,
            "header": {"Access-Control-Allow-Credentials": "*"}
          }

      ).then(response => {
        setCanvaBackendResp({"content": response['data']['choices'][0]['message']['content']})
        setLoading(false)
        setSuccess(true);
        // console.log(response);
        // console.log("This is canva backend resp: " + canva_backend_resp)
      });
      setSuccess(true);
    } else {
      console.log("The user exited the export flow.");
      console.log(response); // => { status: "ABORTED" }
    }
  }

  let contents = canva_backend_resp.content.replace('Score:', '\nScore:')
      .split('\n\n')
  console.log(contents.length)

  let updated :string[][]= []
  for (let i = 0; i < contents.length; i++) {
    updated.push(contents[i].replace('Score Explanation:', '\nScore Explanation:')
        .replace('Recommendation:', '\nRecommendation:').split('\n\n'))
  }
  console.log(updated)

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        {loading ? <Rows spacing="1u"><LoadingBars/></Rows>: null}
        {success ? <TextTabs contents={updated}/> : <Text>Export your designs for evaluation to AI</Text>}
        <Button variant="primary" onClick={onClick} stretch>
          Export design
        </Button>
      </Rows>
    </div>
  );
};

function LoadingBars() {
  return (
      <>
              <Title size="xsmall">
                Scoring each page...
              </Title>
              <LoadingIndicator size="large" />
      </>
  );
}

function TextTabs({contents}) {
  const ids = ['score', 'explanation', 'tips']

  return (
      <Rows spacing="4u">
        {
          contents.map((content: string[], index: string) => (
              <Tabs >
                <Text>Page {index+1} </Text>
                <TabList>
                  <Tab id={ids[0] + index}>
                    Score
                  </Tab>
                  <Tab id={ids[1] + index}>
                    Explanation
                  </Tab>
                  <Tab id={ids[2] + index}>
                    Tips
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel id={ids[0] + index}>
                    <Text>
                      {content[0]}
                    </Text>
                  </TabPanel>
                  <TabPanel id={ids[1] + index}>
                    <Text>
                      {content[1]}
                    </Text>
                  </TabPanel>
                  <TabPanel id={ids[2] + index}>
                    <Text>
                      {content[2]}
                    </Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
          ))
        }
      </Rows>
  )
}