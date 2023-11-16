import React, { useState } from "react";
import { Radio, Space, Tabs, ConfigProvider } from "antd";
import { listPolicy, objects } from "./data";
const PrivacyPolicy = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  console.log("aa: ", listPolicy);
  const formatContent = (list) => {
    console.log("list: ", list[0].subcontents);
    return (
      <>
        <div class="tab_head" style={{ fontSize: "1rem", margin: "2rem 1rem" }}>
          <h2 style={{ color: "#245D51", fontSize: "2rem" }}>
            Terms & Conditions
          </h2>
          <span>
            These Terms of Use (<strong>"Terms"</strong>) were last updated on
            Octorber 16, 2023.
          </span>
          <br/>
          <strong>
            Please review these Terms carefully as they serve as an enforceable
            contract between us and contain important information about your
            legal rights, remedies, and obligations.
          </strong>
        </div>
        <div class="tab_body">
          {list.map((item, i) => (
            <div key={i} className="tab_item" style={{ margin: "1.5rem 1rem" }}>
              <h3 style={{ marginBottom: "1rem", color: "#245D51" }}>
                {i + 1}. {item.title}
              </h3>
              <span style={{ fontSize: "1.5rem" }}>{item.content}</span>
              {item.subcontents && (
                <ul >
                  {item.subcontents.map((subContent, j) => (
                    <li style={{listStyleType: "circle", margin: "1rem 2rem 0", fontSize: "1rem"}} key={j}>{subContent}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <Tabs
      style={{ marginTop: "2rem", marginBottom: "2rem" }}
      tabPosition={tabPosition}
      size={"large"}
      items={objects.map((_, i) => {
        return {
          label: objects[i],
          key: i,
          children: formatContent(listPolicy[i]),
        };
      })}
    />
  );
};
export default PrivacyPolicy;
