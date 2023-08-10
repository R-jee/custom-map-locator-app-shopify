import React from 'react'
import {useState, useEffect, useCallback } from 'react';
import { Page, Layout, TextContainer, Stack, Button, DisplayText,Card,Spinner,PageActions } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";
import {useDropzone} from 'react-dropzone'
import "../assets/App.css";
import {csv}from "csvtojson";


export default function BulkImport() {
  const navigate = useNavigate();
  const authenticatedFetch = useAuthenticatedFetch();

  const [files, setFiles] = useState();
  const [uploaddata, setUploaddata] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        csv({
          noheader: true,
          output: "json"
        })
          .fromString(fileAsBinaryString)
          .then((csvRows) => {
            const toJson = []
            csvRows.forEach((aCsvRow, i) => {
              if (i !== 0) {
                const builtObject = {}

                Object.keys(aCsvRow).forEach((aKey) => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  const keyToAddInBuiltObject = csvRows[0][aKey];
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                })
                toJson.push(builtObject)
              }
            })
            setUploaddata(toJson);
          })
      };

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    }
  })

  const uploadData = () => {
    console.log(uploaddata);
    setUploading(true);
    authenticatedFetch('/api/bulk-location-save', {
      method: "POST",
      body: JSON.stringify(uploaddata),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      console.log(res);
      navigate("/1");
    });
  }

  const ImportingIcon = () => {
    return (
      <svg width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.5 5.91675V23.6667L41.4167 17.7501" stroke="#ABABAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M35.5 23.6667L29.5834 17.75" stroke="#ABABAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.7083 35.5C8.875 35.5 8.875 40.7954 8.875 47.3333V50.2917C8.875 58.4567 8.875 65.0833 23.6667 65.0833H47.3333C59.1667 65.0833 62.125 58.4567 62.125 50.2917V47.3333C62.125 40.7954 62.125 35.5 50.2917 35.5C47.3333 35.5 46.505 36.1213 44.9667 37.275L41.9492 40.47C38.4583 44.1975 32.5417 44.1975 29.0213 40.47L26.0333 37.275C24.495 36.1213 23.6667 35.5 20.7083 35.5Z" stroke="#ABABAB" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.7916 35.5V23.6667C14.7916 17.7204 14.7916 12.8096 23.6666 11.9517" stroke="#ABABAB" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M56.2084 35.5V23.6667C56.2084 17.7204 56.2084 12.8096 47.3334 11.9517" stroke="#ABABAB" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    )
  }
  const importicon = () => {
    return (
      <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4493 6.16801C15.9293 5.92801 16.4463 5.79878 16.9816 5.78955" stroke="white" stroke-width="1.38462" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.1784 15.5003C17.4154 15.5096 18.6061 15.048 19.52 14.2173C22.5384 11.5773 20.923 6.27879 16.9446 5.78033C15.523 -2.84121 3.0892 0.426482 6.03381 8.63264" stroke="white" stroke-width="1.38462" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.92311 8.57728C5.43388 8.32805 4.6135 8.10702 4.06888 8.11625C-0.232654 8.42086 -0.223423 14.6793 4.06888 14.9839" stroke="white" stroke-width="1.38462" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13.8997 12.8292L11.0324 9.96191L8.16516 12.8292" stroke="white" stroke-width="1.38462" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.0325 17.9921V10.0422" stroke="white" stroke-width="1.38462" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  };
  const leftArrow = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.77877 4.20044L2.47919 8.50002L6.77877 12.7996" stroke="#5C6470" stroke-width="1.5" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5208 8.d5H2.59955" stroke="#5C6470" stroke-width="1.5" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <Page>
      <TitleBar title="Store Locator" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <div className="header-navigation" style={{ marginTop: "var(--p-space-5)" }}>
            <Button plain
              icon={leftArrow}
              onClick={() => navigate("/1")}
            >
              Locations
            </Button>
            <Stack>
              <Stack.Item fill>
                <TextContainer>
                  <DisplayText size="Large">Bulk import</DisplayText>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </div>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <div className='import-form' {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <div className='drog-drop-form' style={{opacity: "0.2"}}>
                    <ImportingIcon></ImportingIcon>
                    <Button primary
                      icon={importicon}
                      onClick={() => navigate("/bulk-import")}
                    >
                      Select a.csv file to start
                    </Button>
                    <p>Or drag and drop your file here</p>
                  </div> :
                  <div className='drog-drop-form'>
                    <ImportingIcon></ImportingIcon>
                    <Button primary
                      icon={importicon}
                      onClick={() => navigate("/bulk-import")}
                    >
                      Select a.csv file to start
                    </Button>
                    <p>Or drag and drop your file here</p>
                    { files && 
                      <p>
                        Selected File: {files[0].name} - {files[0].size} bytes
                      </p>
                    }
                  </div>
              }
            </div>
          </Card>
        </Layout.Section>
      </Layout>
      { uploading ?
      <PageActions
        primaryAction={{
          content: "Importing"
        }}
      />
      :
      <PageActions
        primaryAction={{
          content: "Import",
          onAction: () => { uploadData() }
        }}
      />
      }
    </Page>
  );     
}