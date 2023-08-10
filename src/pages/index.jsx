import {
  Page,
  Layout,
  TextContainer,
  DisplayText,
  ButtonGroup, 
  Button,
  Stack,
  Card,
  DataTable,
  Spinner
} from "@shopify/polaris";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";
import {useState, useEffect} from 'react';
import "../assets/App.css";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function HomePage() {
  const authenticatedFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  navigate('/1');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticatedFetch('/api/locations').then((res) => res.json()).then((res) => {
      res.map((r) => {
        return r.pop();
      })
      setLocations(res);
      setLoading(false);
    });
  }, []);

  const mapicon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.29004 7.77998V17.51C2.29004 19.41 3.64004 20.19 5.28004 19.25L7.63004 17.91C8.14004 17.62 8.99004 17.59 9.52004 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.52004 3.51998C8.99004 3.25998 8.14004 3.27998 7.63004 3.56998L3.30004 6.04998C2.74004 6.36998 2.29004 7.14998 2.29004 7.77998Z" stroke="#5C6470" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.56006 4V17" stroke="#5C6470" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.73 6.62012V20.0001" stroke="#5C6470" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };
  const importicon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4492 9.16801C16.9292 8.92801 17.4461 8.79878 17.9815 8.78955" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.1786 18.5003C18.4155 18.5096 19.6062 18.048 20.5201 17.2173C23.5386 14.5773 21.9232 9.27879 17.9447 8.78033C16.5232 0.15879 4.08932 3.42648 7.03394 11.6326" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.92311 11.5773C6.43388 11.328 5.6135 11.107 5.06888 11.1162C0.767346 11.4209 0.776577 17.6793 5.06888 17.9839" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.8998 15.8292L12.0325 12.9619L9.16528 15.8292" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.0325 20.9921V13.0422" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };
  const exporticon = () => {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4492 9.16801C16.9292 8.92801 17.4461 8.79878 17.9815 8.78955" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.1786 18.5003C18.4155 18.5096 19.6062 18.048 20.5201 17.2173C23.5386 14.5773 21.9232 9.27879 17.9447 8.78033C16.5232 0.15879 4.08932 3.42648 7.03394 11.6326" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.92311 11.5773C6.43388 11.328 5.6135 11.107 5.06888 11.1162C0.767346 11.4209 0.776577 17.6793 5.06888 17.9839" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.1654 18.1249L12.0327 20.9922L14.8999 18.1249" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.0327 12.962L12.0327 20.9119" stroke="#5C6470" stroke-width="1.38462" strokeLinecapstrokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };
  return (
    <Page>
      <TitleBar title="Store Locator" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <div className="header-navigation" style={{ marginTop: "var(--p-space-5)" }}>
            <TextContainer>
              <DisplayText size="Large">All locations</DisplayText>
            </TextContainer>
            <Stack>
              <Stack.Item fill>
                <ButtonGroup>
                  <Button plain removeUnderline
                    icon={mapicon}
                    onClick={() => navigate("/showmap")}
                  >
                    Show on map
                  </Button>
                  <Button plain removeUnderline
                    icon={importicon}
                    onClick={() => navigate("/bulk-import")}
                  >
                    Bulk import
                  </Button>
                  <Button plain removeUnderline
                    icon={exporticon}
                    onClick={() => navigate("/bulk-export")}
                  >
                    Bulk export
                  </Button>
                </ButtonGroup>
              </Stack.Item>
              <Stack.Item>
                <Button onClick={() => navigate("/location-add")} primary>Add location</Button>
              </Stack.Item>
            </Stack>
          </div>
        </Layout.Section>
        { loading ? 
          <Layout.Section>
            <div className="no-locations">
              <Card sectioned>
                <Spinner accessibilityLabel="Spinner example" size="large" />
              </Card>
            </div>
          </Layout.Section>
          :
          <Layout.Section>
            { locations && locations.length == 0 ?
              <div className="no-locations">
                <Card title="No locations yet" sectioned
                      primaryFooterAction={{ content: "Add location", onAction: () => navigate("/location-add") }}
                      secondaryFooterActions={[{ content: "Import a spreedsheet", onAction: () => navigate("/bulk-import") }]}
                >
                  <p>
                    You haven’t added any locations yet - click Add location to get started.
                  </p>
                </Card>
              </div>
              :
              <div className="locations">
                <Card sectioned>
                  <DataTable
                    columnContentTypes={[
                      'text',
                      'text',
                      'text',
                      'numeric',
                      'text',
                      'text',
                    ]}
                    headings={[
                      'Name',
                      'Email',
                      'Address',
                      'Phone',
                      'Website',
                      'Logo Url',
                    ]}
                    rows={locations}
                  />
                </Card>
              </div>
            }
          </Layout.Section>
        }
      </Layout>
    </Page>
  );
}
