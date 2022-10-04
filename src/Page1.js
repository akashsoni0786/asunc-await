import {
  Button,
  Card,
  Layout,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const Page1 = () => {
  const [selectcategory, setSelectedcategory] = useState("select category");

  const [catOptions, setcatOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parentid, setParentId] = useState([]);

  const handleSelectChange = (value) => {
    setSelectedcategory(value);

    catOptions.map((i) => {
      // console.log(i.parentid);
      if (value === i.label) {
        setParentId(i.parentid);
        alert(i.parentid);
      }
    });
  };
  const showresult = async (url = "", data = {}) => {
    setLoading(true);
    try {
      data = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        selected: [],
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      };
      url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0ODk2ODY1LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2MxNzIxNmU0ZmJkNDk5NjVjMzZjNCJ9.eOBNKusfwSwBa-R_k54HUHZ5GUpobq6LKVy5-7voA3FYet9bTo8kky9RImOIcaDAy2GmSkovXt9vktcQXmUMdd9BSPR20sAs6D5sIA8fNHeHngmAY3cacjtNEgXZn2MmVMXIQUCnDXJuLh8zgiIskjQurOeC4ldaR-sqHddIKxoemfyoz8flY2gSiocvBsUxnXAhkytGCKxB9CEmhYMAFwYdGsI7ANAJnfSGLhrS9zqMNjpRv__9RzyUNirupPb1ruCgCVcPtLQLaT_K-Md3DH6_5iD0wJgs4FL-I1DYQmVeq4RdaBfV-OkAlirE5vcavfas2nwi3QZIertYSXVY5A`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      //   console.log(result.data);
      let optns = [];
      await result.data.map((i) => {
        optns.push({ label: i.name, value: i.name, parentid: i.parent_id });
      });
      //   console.log(optns);
      //   console.log(catOptions)
      setcatOptions(optns);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const showallsubcategoey = async (url = "", alldata = {}) => {
    alert(parentid);
    setLoading(true);
    try {
      url = new URL(
        "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/"
      );

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          appTag: "amazon_sales_channel",
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0ODk2ODY1LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2MxNzIxNmU0ZmJkNDk5NjVjMzZjNCJ9.eOBNKusfwSwBa-R_k54HUHZ5GUpobq6LKVy5-7voA3FYet9bTo8kky9RImOIcaDAy2GmSkovXt9vktcQXmUMdd9BSPR20sAs6D5sIA8fNHeHngmAY3cacjtNEgXZn2MmVMXIQUCnDXJuLh8zgiIskjQurOeC4ldaR-sqHddIKxoemfyoz8flY2gSiocvBsUxnXAhkytGCKxB9CEmhYMAFwYdGsI7ANAJnfSGLhrS9zqMNjpRv__9RzyUNirupPb1ruCgCVcPtLQLaT_K-Md3DH6_5iD0wJgs4FL-I1DYQmVeq4RdaBfV-OkAlirE5vcavfas2nwi3QZIertYSXVY5A`,
          "Ced-Source-Id": 500,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 530,
          "Ced-Target-Name": "amazon",
        },
        body: JSON.stringify({
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          selected: [...parentid],
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        }),
      });

      let result = await response.json();
      console.log(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button primary onClick={showresult}>
        Show
      </Button>

      <Button primary onClick={showallsubcategoey}>
        Category
      </Button>
      {!loading && (
        <Select
          label="Category range"
          options={catOptions}
          onChange={handleSelectChange}
          value={selectcategory}
        />
      )}
      {loading && (
        <SkeletonPage primaryAction>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <SkeletonBodyText />
              </Card>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText />
                </TextContainer>
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      )}
    </div>
  );
};

export default Page1;
