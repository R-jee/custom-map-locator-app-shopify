import React from 'react'
import {useState, useEffect} from 'react';
import { Page, Layout, TextContainer, Stack, Button, DisplayText,Card,Spinner } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";
import CsvDownload from 'react-json-to-csv'

export default function BulkExport() {
  const navigate = useNavigate();
  const authenticatedFetch = useAuthenticatedFetch();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticatedFetch('/api/locations-full').then((res) => res.json()).then((res) => {
      setLocations(res);
      setLoading(false);
    });
  }, []);

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
                  <DisplayText size="Large">Bulk export</DisplayText>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </div>
        </Layout.Section>
        <Layout.Section>
          <Card title="Bulk export" sectioned>
            <p>Need to make bulk changes or copy your stored to another account? You can download a CSV file of your store list, then open it in a<br></br>spreadsheet tool like Excel or Google Sheets.</p>
            <br></br>
            <p>If you plan to make changes and then re-upload the new list, see our guide to replacing your store list.</p>
          </Card>
        </Layout.Section>
      </Layout>
      <CsvDownload 
        data={locations}
        filename="locations.csv"
        style={{
          border: "0",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          background: "#139D6D",
          color: "#fff",
          padding: "10px 18px",
          lineHeight: "1",
          borderRadius: "8px",
          marginTop: "20px",
          float: "right",
          cursor: "pointer"
        }}
      >
        { 
          !loading ?
          'Download locations as CSV'
          :
          <Spinner accessibilityLabel="Spinner example" size="small" />
        }
      </CsvDownload>
    </Page>
  );     
}