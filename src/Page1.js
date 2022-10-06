import {
  Button,
  Card,
  Heading,
  Page,
  Select,
  SkeletonBodyText,
  Spinner,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";

const Page1 = () => {
  const [selectcategory, setSelectedcategory] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allResult, setAllResult] = useState([]);
  const [catOptions, setcatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, showAttributes] = useState(false);
  const [cat_subcat, showCat_subcat] = useState("");
  const [attrsOptions, setAttrsOptions] = useState([]);
  const [attrsOptions2, setAttrsOptions2] = useState([]);
  const [attrsOptselected, setAttrsOptselected] = useState([]);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [count, setCount] = useState([]);
  const [addShow, setAddShow] = useState(false);
  const [delload, setDelload] = useState(false);

  const handleSelectFilter = (value, index) => {
    setAddShow(true);
    setSelected(value);
    let temp = [...attrsOptselected];
    temp[index] = value;
    setAttrsOptselected(temp);
    let temp2 = [...attrsOptions];
    for (let i = 0; i < temp2.length; i++) {
      if (temp.includes(temp2[i].value)) temp2[i].disabled = true;
      else temp2[i].disabled = false;
    }
    setAttrsOptions2(temp2);
  };
  
  const deleteit = (index) => {
    setAddShow(true);
    let temp = [...attrsOptselected];
    let temp2 = [...count];
    let temp5 = temp[index];
    temp.splice(index, 1);
    temp2.splice(index, 1);
    setAttrsOptselected(temp);
    setCount(temp2);
    let temp4 = [...attrsOptions];
    temp4.map((i, idx) => {
      if (i.value === temp5) {
        i.disabled = false;
      }
    });
    setAttrsOptions2(temp4);
  };

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
    if (count.length === attrsOptselected.length) {
      setAddShow(true);
    }
    setLoading(true);
    try {
      let data = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id: "63329d7f0451c074aa0e15a8",
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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
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
        user_id: "63329d7f0451c074aa0e15a8",
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
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
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
      let attrs_filtered = [
        {
          label: "---select here---",
          value: "---select here---",
          disabled: false,
        },
      ];
      for (let i in result.data) {
        for (let a in result.data[i]) {
          attrs.push({
            label: result.data[i][a]["label"],
            value: a,
            disabled: false,
          });
        }
      }

      attrs.filter((item, index) => {
        if (attrs.indexOf(item) === index) {
          attrs_filtered.push(item);
        }
      });

      setAttrsOptions(attrs_filtered);
      setAttrsOptions2(attrs_filtered);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const addattributebox = () => {
    setAddShow(false);
    setCount([...count, 1]);
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
      {!loading && (
        <>
          {attributes && (
            <>
              <Card sectioned>
                <Heading>Attributes</Heading>
                {addShow ? (
                  <Button primary onClick={addattributebox}>
                    Add Attribute
                  </Button>
                ) : (
                  <Button primary disabled>
                    Add Attribute
                  </Button>
                )}
              </Card>
              {delload && (
                <Spinner accessibilityLabel="Spinner example" size="large" />
              )}
              {!delload && (
                <>
                  {count.map((i, index) => {
                    return (
                      <Card sectioned>
                        <span className="delbtn">
                          <Button
                            destructive
                            onClick={() => {
                              deleteit(index);
                            }}
                          >
                            Delete
                          </Button>
                        </span>
                        <Select
                          options={attrsOptions2}
                          onChange={(e) => {
                            handleSelectFilter(e, index);
                          }}
                          value={attrsOptselected[index]}
                        />
                        &nbsp;
                        <TextField
                          value={value}
                          onChange={(e) => {
                            setValue(e);
                          }}
                          autoComplete="off"
                        />
                      </Card>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}

      {loading && (
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      )}
    </Page>
  );
};

export default Page1;
