/* eslint-disable no-debugger */
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Table,
  Modal,
  message,
  DatePicker,
  Popconfirm,
  Tabs,
} from "antd";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const CustomDataTable = () => {
  const [form] = Form.useForm();
  const [editRecord, setEditRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Mike",
      url: "https://jsonplaceholder.typicode.com",
      method: "GET",
      lastChange: "2025-04-01",
      status: "Active",
      lastCheck: "2025-04-28",
    },
    {
      key: "2",
      name: "John",
      url: "https://jsonplaceholder.typicode.com",
      method: "GET",
      lastChange: "2025-04-01",
      status: "Active",
      lastCheck: "2025-04-28",
    },
    {
      key: "3",
      name: "Edison",
      url: "https://jsonplaceholder.typicode.com",
      method: "GET",
      lastChange: "2025-04-01",
      status: "Active",
      lastCheck: "2025-04-28",
    },
  ]);

  const handleViewHtml = async (url) => {
    debugger;
    try {
      const response = await fetch(url);
      const text = await response.text();
      setHtmlContent(text);
      setActiveTab("1"); // Reset to first tab when new content loads
    } catch (error) {
      console.error("Failed to fetch HTML:", error);
      message.error("Could not load content.");
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <Button type="link" onClick={() => handleViewHtml(url)}>
          {url}
        </Button>
      ),
    },
    { title: "Method", dataIndex: "method", key: "method" },
    { title: "Last Change", dataIndex: "lastChange", key: "lastChange" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Last Check", dataIndex: "lastCheck", key: "lastCheck" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                label: "Edit",
                onClick: () => handleEdit(record.key),
              },
              {
                key: "delete",
                label: (
                  <Popconfirm
                    placement="topLeft"
                    title={
                      <span>
                        <ExclamationCircleOutlined
                          style={{ color: "red", marginRight: 8 }}
                        />
                        <span>Delete the task</span>
                      </span>
                    }
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleDelete(record.key)}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                      style: {
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d",
                        color: "#fff",
                      },
                    }}
                  >
                    <span>Delete</span>
                  </Popconfirm>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} style={{ padding: 0 }} />
        </Dropdown>
      ),
    },
  ];

  const filteredData = dataSource.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const handleEdit = (key) => {
    const record = dataSource.find((item) => item.key === key);
    if (record) {
      setEditRecord(record);
      form.setFieldsValue({
        ...record,
        lastChange: record.lastChange ? dayjs(record.lastChange) : null,
        lastCheck: record.lastCheck ? dayjs(record.lastCheck) : null,
      });
      setIsModalOpen(true);
    }
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
    message.success("Deleted successfully");
  };

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditRecord(null);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          lastChange: values.lastChange?.format("YYYY-MM-DD"),
          lastCheck: values.lastCheck?.format("YYYY-MM-DD"),
        };

        if (editRecord) {
          setDataSource((prev) =>
            prev.map((item) =>
              item.key === editRecord.key
                ? { ...item, ...formattedValues }
                : item
            )
          );
          message.success("Item updated");
        } else {
          const newItem = {
            ...formattedValues,
            key: Date.now().toString(),
          };
          setDataSource((prev) => [...prev, newItem]);
          message.success("Item added");
        }

        form.resetFields();
        setIsModalOpen(false);
        setEditRecord(null);
      })
      .catch((err) => {
        console.log("Validation Failed:", err);
      });
  };

  const dynamicFormFields = columns
    .filter((col) => col.key !== "actions")
    .map((col) => {
      const isDateField = col.key === "lastChange" || col.key === "lastCheck";
      return (
        <Form.Item
          key={col.key}
          name={col.key}
          label={col.title}
          rules={[{ required: true, message: `${col.title} is required` }]}
        >
          {isDateField ? <DatePicker style={{ width: "100%" }} /> : <Input />}
        </Form.Item>
      );
    });

  const tabItems = [
    {
      key: "1",
      label: "Page",
      children: (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            maxHeight: 400,
            overflow: "auto",
            background: "#fafafa",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ),
    },
    {
      key: "2",
      label: "Text",
      children: (
        <div style={{ padding: "16px" }}>
          <h4>Website-Watcher Features</h4>
          <ul>
            <li>Monitor website changes</li>
            <li>Get notifications</li>
            <li>Compare versions</li>
            <li>Track historical changes</li>
          </ul>
        </div>
      ),
    },
    {
      key: "3",
      label: "Changes",
      children: (
        <div style={{ padding: "16px" }}>
          <p>Screenshots of the monitored website will appear here</p>
          <div
            style={{
              border: "1px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Screenshot Preview Area
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Analysis",
      children: (
        <div style={{ padding: "16px" }}>
          <h4>Available Downloads</h4>
          <Table
            columns={[
              { title: "Version", dataIndex: "version", key: "version" },
              { title: "Size", dataIndex: "size", key: "size" },
              { title: "Date", dataIndex: "date", key: "date" },
              {
                title: "Action",
                key: "action",
                render: () => <Button type="link">Download</Button>,
              },
            ]}
            dataSource={[
              {
                key: "1",
                version: "25.1",
                size: "15.2 MB",
                date: "2025-04-15",
              },
              {
                key: "2",
                version: "24.5",
                size: "14.8 MB",
                date: "2024-12-10",
              },
            ]}
            pagination={false}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="md:p-4 p-2">
      <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
        <Input.Search
          placeholder="Search"
          onSearch={(value) => setSearchText(value)}
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" onClick={showModal} className="!bg-[#4f39f6]">
          Add New URL
        </Button>
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
      />

      {htmlContent && (
        <div style={{ marginTop: 24 }}>
          <h3>Website Preview</h3>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            tabBarStyle={{ marginBottom: 0 }}
          />
        </div>
      )}

      <Modal
        title={editRecord ? "Edit Url" : "Add Url"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dynamicFormFields}
          </div>

          <div className="flex justify-end mt-4">
            <Form.Item>
              <Button
                type="primary"
                onClick={handleAdd}
                className="!bg-[#4f39f6]"
              >
                {editRecord ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomDataTable;
