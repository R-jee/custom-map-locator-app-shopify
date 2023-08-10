import React from 'react'
import {useState, useEffect} from 'react';
import { Page, Layout, TextContainer, Heading, Stack, Button, DisplayText,Card,FormLayout,TextField,Form, ButtonGroup, PageActions,Checkbox, Spinner } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";
import GoogleMap from 'google-map-react';
import Marker from './../components/Marker';

export default function ShowMap() {
  const authenticatedFetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const leftArrow = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.77877 4.20044L2.47919 8.50002L6.77877 12.7996" stroke="#5C6470" stroke-width="1.5" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5208 8.d5H2.59955" stroke="#5C6470" stroke-width="1.5" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  const [locations, setLocations] = useState([]);
  const [mapcenter, setMapcenter] = useState([51.5072, 0.1276]);
  const [loading, setLoading] = useState(true);

  const _onMarkerClick = (key, childProps) => {
    let newLocations =  locations.map((location, index) => {
      if(key == index) {
        location.showBallon = !location.showBallon
        return location
      } else {
        location.showBallon = false;
        return location
      }
    });
    const position = [childProps.lat, childProps.lng];
    setMapcenter(position);
    setLocations(newLocations);
  }

  useEffect(() => {
    authenticatedFetch('/api/locations').then((res) => res.json()).then((res) => {
      let positions = res.map((r) => {
        const p_details = r.filter((pos) => pos !== null && typeof pos.position != "undefined" )[0];
        return p_details;
      });
      positions = positions.map((position, index) => {
        res[index].pop();
        return {...position, showBallon: false, details: res[index]};
      });
      setLocations(positions);
      setLoading(false);
    })
  }, []);

  const defaultProps = {
    zoom: 1
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
                  <DisplayText size="Large">Show on Map</DisplayText>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </div>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            { loading ? 
            <div className='center'>
              <Spinner size="large" />
            </div>
            :
            <div style={{height: "500px"}}>
              <GoogleMap
                  center={mapcenter}
                  zoom={defaultProps.zoom}
                  onChildClick={_onMarkerClick}
              >
              { 
                locations.map((location, index) => (
                  <Marker
                    key={index}
                    index={index}
                    lat={location.position.lat}
                    lng={location.position.lng}
                    showBallon={location.showBallon}
                    content={location}
                    animation={2}
                  />
                ))
              }
              </GoogleMap>
            </div>
            }
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );  
}