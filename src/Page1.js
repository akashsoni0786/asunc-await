import {
  Button,
  Card,
  Heading,
  Layout,
  Page,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const Page1 = () => {
  const [selectcategory, setSelectedcategory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allResult, setAllResult] = useState([]);
  const [catOptions, setcatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, showAttributes] = useState(false);
  const [cat_subcat, showCat_subcat] = useState("");
  const [attrsOptions, setAttrsOptions] = useState([]);
  const [attrboxs, setAttrboxs] = useState([]);
  React.useEffect(() => {
    showresult();
  }, []);

  const handleSelectChange = (value, index) => {
    setSelectedcategory([...selectcategory, value]);
    catOptions[index].map((i) => {
      if (i.label === value && i.children === true) {
        showresult(i.parentid);
      }
      if (i.label === value && i.children === false) {
        showCat_subcat(i.category);
        showAttributes(true);
        getAttributes(i.category);
      }
    });
  };

  const showresult = async (pid) => {
    setLoading(true);
    try {
      let data = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        selected: pid,
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      };
      let url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      setAllResult([...allResult, result]);
      setAllData([...result.data, allData]);
      console.log(result.data);
      let optns = [
        {
          label: "---select here---",
          value: "---select here---",
          parentid: "-------",
          children: "-------",
          category: "",
        },
      ];
      await result.data.map((i) => {
        optns.push({
          label: i.name,
          value: i.name,
          parentid: i.parent_id,
          children: i.hasChildren,
          category: i.category,
        });
      });

      setcatOptions([...catOptions, optns]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getAttributes = async (ak) => {
    setLoading(true);
    try {
      let payload = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        target: {
          marketplace: "amazon",
          shopId: 530,
        },
        source: {
          marketplace: "shopify",
          shopId: 500,
        },
        data: {
          barcode_exemption: false,
          browser_node_id: "1380072031",
          category: ak["primary-category"],
          sub_category: ak["sub-category"],
        },
      };

      let url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify(payload),
      });

      let result = await response.json();
      console.log(result);
      let attrs = [];
      let attrs_filtered = [];
      for (let i in result.data) {
        for (let a in result.data[i]) {
          attrs.push({ label: result.data[i][a]["label"], value: a });
        }
      }

      attrs.filter((item, index) => {
        if (attrs.indexOf(item) === index) {
          attrs_filtered.push(item);
        }
      });

      setAttrsOptions(attrs_filtered);
      console.log(attrs_filtered);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addattributebox = () => {
    setAttrboxs([
      ...attrboxs,
      <Card sectioned>
        <span className="delbtn">
        <Button destructive>Delete</Button>
        </span>
        <Select
          options={attrsOptions}
          // onChange={handleSelectChange}
          // value={selected}
        />
        &nbsp;
        <TextField
      // value={value}
      // onChange={handleChange}
      autoComplete="off"
    />
      </Card>,
    ]);
  };
  return (
    <Page fullWidth>
      <Card sectioned>
        {allResult.map((i, index) => {
          return (
            <Select
              key={index}
              label="Choose category"
              options={catOptions[index]}
              onChange={(e) => {
                handleSelectChange(e, index);
              }}
              value={selectcategory[index]}
            />
          );
        })}
      </Card>

      {attributes && (
        <>
          <Card sectioned>
            <Heading>Attributes</Heading>
            <Button primary onClick={addattributebox}>
              Add Attribute
            </Button>
          </Card>

          {attrboxs.map((i) => {
            return i;
          })}
        </>
      )}
      {loading && (
        <SkeletonPage primaryAction>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <SkeletonBodyText />
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      )}
    </Page>
  );
};

export default Page1;
