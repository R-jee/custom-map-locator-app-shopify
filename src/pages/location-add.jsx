import React from 'react'
import {useState, useEffect} from 'react';
import { Page, Layout, TextContainer, Heading, Stack, Button, DisplayText,Card,FormLayout,TextField,Form, ButtonGroup, PageActions,Checkbox } from "@shopify/polaris";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";
import GoogleMap from 'google-map-react';
import Marker from './../components/Marker';
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function LocationAdd() {
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

  const [address, setAddress] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    state: '',
    country:'',
    phone: '',
    website: '',
    email: '',
    logo_url: ''
  });
  const [props, setProps] = useState({lat: 51.5072,lng: 0.1276});
  const [showmarker, setShowmarker] = useState(false);

  const getProps = () => {
    var requestOptions = {
      method: 'GET',
    };
    const url = new URL('https://api.geoapify.com/v1/geocode/search');
    const params = new URLSearchParams(url.search);
    params.set('text',`${address.address1}, ${address.city} ${address.zip}, ${address.country}`);
    params.set('apiKey','493382496d924643943f0e256234527a');
    
    fetch(`https://api.geoapify.com/v1/geocode/search?${params}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setProps((position) => ({
        ...position,
        lat: result.features[0].properties.lat,
        lng: result.features[0].properties.lon
      }));
    })
  }

  const findAddress = () => {
    setShowmarker(false);
    getProps();
  }

  const dropMarker = () => {
    setShowmarker(true);
  }

  const saveLocation = async () => {
    console.log(address);
    console.log(props);

    const data = {
      address: address,
      position: props
    }

    console.log(data);

    authenticatedFetch('/api/location-save', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => {
      console.log(res);
      navigate("/1");
    });
    
  }

  const defaultProps = {
    center: props,
    zoom: 10
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
                  <DisplayText size="Large">Add location</DisplayText>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <Button primary onClick={() => saveLocation()}>Save location</Button>
              </Stack.Item>
            </Stack>
          </div>
        </Layout.Section>
        <Layout.Section Primary>
          <Form>
            <Card sectioned>
              <FormLayout>
                <TextField label="Name" value={address.name} onChange={(value) => setAddress(address => ({
                  ...address,
                  name: value
                }))}/>
                <TextField label="Address Line 1" value={address.address1} onChange={(value) => setAddress(address => ({
                  ...address,
                  address1: value
                }))}/>
                <TextField label="Address Line 2" value={address.address2} onChange={(value) => setAddress(address => ({
                  ...address,
                  address2: value
                }))}/>
                <FormLayout.Group>
                  <TextField label="City" value={address.city} onChange={(value) => setAddress(address => ({
                  ...address,
                  city: value
                }))}/>
                  <TextField label="Postal / ZIP code" value={address.zip} onChange={(value) => setAddress(address => ({
                  ...address,
                  zip: value
                }))}/>
                  <TextField label="State / Province" value={address.state} onChange={(value) => setAddress(address => ({
                  ...address,
                  state: value
                }))}/>
                  <TextField label="Country" value={address.country} onChange={(value) => setAddress(address => ({
                  ...address,
                  country: value
                }))}/>
                </FormLayout.Group>
              </FormLayout>
            </Card>
          
            <Card title="Details" sectioned>
              <FormLayout>
                <TextField label="Phone number" type="tel" value={address.phone} onChange={(value) => setAddress(address => ({
                  ...address,
                  phone: value
                }))}/>
                <TextField label="Website" value={address.website} onChange={(value) => setAddress(address => ({
                  ...address,
                  website: value
                }))}/>
                <TextField label="Email address" type="email"  value={address.email} onChange={(value) => setAddress(address => ({
                  ...address,
                  email: value
                }))}/>
                <TextField label="Image / Logo URL" value={address.logo_url} onChange={(value) => setAddress(address => ({
                  ...address,
                  logo_url: value
                }))}/>
              </FormLayout>
            </Card>
          </Form>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Map position" sectioned
                secondaryFooterActions={[{ content: "Find address on map", size: "slim", onAction: () => findAddress()}]}
                primaryFooterAction={{ content: "Drop a pin", size: "slim", onAction: () => dropMarker()}}
          >
            <div style={{height: "270px"}}>
              <GoogleMap
                center={props}
                zoom={defaultProps.zoom}
              >
                { showmarker ?  
                <Marker
                  lat={props.lat}
                  lng={props.lng}
                /> : ''
                }
              </GoogleMap>
            </div>
          </Card>
          <Card title="Organisation"
          >
            <Card.Section title="Search filters">
              <p style={{ marginBottom: "var(--p-space-3)" }}>
                No filters created yet. Filters let visitors find locations based on products, brands, types, etc. 
                <Button plain>Learn more</Button>
              </p>
              <ButtonGroup>
                <Button>Create a filter</Button>
                <Button plain>Manage filters</Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
          },
        ]}
      />
    </Page>
  );
}